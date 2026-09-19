---
type: finding
status: open
created: 2026-09-19
visibility: cross-task
---

# Finding: enabling Turnstile on the Worker silently breaks the chat widget

## Observation

`chat-worker` and `chat-widget` carry a hidden coupling. The Worker treats the
Turnstile check as opt-in: if `TURNSTILE_SECRET` is unset the verification is
skipped entirely, and if it is set every request must carry a valid token.

The widget never sends one. Its request body is `{messages}` and nothing else.

So setting the secret — a one-line operation in a dashboard, with no code change and
no deploy — turns every chat request into `challenge_failed`, and the panel renders
its generic error message. Nothing in either file warns about this, and the failure
looks like a server problem rather than a configuration one.

## Evidence

- `chatbot/src/index.ts`: `if (env.TURNSTILE_SECRET) { ... if (!ok) return
  json({ error: "challenge_failed" }, 403); }` — the check is gated on the secret's
  presence.
- `chatbot/src/index.ts`, `verifyTurnstile()`: returns `false` when the token is not
  a non-empty string, so an absent token always fails.
- `js/chat.js`, `stream()`: the request body is `JSON.stringify({ messages: history })`.
  No token field exists.
- The widget maps `challenge_failed` to nothing specific, so it falls through to the
  generic copy.

Status: **OBSERVED** by reading both modules. Not executed — the Worker has never
run, so the failure mode is inferred from the code path rather than reproduced.

## Why it matters

It is a trap laid for a future operator, and the person most likely to fall into it
is the owner, months from now, reacting to abuse by turning on the protection that is
already half-built. The obvious action produces an outage whose cause is in a
different file from the symptom.

It also matters for the specs: this is exactly the kind of cross-module contract that
documentary coverage cannot catch. Both files are individually consistent with their
own specs.

## Suggested disposition

- [x] Promote to global/module spec — already recorded under "Known uncertainties and
      debt" in both `chat-worker.spec.md` and `chat-widget.spec.md`.
- [ ] Create/update ADR
- [x] Create debt task — either implement the client half, or make the Worker fail
      loudly at startup when the secret is set. Deferred until the chat is deployed
      and there is evidence that abuse protection is needed.
- [ ] Discard

The cheapest durable fix is probably not to implement Turnstile at all, but to delete
the Worker-side half until the client half exists. Half a security control that
cannot be switched on is worse than none, because it looks available.

## Review decision

Left open. Out of scope for TASK-001, which explicitly excluded Turnstile. Revisit
when the chat has real traffic.
