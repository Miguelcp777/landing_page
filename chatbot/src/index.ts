/**
 * Chat backend for www.miguelcastillo.es.
 *
 * Mounted on a route of the site's own domain, so the browser talks to the same
 * origin it loaded the page from: no CORS preflight, no second hostname in the
 * frontend code, and the static site stays on the NAS untouched.
 *
 * The only secret is the Anthropic key, held in Workers Secrets and never sent
 * to the client. Everything else here exists to stop a public endpoint backed by
 * a paid API from turning into someone else's free toy.
 */
import { SYSTEM_PROMPT } from "./profile";
import { LIMITS, gateDecision, toTextEventStream, validateMessages } from "./validate";

export interface Env {
  ANTHROPIC_API_KEY: string;
  TURNSTILE_SECRET?: string;
  CHAT_RL: KVNamespace;
  ALLOWED_ORIGINS: string;
  MODEL: string;
}


const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== "/api/chat") return json({ error: "not_found" }, 404);
    if (request.method === "OPTIONS") return new Response(null, { status: 204 });
    if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);

    // Same-origin only. The route already scopes us to this domain, but a missing
    // or foreign Origin means someone is calling the endpoint from elsewhere.
    const allowed = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim()).filter(Boolean);
    const origin = request.headers.get("Origin");
    if (origin && !allowed.includes(origin)) return json({ error: "forbidden" }, 403);

    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";

    let payload: { messages?: unknown; turnstileToken?: unknown };
    try {
      payload = await request.json();
    } catch {
      return json({ error: "bad_request" }, 400);
    }

    const messages = validateMessages(payload.messages);
    if (!messages) return json({ error: "bad_request" }, 400);

    if (env.TURNSTILE_SECRET) {
      const ok = await verifyTurnstile(env.TURNSTILE_SECRET, payload.turnstileToken, ip);
      if (!ok) return json({ error: "challenge_failed" }, 403);
    }

    const gate = await rateLimit(env.CHAT_RL, ip, ctx);
    if (!gate.ok) return json({ error: gate.reason }, 429);

    // Anthropic call ------------------------------------------------------
    let upstream: Response;
    try {
      upstream = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: env.MODEL,
          max_tokens: LIMITS.maxTokensOut,
          stream: true,
          // cache_control turns the profile into a cache read on every turn after
          // the first, at a tenth of the input price. It only applies because the
          // prompt clears Anthropic's 1024-token minimum.
          system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
          messages,
        }),
      });
    } catch {
      return json({ error: "upstream_unreachable" }, 502);
    }

    if (!upstream.ok || !upstream.body) {
      // Never forward the upstream body: it can echo request details, and a 401
      // here means a key problem that is ours to read in the logs, not theirs.
      console.error("anthropic_error", upstream.status, await upstream.text().catch(() => ""));
      return json({ error: "upstream_error" }, 502);
    }

    return new Response(upstream.body.pipeThrough(toTextEventStream()), {
      headers: {
        "content-type": "text/event-stream; charset=utf-8",
        "cache-control": "no-store",
        connection: "keep-alive",
        "x-content-type-options": "nosniff",
      },
    });
  },
} satisfies ExportedHandler<Env>;

/* ------------------------------------------------------------------ helpers */

async function verifyTurnstile(secret: string, token: unknown, ip: string): Promise<boolean> {
  if (typeof token !== "string" || !token) return false;
  try {
    const body = new FormData();
    body.append("secret", secret);
    body.append("response", token);
    body.append("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/**
 * Three counters: one per visitor per day, one for the whole day, one for the whole
 * month. The monthly one is what actually caps the bill — the budget is monthly, so
 * a daily ceiling alone lets thirty quiet days plus one busy one exceed it.
 *
 * The decision itself lives in validate.ts as a pure function; this only does the
 * I/O. KV is eventually consistent, so a burst can slip a few calls past the limit.
 * That is an acceptable overshoot here; Durable Objects would be the strict version,
 * and are worth it only if this ever gets real traffic.
 */
async function rateLimit(kv: KVNamespace, ip: string, ctx: ExecutionContext) {
  const now = new Date().toISOString();
  const day = now.slice(0, 10);
  const month = now.slice(0, 7);

  const ipKey = `rl:ip:${ip}:${day}`;
  const dayKey = `rl:all:${day}`;
  const monthKey = `rl:month:${month}`;

  const dayTtl = 172800; // two days, comfortably past midnight in any timezone
  const monthTtl = 3456000; // forty days, comfortably past any month boundary

  const [ipRaw, dayRaw, monthRaw] = await Promise.all([
    kv.get(ipKey),
    kv.get(dayKey),
    kv.get(monthKey),
  ]);
  const counts = {
    ip: Number(ipRaw ?? 0),
    day: Number(dayRaw ?? 0),
    month: Number(monthRaw ?? 0),
  };

  const gate = gateDecision(counts);
  if (!gate.ok) return gate;

  // Counted after the checks and outside the response path: a slow KV write
  // should not delay the first token reaching the visitor.
  ctx.waitUntil(
    Promise.all([
      kv.put(ipKey, String(counts.ip + 1), { expirationTtl: dayTtl }),
      kv.put(dayKey, String(counts.day + 1), { expirationTtl: dayTtl }),
      kv.put(monthKey, String(counts.month + 1), { expirationTtl: monthTtl }),
    ]),
  );

  return gate;
}
