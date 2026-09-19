---
type: task-spec
id: TASK-001
status: in_progress
created: 2026-09-19
modules: [chat-worker, chat-widget, site-pages]
behavior_preserving: false
---

# Task: Deploy the chat backend and enable the panel

Pilot task for the Spec Anchor adoption. Chosen because it is a genuine contract
change across three modules rather than a cosmetic edit, so it tests whether the
ceremony is proportionate to the work.

## 1. Problem / requested change

The chat panel and its Worker were built and committed but never deployed. The panel
ships disabled behind `data-chat="off"`, the Worker has never executed, and
`wrangler.jsonc` carries a placeholder KV id. Everything the Worker does at runtime
is currently `OBSERVED` from source, never `VERIFIED`.

The most security-relevant part of it — request validation, which is what stands
between a public endpoint and a paid API — has never been run.

## 2. Current behavior

- `index.html` carries `data-chat="off"`; `js/chat.js` returns immediately and the
  widget is never built. (VERIFIED — page loaded, no `.chat` node in the DOM.)
- `POST /api/chat` does not exist. The widget's error path renders the fallback
  message. (VERIFIED this session against the absent endpoint.)
- `chatbot/wrangler.jsonc` `kv_namespaces[0].id` is `PENDIENTE_PEGAR_EL_ID`.
  (OBSERVED.)
- `ANTHROPIC_API_KEY` is not set on any Worker. (OBSERVED — no Workers exist in the
  account; `workers_list` returned zero.)
- The only executable check in the repository is `tsc --noEmit`. (VERIFIED.)

## 3. Desired behavior

A visitor on `www.miguelcastillo.es` can ask questions about Miguel and receive a
streamed answer from the same origin, within limits that bound the cost, with no
credential reachable from the browser.

## 4. Scope

- Make the Worker's pure logic executable and tested, so the validation boundary is
  verified rather than assumed.
- Deploy the Worker with its KV namespace and secret.
- Enable the panel in production.

## 5. Out of scope

- Voice, in any direction. That is phases 2 and 3.
- Turnstile. The Worker supports it; the widget does not send a token. Enabling one
  without the other breaks chat. Tracked as a finding, not done here.
- Any change to the profile content in `src/profile.ts`.
- The Cloudflare zone migration itself, which is TASK-002's territory and a
  precondition rather than part of this work.

## 6. Affected anchors

- `.specanchor/modules/chat-worker.spec.md`
- `.specanchor/modules/chat-widget.spec.md`
- `.specanchor/modules/site-pages.spec.md`
- `.specanchor/global/quality-and-security.spec.md`

## 7. Requirements

- **TASK-001/REQ-001** — The Worker's request validation and SSE transform are
  importable as pure functions and covered by executable tests.
- **TASK-001/REQ-002** — The repository has a runnable test command, and
  `quality-and-security.spec.md` stops claiming the typecheck is the only check.
- **TASK-001/REQ-003** — The Worker is deployed with a real KV namespace id and the
  API key held in Workers Secrets, reachable at `/api/chat` on the site's own origin.
- **TASK-001/REQ-004** — The panel is enabled in production and the cache-busting
  `?v=` is bumped in the same change.
- **TASK-001/REQ-005** — An account-level spend limit exists before the endpoint is
  publicly reachable.

## 8. Acceptance criteria

- **TASK-001/AC-001** — `validateMessages` rejects: non-arrays, empty arrays, more
  than `maxMessages` entries, invalid roles, non-string content, empty or
  whitespace-only content, a message above `maxCharsPerMessage`, a conversation above
  `maxCharsTotal`, broken user/assistant alternation, and a history whose last entry
  is not from the user. Each case asserted individually.
- **TASK-001/AC-002** — `validateMessages` accepts a valid single-user message and a
  valid alternating conversation, and trims surrounding whitespace.
- **TASK-001/AC-003** — `toTextEventStream` emits one `{"t": …}` per upstream text
  delta, reassembles a frame split across chunk boundaries, ignores unparseable
  frames without ending the stream, and terminates with `{"done": true}`.
- **TASK-001/AC-004** — `npm test` in `chatbot/` exits 0.
- **TASK-001/AC-005** — `tsc --noEmit` still exits 0 after the refactor.
- **TASK-001/AC-006** — `curl -s https://www.miguelcastillo.es/api/chat -X POST`
  with a valid body returns an event stream; with a malformed body returns
  `bad_request`.
- **TASK-001/AC-007** — The chat panel appears in production and returns a real
  answer about Miguel's experience.

## 9. Design approach

Extract the pure logic out of `src/index.ts` into `src/validate.ts`: `LIMITS`, the
`Msg` type, `validateMessages` and `toTextEventStream`. The handler keeps the I/O —
origin check, Turnstile, KV, the Anthropic call.

This is not test scaffolding bolted on; it is the honest shape of the module. The
validator is a pure function of its input and was only ever inside the handler by
accident of writing it there first. Splitting it also lets the tests run under plain
Node with `--experimental-strip-types`, with no test framework, no bundler and no
Cloudflare runtime — which matters in a project whose defining constraint is that it
has no build step.

## 10. API / data / UI impact

