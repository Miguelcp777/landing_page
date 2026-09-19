---
type: task-spec
id: TASK-002
status: in_progress
created: 2026-09-19
modules: [chat-worker, chat-widget]
behavior_preserving: false
---

# Task: Fit the chat inside a 5 €/month budget

## 1. Problem / requested change

The owner set a hard spend limit of **5 €/month** in the Anthropic console. The
limits committed in TASK-001 were written without a budget in mind and are wrong by
one to two orders of magnitude against it.

`globalPerDay: 800` is roughly 24,000 messages a month. At any plausible price that
is far beyond 5 €.

Worse, the shape of the control does not match the shape of the budget. The budget is
monthly; the only hard ceiling in the Worker is daily. Thirty quiet days followed by
one busy one exceeds the limit anyway, and nothing in the Worker knows it.

## 2. Current behavior

- `MODEL` is `claude-sonnet-5`. (OBSERVED — `chatbot/wrangler.jsonc`.)
- `LIMITS.perIpPerDay` 40, `LIMITS.globalPerDay` 800. (OBSERVED — `src/validate.ts`.)
- `rateLimit()` reads and writes two KV counters, both daily. No monthly counter
  exists. (OBSERVED — `src/index.ts`.)
- When the account limit is reached, the Anthropic call fails and the Worker returns
  `upstream_error`. The widget shows its generic message. (INFERRED from the code
  path; the Worker has never run.)

## 3. Desired behavior

The chat stays inside 5 €/month on its own, and when it runs out it says so in
language a visitor understands, instead of failing against the API and looking
broken for the rest of the month.

## 4. Scope

Model choice, the three limit values, a monthly counter, and the copy the visitor
sees when a budget is exhausted.

## 5. Out of scope

- Turnstile. Still `FIND-001`.
- Per-conversation cost accounting or token-level metering. Counting messages is a
  coarse proxy, and deliberately so: it is cheap, it needs no bookkeeping, and the
  variance between messages is small when the system prompt is fixed.

## 6. Affected anchors

- `.specanchor/modules/chat-worker.spec.md`
- `.specanchor/modules/chat-widget.spec.md`

## 7. Requirements

- **TASK-002/REQ-001** — The model is Haiku 4.5, which costs roughly a third of
  Sonnet for this workload.
- **TASK-002/REQ-002** — A monthly counter caps total messages, and it is the
  authoritative budget control.
- **TASK-002/REQ-003** — The daily ceiling prevents any single day from consuming
  more than a small fraction of the month.
- **TASK-002/REQ-004** — The gate decision is a pure function and is tested.
- **TASK-002/REQ-005** — Exhausting the monthly budget produces its own error code
  with its own copy in both languages, rather than falling through to the generic
  message.

## 8. Acceptance criteria

- **TASK-002/AC-001** — `MODEL` is `claude-haiku-4-5-20251001`.
- **TASK-002/AC-002** — `gateDecision` returns `month_exhausted` when the monthly
  count is at or above `globalPerMonth`, and that check takes precedence over the
  daily and per-IP checks.
- **TASK-002/AC-003** — `gateDecision` returns `busy_today` at the daily ceiling and
  `rate_limited` at the per-IP ceiling, in that order of precedence.
- **TASK-002/AC-004** — `gateDecision` allows a request when every counter is below
  its limit, including at limit minus one.
- **TASK-002/AC-005** — `npm test` exits 0 with the new cases included.
- **TASK-002/AC-006** — `tsc --noEmit` exits 0.
- **TASK-002/AC-007** — `js/chat.js` maps `month_exhausted` to distinct copy in `en`
  and `es`.

## 9. Design approach

Budget arithmetic, stated so the numbers can be rechecked when prices change:

| | |
|---|---|
| Assumed Haiku 4.5 list price | $1 / $5 per MTok |
| Cached system prompt (~1,400 tok) | ~$0.0001 |
| History plus question (~800 tok) | ~$0.0008 |
| Answer (~250 tok) | ~$0.0013 |
| **Per message** | **~$0.0022** |
| 5 € ≈ $5.40 | ≈ 2,450 messages |

`globalPerMonth` is set to **2000**, not 2450, leaving roughly 18% margin for the
estimate being wrong. `globalPerDay` is **150**: enough for a genuinely busy day,
while capping any single day at about 7.5% of the month. `perIpPerDay` is **15**:
enough for a thorough conversation, low enough that one visitor cannot drain much.

