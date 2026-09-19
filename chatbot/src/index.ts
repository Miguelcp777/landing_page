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

export interface Env {
  ANTHROPIC_API_KEY: string;
  TURNSTILE_SECRET?: string;
  CHAT_RL: KVNamespace;
  ALLOWED_ORIGINS: string;
  MODEL: string;
}

/** Deliberately tight. A portfolio bot has no legitimate use for long sessions. */
const LIMITS = {
  maxMessages: 24, // turns kept in one conversation
  maxCharsPerMessage: 1500,
  maxCharsTotal: 12000,
  maxTokensOut: 700,
  perIpPerDay: 40,
  globalPerDay: 800, // the real spend ceiling: bounds the worst day absolutely
};

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

type Msg = { role: "user" | "assistant"; content: string };

/**
 * The client sends the whole history back each turn, so all of it is untrusted.
 * Shape, roles, alternation and size are checked here rather than trusted from
 * the frontend, which anyone can bypass with curl.
 */
function validateMessages(raw: unknown): Msg[] | null {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > LIMITS.maxMessages) return null;

  const out: Msg[] = [];
  let total = 0;

  for (const m of raw) {
    if (typeof m !== "object" || m === null) return null;
    const { role, content } = m as Record<string, unknown>;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;

    const text = content.trim();
    if (!text || text.length > LIMITS.maxCharsPerMessage) return null;

    total += text.length;
    if (total > LIMITS.maxCharsTotal) return null;

    // Anthropic requires strict alternation starting with user.
    const expected = out.length % 2 === 0 ? "user" : "assistant";
    if (role !== expected) return null;

    out.push({ role, content: text });
  }

  return out[out.length - 1].role === "user" ? out : null;
}

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
 * Two counters: one per visitor, one for the whole day across everyone. The
 * global one is what actually caps the bill — a botnet defeats a per-IP limit,
 * but not a hard ceiling on total calls.
 *
 * KV is eventually consistent, so a burst can slip a few calls past the limit.
 * That is an acceptable overshoot here; Durable Objects would be the strict
 * version, and are worth it only if this ever gets real traffic.
 */
async function rateLimit(kv: KVNamespace, ip: string, ctx: ExecutionContext) {
  const day = new Date().toISOString().slice(0, 10);
  const ipKey = `rl:ip:${ip}:${day}`;
  const globalKey = `rl:all:${day}`;
  const ttl = 172800; // two days, comfortably past midnight in any timezone

  const [ipRaw, globalRaw] = await Promise.all([kv.get(ipKey), kv.get(globalKey)]);
  const ipCount = Number(ipRaw ?? 0);
  const globalCount = Number(globalRaw ?? 0);

  if (globalCount >= LIMITS.globalPerDay) return { ok: false as const, reason: "busy_today" };
  if (ipCount >= LIMITS.perIpPerDay) return { ok: false as const, reason: "rate_limited" };

  // Counted after the checks and outside the response path: a slow KV write
  // should not delay the first token reaching the visitor.
  ctx.waitUntil(
    Promise.all([
      kv.put(ipKey, String(ipCount + 1), { expirationTtl: ttl }),
      kv.put(globalKey, String(globalCount + 1), { expirationTtl: ttl }),
    ]),
  );

  return { ok: true as const };
}

/**
 * Re-emits Anthropic's event stream as a minimal one of our own: text deltas and
 * a terminator. The client never sees the upstream event shape, so the API
 * contract stays ours and the payload stays small.
 */
function toTextEventStream(): TransformStream<Uint8Array, Uint8Array> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const send = (c: TransformStreamDefaultController<Uint8Array>, obj: unknown) =>
    c.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));

  return new TransformStream({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true });

      // SSE frames are separated by a blank line; hold the trailing partial one.
      const frames = buffer.split("\n\n");
      buffer = frames.pop() ?? "";

      for (const frame of frames) {
        for (const line of frame.split("\n")) {
          if (!line.startsWith("data:")) continue;
          const raw = line.slice(5).trim();
          if (!raw || raw === "[DONE]") continue;

          try {
            const event = JSON.parse(raw);
            if (event.type === "content_block_delta" && event.delta?.type === "text_delta") {
              send(controller, { t: event.delta.text });
            } else if (event.type === "error") {
              send(controller, { error: "stream_error" });
            }
          } catch {
            // A frame we cannot parse is not worth killing the stream over.
          }
        }
      }
    },
    flush(controller) {
      send(controller, { done: true });
    },
  });
}
