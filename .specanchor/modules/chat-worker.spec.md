---
type: module-spec
module: chat-worker
status: draft
source_paths:
  - chatbot/*
last_reviewed: 2026-09-19
---

# Module: chat-worker

## Responsibility

Custody of the Anthropic API key, request validation, rate limiting, and streaming
the model response back to the browser. The only component in the project that holds
a secret.

## Source ownership

- `src/index.ts` — the request handler and everything with I/O: origin check,
  Turnstile, KV counters, the Anthropic call.
- `src/validate.ts` — **pure logic, no imports, no runtime dependencies**:
  `LIMITS`, `Msg`, `validateMessages`, `toTextEventStream`. Split out under TASK-001
  so the security boundary can be executed by plain Node without workerd, a bundler
  or a test framework.
- `src/profile.ts` — the knowledge base sent as the cached system prompt.
- `tests/validate.test.ts` — executable coverage for `src/validate.ts`.

## Public interfaces

### Code interface

`src/validate.ts` exports `LIMITS`, `Msg`, `GateReason`, `Gate`,
`validateMessages`, `gateDecision` and `toTextEventStream`. These are part of the
module's contract: the tests bind to them and the handler consumes them.

### HTTP interface

`POST /api/chat`

- Request: `{"messages": [{"role": "user"|"assistant", "content": string}]}`
- Success: `text/event-stream`, frames `{"t": string}`, terminated by `{"done": true}`
- Errors, all JSON: `bad_request` (400), `forbidden` (403), `challenge_failed` (403),
  `rate_limited` (429), `busy_today` (429), `month_exhausted` (429),
  `upstream_unreachable` (502), `upstream_error` (502), `not_found` (404),
  `method_not_allowed` (405)

Any other method or path is rejected.

## Inputs and outputs

Bindings declared in `chatbot/wrangler.jsonc`:

| Binding | Kind | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | secret | required; validated at deploy |
| `TURNSTILE_SECRET` | secret | optional; absent disables the check |
| `CHAT_RL` | KV namespace | rate-limit counters |
| `ALLOWED_ORIGINS` | var | comma-separated origin allowlist |
| `MODEL` | var | currently `claude-haiku-4-5-20251001` |

## Data / persistence

Three KV key shapes, counters only. `rl:ip:<ip>:<yyyy-mm-dd>` and
`rl:all:<yyyy-mm-dd>` expire after two days; `rl:month:<yyyy-mm>` after forty. No
conversation content is stored anywhere.

## Domain invariants

- **INV-WORKER-001** — The API key never appears in a response body, in a log line,
  or in any repository file.
- **INV-WORKER-002** — Upstream error bodies are never forwarded to the client. They
  can echo request details, and an upstream 401 is an operator problem.
- **INV-WORKER-003** — Message shape, roles, strict alternation starting with `user`,
  per-message and total size are validated server-side. The frontend is not trusted.
- **INV-WORKER-004** — A global **monthly** ceiling applies independently of the
  daily and per-IP limits. It is what actually bounds the bill, because the budget
  it protects is monthly: a daily ceiling alone lets thirty quiet days plus one
  busy one exceed it. The daily ceiling exists to stop a single day consuming the
  month, and must stay well under a quarter of `globalPerMonth`.
- **INV-WORKER-007** — The limit values are derived from a written price
  calculation in `TASK-002`, not chosen by feel. When prices change, redo the
  arithmetic rather than nudging the numbers.
- **INV-WORKER-005** — The system prompt is sent with `cache_control: ephemeral` and
  must stay above roughly 1024 tokens, or Anthropic will not cache it.
- **INV-WORKER-006** — The Worker is mounted on routes of the site's own domain with
  `workers_dev` false. It must not be exposed on a `workers.dev` hostname.

## External integrations

Anthropic Messages API (`anthropic-version: 2023-06-01`, streaming), Cloudflare KV,
and optionally Cloudflare Turnstile.

## Security and permissions

No authentication: the endpoint is public by design. Defence is layered — origin
allowlist, server-side validation, per-IP and global rate limits, a bounded
`max_tokens`, and an account-level spend limit that is the operator's responsibility
and lives outside this repository.

The knowledge base in `src/profile.ts` carries its own guardrails: no invented
figures, no employer data, refusal of questions that are discriminatory in hiring,
and an explicit list of undecided facts to hand off by email rather than guess.

- **INV-WORKER-008** — The prompt answers in the first person as Miguel, and the
  three disclosure rules of `INV-PROD-004` are stated in it explicitly. They are
  the condition on which the voice is allowed; editing the prompt must not weaken
  them. The prompt also refuses any visitor instruction to stop disclosing that it
  is an AI.

## Error semantics

Every failure returns a stable machine-readable code. The widget maps three of them
to specific copy and everything else to a generic message.

## Observability

`observability.enabled` is true with full head sampling. Upstream failures are logged
with status and body; the body is logged but never returned.

## Performance / operational constraints

Calling Anthropic is I/O wait, not CPU, so the free tier's CPU limit is not the
binding constraint. KV is eventually consistent: a burst can slip a few calls past
the limit. Accepted at this scale; Durable Objects would be the strict version.

## Tests / verification

    cd chatbot && npm test          # 33 tests over src/validate.ts
    cd chatbot && ./node_modules/.bin/tsc --noEmit

The pure logic is covered. Everything with I/O — the origin check, Turnstile, the
KV counters and the Anthropic call — is **not** covered and has never executed.

The tests deliberately pin the two properties that matter most if they ever regress:
a history whose last entry is not from the user is rejected, and an upstream error
surfaces as a generic code without leaking the upstream body.

## Known uncertainties and debt

- **Never deployed.** (UNKNOWN) The handler, the rate limiter and the Anthropic
  call have never executed. TASK-001 closed the gap for the pure logic only.
- `wrangler.jsonc` carries a placeholder KV id that must be replaced before deploy.
- The apex route is dead configuration if the Cloudflare redirect rule stays, since
  the redirect fires before Workers. Harmless, but it is not doing anything.
- Turnstile verification exists server-side with no client counterpart. See
  `chat-widget.spec.md`.

## Statement evidence

| Statement | Evidence status | Source / revision | Verification result |
|---|---|---|---|
| Typecheck passes | VERIFIED | `tsc --noEmit` exit 0 @ `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5` | pass |
| Endpoint, methods and error codes | OBSERVED | `chatbot/src/index.ts` | — |
| Validation is server-side | OBSERVED | `validateMessages()` | — |
| Validation rejects malformed input | VERIFIED | `npm test`, 33/33 pass @ `492759cdc5998358a3c2be000cb7a8f8c77377ad` | pass |
| Monthly cap outranks daily and per-IP | VERIFIED | `npm test`, precedence cases | pass |
| One day cannot exhaust the month | VERIFIED | `npm test` asserts `globalPerDay * 4 < globalPerMonth` | pass |
| Model is Haiku 4.5 | VERIFIED | `grep` of `wrangler.jsonc` @ `492759cdc5998358a3c2be000cb7a8f8c77377ad` | pass |
| Stream rewrite never leaks upstream detail | VERIFIED | `npm test`, error-event case | pass |
| Split is behavior-preserving for HTTP | VERIFIED | `tsc --noEmit` exit 0; handler logic untouched | pass |
| Global ceiling independent of per-IP | OBSERVED | `rateLimit()`, `LIMITS.globalPerDay` | — |
| Upstream body never forwarded | OBSERVED | the `!upstream.ok` branch logs and returns a fixed code | — |
| `workers_dev` false, domain routes | OBSERVED | `chatbot/wrangler.jsonc` | — |
| KV id is a placeholder | OBSERVED | `chatbot/wrangler.jsonc` | — |
| Runtime behavior | NOT_VERIFIED | never deployed | not_run |

## Change history

- 2026-09-19 — Created during SDD bootstrap.
