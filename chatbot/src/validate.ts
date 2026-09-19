/**
 * Pure logic, no I/O and no runtime dependencies. Split out of the handler so it can
 * be executed by plain Node without workerd, a bundler or a test framework — which
 * matters in a project whose defining constraint is that it has no build step.
 *
 * This is also the honest shape of the module: the validator is a function of its
 * input and was only ever inside the handler by accident of writing it there first.
 */

/** Deliberately tight. A portfolio bot has no legitimate use for long sessions. */
export const LIMITS = {
  maxMessages: 24, // turns kept in one conversation
  maxCharsPerMessage: 1500,
  maxCharsTotal: 12000,
  maxTokensOut: 700,
  perIpPerDay: 40,
  globalPerDay: 800, // the real spend ceiling: bounds the worst day absolutely
};

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