The decision logic moves into `validate.ts` as `gateDecision`, a pure function of
three counts. `rateLimit()` keeps the I/O — reading KV, incrementing, the TTLs — and
calls it. Same reasoning as TASK-001: the part worth testing is the part with no I/O.

Precedence is month, then day, then IP. The monthly cap is the real one, so it should
be the reason given when all three are exceeded.

Adding the error code and the copy **in the same change** is deliberate. `FIND-001`
records exactly this class of defect: a server-side code with no client counterpart.
The fallback is graceful, but "graceful" here means the visitor is told something
generic when a specific and more useful message was available.

## 10. API / data / UI impact

New error code `month_exhausted` (HTTP 429). New KV key shape
`rl:month:<yyyy-mm>`, TTL 40 days. No change to the request shape or the stream.

## 11. Migration and backward compatibility

Nothing is deployed and KV is empty, so there is nothing to migrate.

## 12. Test plan

Extend `chatbot/tests/validate.test.ts` with `gateDecision` cases: each limit in
isolation, the precedence order, and the boundary at limit minus one.

## 13. Risks and rollback

- The price estimate may be wrong. Mitigated by the 18% margin and by the account
  limit as a hard backstop. The arithmetic is written down in section 9 so it can be
  rechecked rather than re-derived.
- A monthly counter that fails to increment would silently disable the cap. The
  per-day ceiling limits the damage of that failure to 150 messages.

## 14. Implementation checklist

- [x] Persistent specs reviewed/updated
- [x] Implementation complete
- [x] Tests complete
- [x] Reverse alignment pass complete
- [x] Spec-sync guard passes

## 15. Decision log

- **DEC-001** — Haiku 4.5 over Sonnet 5. Answering from a fixed 4k-token profile is
  retrieval and phrasing, not reasoning. Three times the budget matters more than a
  marginal gain in nuance, and a chat that is exhausted when a recruiter arrives is
  worse than one that answers a little more plainly.
- **DEC-002** — Count messages rather than tokens. Token accounting would be more
  accurate and would need per-response bookkeeping in KV; with a fixed system prompt
  and a bounded `max_tokens`, message count is a good enough proxy.
- **DEC-003** — Month takes precedence over day in the returned reason, so the
  visitor is told the truth about which limit stopped them.

## 16. Evidence ledger

- **EV-001** — `cd chatbot && npm test` → **33 tests, 33 pass, 0 fail**. Covers
  AC-002, AC-003, AC-004, AC-005.
- **EV-002** — `cd chatbot && ./node_modules/.bin/tsc --noEmit` → exit 0. Covers
  AC-006.
- **EV-003** — `grep` of `wrangler.jsonc` and `js/chat.js` confirming AC-001 and
  AC-007.
- **EV-004** — `check-spec-sync.py --review` → `Documentary coverage: PASS`, exit 0.

## 17. Persistent spec updates required

- `chat-worker.spec.md` — model, limits, the new KV key, the new error code,
  `gateDecision` in the exported interface.
- `chat-widget.spec.md` — the new error code in the rendered copy list.

## 18. Final alignment

- Spec → Code: **ALIGNED** — every requirement implemented and verified.
- Code → Spec: **ALIGNED** — every changed path reviewed and classified.

## Traceability

| Requirement | Acceptance | Verification | Actual result | Evidence |
|---|---|---|---|---|
| TASK-002/REQ-001 | TASK-002/AC-001 | grep of `wrangler.jsonc` | pass | EV-003 |
| TASK-002/REQ-002 | TASK-002/AC-002 | `npm test` — monthly cases | pass | EV-001 |
| TASK-002/REQ-003 | TASK-002/AC-003 | `npm test` — precedence cases | pass | EV-001 |
| TASK-002/REQ-004 | TASK-002/AC-004 | `npm test` — boundary cases | pass | EV-001 |
| TASK-002/REQ-004 | TASK-002/AC-005 | `cd chatbot && npm test` | pass | EV-001 |
| TASK-002/REQ-004 | TASK-002/AC-006 | `tsc --noEmit` | pass | EV-002 |
| TASK-002/REQ-005 | TASK-002/AC-007 | grep of `js/chat.js` | pass | EV-003 |

## Documentary coverage

PASS — see `.specanchor/evidence/impact-review.json`.
