---
type: task-spec
id: TASK-009
status: verified
created: 2026-09-20
---
# Task: Raise the per-visitor limit to 50

## Request, scope and current behavior

The owner asked for 50 messages per IP per day, up from 15.

The number came from evidence rather than preference. Probing the deployed assistant
exhausted the 15/day limit from a single address in one afternoon, and the visitor
most likely to reach it is the one worth keeping: an engaged recruiter working
through questions. Hitting a wall mid-conversation is the worst possible moment.

That exhaustion also verified something: the per-IP branch had never fired in
production and is now confirmed, returning `rate_limited` with HTTP 429.

## What changed beyond the request, and why

`globalPerDay` moves from 150 to 250. This was not asked for, and it is not
cosmetic.

`chatbot/tests/validate.test.ts` asserts `perIpPerDay * 5 <= globalPerDay` — a day
should need several distinct visitors to exhaust, not one or two. At 50 per IP
against 150 a day, **three people** would drain it, and the test fails. It did fail,
which is exactly what it was written for.

The alternative was to relax the assertion to fit the new number. That is precisely
what `INV-WORKER-007` forbids: the limits are derived, and when one moves the others
are recalculated rather than the guard being loosened to accommodate it.

## Budget effect: none

`globalPerMonth` stays at 2000, and it is the only cap the 5 EUR/month depends on.

- One IP at the new limit for a whole month: 50 x 30 = 1500, still inside 2000.
- A busy day now takes 12.5% of the month instead of 7.5%.
- `globalPerDay * 4 < globalPerMonth`: 1000 < 2000, so four heavy days still cannot
  exhaust the budget. That test also still passes.

Cloudflare's own bot protection sits in front of all of this and rejects scripted
clients before the Worker runs, which is why a generous per-human limit is not the
exposure it would otherwise be.

## Requirements and acceptance

- **TASK-009/REQ-001** — `perIpPerDay` is 50.
- **TASK-009/REQ-002** — The relationship tests still pass without being weakened.
- **TASK-009/REQ-003** — `globalPerMonth` is unchanged, so the budget is unchanged.
- **TASK-009/AC-001** — `npm test` exits 0 with all 33 tests passing and no assertion
  edited.
- **TASK-009/AC-002** — `tsc --noEmit` exits 0.
- **TASK-009/AC-003** — grep confirms 50 / 250 / 2000.

## Affected anchors and impact rationale

`.specanchor/modules/chat-worker.spec.md`. Classified **contract**: the limits change
what the public endpoint allows.

## Verification evidence

| Requirement | Acceptance | Verification | Actual result | Evidence |
|---|---|---|---|---|
| TASK-009/REQ-001 | TASK-009/AC-003 | grep of `chatbot/src/validate.ts` | pass | EV-001 |
| TASK-009/REQ-002 | TASK-009/AC-001 | `cd chatbot && npm test` | pass | EV-002 |
| TASK-009/REQ-003 | TASK-009/AC-003 | grep of `chatbot/src/validate.ts` | pass | EV-001 |
| TASK-009/REQ-002 | TASK-009/AC-002 | `tsc --noEmit` | pass | EV-003 |

- **EV-001** — grep results recorded in this task's commit.
- **EV-002** — 33 tests pass, including the two relationship assertions, neither of
  which was modified.
- **EV-003** — typecheck clean.

## Open

The new limit cannot be exercised from here today: the probing address is already
blocked until the counter rolls over. The change is verified by tests and by
inspection, not by a fresh production probe.

The daily and monthly ceilings still have not fired in production.

## Final review

- Documentary coverage: PASS
- Spec → Code: ALIGNED
- Code → Spec: ALIGNED
