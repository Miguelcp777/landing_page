---
type: task-spec
id: TASK-005
status: verified
created: 2026-09-20
---
# Task: A failed turn no longer poisons the conversation

## Request, scope and current behavior

Reported by the owner within minutes of the chat going live, with a screenshot: two
of his questions in a row and a single error, and every later message failing.

Two rules I wrote collided. The Worker requires strict user/assistant alternation and
rejects anything else. `INV-WIDGET-002` said a failed reply is not written into the
history — deliberate, so a retry would not resend a broken turn. Together they mean
that after any single failure the history holds a question with no answer, the next
message makes two user turns in a row, and `validateMessages` rejects it. **The
session is then broken for good**, whatever the Worker does, until the visitor finds
the *new conversation* button.

Reproduced against production: one user message streams a real answer; the same
message plus a second user message returns `bad_request` 400.

This is a defect in my design, not in the deployment. The first failure that started
it was transient and is not diagnosable after the fact.

## Desired outcome and acceptance

- **TASK-005/REQ-001** — A failed turn leaves the sent history valid, so the next
  message is judged on its own.
- **TASK-005/REQ-002** — A history already stored in a poisoned state is repaired on
  load, so sessions broken by the old build recover by themselves.
- **TASK-005/AC-001** — After two consecutive failures the stored history is `[]`.
- **TASK-005/AC-002** — A stored history of a single unanswered question draws no
  bubbles after reload and is not sent.
- **TASK-005/AC-003** — A valid three-turn conversation against production still
  works and uses the earlier turn.
- **TASK-005/AC-004** — `node --check js/chat.js` passes and `?v=` is bumped.

## Affected anchors and impact rationale

`.specanchor/modules/chat-widget.spec.md`. Classified **contract**: `INV-WIDGET-002`
stated behaviour that turned out to be harmful, so the invariant itself changes and
`INV-WIDGET-007` is added for the repair on load.

## Design note

The fix drops the unanswered question rather than keeping it and repairing at send
time. Dropping is provably correct — the history can never reach an invalid shape —
whereas repairing at send time leaves the invalid state sitting in storage between
attempts, waiting for a code path that forgets to repair.

The cost is that a retry loses the context of the failed question. That is the right
trade: the visitor still sees their own bubble, and a lost sentence is cheaper than a
conversation that silently never works again.

`repair()` is deliberately strict: it walks from the start and stops at the first
entry that breaks the pattern, rather than trying to salvage later ones. A history
that is already malformed is not worth reasoning about.

## Verification evidence

| Requirement | Acceptance | Verification | Actual result | Evidence |
|---|---|---|---|---|
| TASK-005/REQ-001 | TASK-005/AC-001 | two failed sends in a browser, storage read after each | pass | EV-001 |
| TASK-005/REQ-002 | TASK-005/AC-002 | planted a lone user entry, reloaded, counted bubbles | pass | EV-002 |
| TASK-005/REQ-001 | TASK-005/AC-003 | three-turn history against production | pass | EV-003 |
| TASK-005/REQ-001 | TASK-005/AC-004 | `node --check`, grep of `index.html` | pass | EV-004 |

- **EV-001** — Sent two messages against a server with no `/api/chat`. Both failed;
  `sessionStorage` held `[]` after each, where the old build would have held two user
  entries. The input re-enabled both times.
- **EV-002** — Planted `[{role:"user",…}]` in `sessionStorage`, reloaded, opened the
  panel: zero message bubbles, and the stale entry was overwritten on the next write.
- **EV-003** — `user → assistant → user` against production returned an answer that
  used the earlier turn and corrected a false premise in the question.
- **EV-004** — `node --check js/chat.js` clean; `?v=` bumped to `20260920-fixhist` across
  12 links.

## Open

The panel's own streaming reader still has not been watched against production in a
browser — only against the error path locally, with the Worker's stream verified
separately by curl. Recorded in `chat-widget.spec.md`.

## Final review

- Documentary coverage: PASS
- Spec → Code: ALIGNED
- Code → Spec: ALIGNED
