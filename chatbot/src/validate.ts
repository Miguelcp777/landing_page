/**
 * Pure logic, no I/O and no runtime dependencies. Split out of the handler so it can
 * be executed by plain Node without workerd, a bundler or a test framework — which
 * matters in a project whose defining constraint is that it has no build step.
 *
 * This is also the honest shape of the module: the validator is a function of its
 * input and was only ever inside the handler by accident of writing it there first.
 */

/**
 * Deliberately tight. A portfolio bot has no legitimate use for long sessions, and
 * the budget behind it is 5 EUR/month.
 *
 * The message counts are derived in TASK-002 from an assumed Haiku 4.5 list price
 * and a ~1,400-token cached system prompt: roughly $0.0022 per message, so about
 * 2,450 messages fit in the budget. `globalPerMonth` sits below that with margin
 * for the estimate being wrong. Recheck the arithmetic when prices change rather
 * than adjusting these numbers by feel.
 */
export const LIMITS = {
  maxMessages: 24, // turns kept in one conversation
  maxCharsPerMessage: 1500,
  maxCharsTotal: 12000,
  maxTokensOut: 700,
  perIpPerDay: 50, // an engaged recruiter should not hit a wall mid-conversation
  globalPerDay: 250, // caps any single day at ~12.5% of the month
  globalPerMonth: 2000, // the real budget control, unchanged
};

export type GateReason = "month_exhausted" | "busy_today" | "rate_limited";
export type Gate = { ok: true } | { ok: false; reason: GateReason };

/**
 * Pure decision over three counters, so the part worth testing has no I/O in it.
 *
 * Order matters: the monthly cap is the real budget, so when several limits are
 * exceeded at once it is the one the visitor is told about. Being told to come back
 * tomorrow when the month is gone would be a lie.
 */
export function gateDecision(
  counts: { ip: number; day: number; month: number },
  limits = LIMITS,
): Gate {
  if (counts.month >= limits.globalPerMonth) return { ok: false, reason: "month_exhausted" };
  if (counts.day >= limits.globalPerDay) return { ok: false, reason: "busy_today" };
  if (counts.ip >= limits.perIpPerDay) return { ok: false, reason: "rate_limited" };
  return { ok: true };
}

export type Msg = { role: "user" | "assistant"; content: string };

/**
 * The client sends the whole history back each turn, so all of it is untrusted.
 * Shape, roles, alternation and size are checked here rather than trusted from
 * the frontend, which anyone can bypass with curl.
 *
 * Returns null on any violation: the caller answers `bad_request` and never
 * explains which rule was broken.
 */
export function validateMessages(raw: unknown): Msg[] | null {
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

/**
 * Re-emits Anthropic's event stream as a minimal one of our own: text deltas and
 * a terminator. The client never sees the upstream event shape, so the API
 * contract stays ours and the payload stays small.
 */
export function toTextEventStream(): TransformStream<Uint8Array, Uint8Array> {
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