No change to the HTTP contract: same path, same methods, same error codes, same
stream shape. The module's *code* interface gains named exports.

## 11. Migration and backward compatibility

Nothing is deployed, so there is nothing to migrate.

## 12. Test plan

`chatbot/tests/validate.test.ts` using `node:test` and `node:assert/strict`, run with
`node --experimental-strip-types --test`. No dependency added.

## 13. Risks and rollback

- Moving code between files risks a behavior change. Mitigated by the tests landing
  in the same change and by the typecheck.
- Enabling the panel before the Worker answers would show a broken widget to every
  visitor. Mitigated by ordering: REQ-003 before REQ-004, never the reverse.
- Rollback for the panel is one attribute and a `?v=` bump.

## 14. Implementation checklist

- [x] Persistent specs reviewed/updated
- [x] Implementation complete (REQ-001, REQ-002)
- [x] Tests complete
- [x] Reverse alignment pass complete
- [x] Spec-sync guard passes
- [ ] REQ-003, REQ-004, REQ-005 — blocked, see section 19

## 15. Decision log

- **DEC-001** — Split the pure logic into its own module rather than exporting from
  `index.ts`. Extensionless imports do not resolve under Node's type stripping, and
  a dependency-free module is testable without a runtime.
- **DEC-002** — `node:test` over vitest. Adding a test framework to a project whose
  identity is "no build step" needs a stronger reason than convenience.
- **DEC-003** — Do not enable the panel in this task. The Worker cannot be deployed
  until the Cloudflare zone is active, and enabling the widget first would ship a
  visibly broken control.

## 16. Evidence ledger

- **EV-001** — `cd chatbot && npm test` → **23 tests, 23 pass, 0 fail**.
  Covers AC-001, AC-002, AC-003, AC-004. Node rejects a bare directory after
  `--test` on 22.16, so the script names the file.
- **EV-002** — `cd chatbot && ./node_modules/.bin/tsc --noEmit` → exit 0. Covers
  AC-005.
- **EV-003** — `python .specanchor/scripts/check-spec-sync.py --baseline` → exit 0,
  **52** material files, 0 unmapped (two added by this task).
- **EV-004** — AC-006 and AC-007 not executed. No deployed Worker exists.
- **EV-005** — Code → Spec verbatim check: `validateMessages`, `toTextEventStream`,
  `LIMITS`, the handler body, `verifyTurnstile` and `rateLimit` compared byte for byte
  against `HEAD:chatbot/src/index.ts`. All six identical, so the split introduced no
  behavioural change. This is what justifies calling the refactor behaviour-preserving
  rather than assuming it.
- **EV-006** — `python .specanchor/scripts/check-spec-sync.py --review
  .specanchor/evidence/impact-review.json` → `Documentary coverage: PASS`, exit 0.
- **EV-007** — `FIND-001` opened: setting `TURNSTILE_SECRET` on the Worker would break
  every chat request, because the widget sends no token. Out of scope here.

## 17. Persistent spec updates required

- `chat-worker.spec.md` — record the new module split and the exported interface;
  upgrade the validation invariant from OBSERVED to VERIFIED; replace "no unit
  tests".
- `quality-and-security.spec.md` — correct the claim that the typecheck is the only
  executable check.

## 18. Final alignment

- Spec → Code: **PARTIAL** — REQ-001 and REQ-002 implemented and verified;
  REQ-003 to REQ-005 specified but not implemented.
- Code → Spec: **ALIGNED** — every changed path reviewed; the split is
  behavior-preserving for the HTTP contract and contract-changing for the module's
  code interface, and both specs were updated accordingly.

## 19. Blocking inputs

REQ-003, REQ-004 and REQ-005 are blocked on inputs only the owner can supply:

1. The Cloudflare zone must be **Active**. At the time of writing, the `.es` registry
   still delegates to the previous nameservers.
2. `npx wrangler kv namespace create CHAT_RL`, and the returned id pasted into
   `wrangler.jsonc`.
3. `npx wrangler secret put ANTHROPIC_API_KEY`.
4. A monthly spend limit in the Anthropic console.

None of these can be performed from this repository, and none should be: they
involve credentials and an irreversible public exposure.

## Traceability

| Requirement | Acceptance | Verification | Actual result | Evidence |
|---|---|---|---|---|
| TASK-001/REQ-001 | TASK-001/AC-001 | `node --experimental-strip-types --test tests/` | pass | EV-001 |
| TASK-001/REQ-001 | TASK-001/AC-002 | same | pass | EV-001 |
| TASK-001/REQ-001 | TASK-001/AC-003 | same | pass | EV-001 |
| TASK-001/REQ-002 | TASK-001/AC-004 | `npm test` | pass | EV-001 |
| TASK-001/REQ-001 | TASK-001/AC-005 | `tsc --noEmit` | pass | EV-002 |
| TASK-001/REQ-003 | TASK-001/AC-006 | curl against production | not_run | EV-004 |
| TASK-001/REQ-004 | TASK-001/AC-007 | manual, in a browser | not_run | EV-004 |

## Documentary coverage

PASS — see `.specanchor/evidence/impact-review.json`.
