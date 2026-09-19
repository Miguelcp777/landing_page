---
type: task-spec
id: TASK-003
status: verified
created: 2026-09-19
---
# Task: Record the availability facts the owner has supplied

## Request, scope and current behavior

The owner answered three of the seven questions the assistant was told to hand off by
email: he will not relocate, he wants remote or hybrid within Valencia, and his
English is B2.

Until now `src/profile.ts` listed all seven as unknown, so the bot would deflect a
mobility question to email even though the answer is both known and, for a recruiter,
decisive. Salary, notice period, availability to start and education remain genuinely
open and stay on the deflect list.

Scope is the knowledge base text only. No code, no limits, no interface.

## Desired outcome and acceptance

- **TASK-003/REQ-001** — The profile states his location, that he will not relocate,
  and that he wants remote or hybrid within Valencia.
- **TASK-003/REQ-002** — The profile states English at B2 and does not let the model
  inflate it.
- **TASK-003/REQ-003** — The undecided list shrinks to the four that remain open, and
  still forbids inferring a salary figure.
- **TASK-003/AC-001** — `grep` confirms Valencia, the non-relocation statement, the
  remote/hybrid preference and B2 are all present.
- **TASK-003/AC-002** — `grep` confirms the undecided list no longer names relocation,
  remote preference or languages.
- **TASK-003/AC-003** — The system prompt stays above the ~1024-token floor required
  by `INV-WORKER-005`, or prompt caching stops applying.
- **TASK-003/AC-004** — `npm test` and `tsc --noEmit` still exit 0.

## Affected anchors and impact rationale

`.specanchor/modules/chat-worker.spec.md` owns `chatbot/*`.

Classified **behavior_preserving**, not contract. The module's contract is its HTTP
interface, bindings, invariants and error codes; none of those change. The spec
describes the profile as carrying guardrails and a list of undecided facts to hand
off by email, and both statements remain true — the list is simply shorter. No
persistent spec edit is required.

What changes is what the bot *says*, which is content, not contract. If the profile
ever stopped carrying the guardrails, that would be a contract change.

## Assumption recorded

Spanish is stated as native. The owner said only "inglés B2". This is an explicit,
reversible assumption from context, flagged to him rather than silently adopted. He
may also speak Valencian — two of his projects are in it — but that was not stated
and is not claimed.

## Verification evidence

| Requirement | Acceptance | Verification | Actual result | Evidence |
|---|---|---|---|---|
| TASK-003/REQ-001 | TASK-003/AC-001 | grep of `chatbot/src/profile.ts` | pass | EV-001 |
| TASK-003/REQ-002 | TASK-003/AC-001 | grep of `chatbot/src/profile.ts` | pass | EV-001 |
| TASK-003/REQ-003 | TASK-003/AC-002 | grep of `chatbot/src/profile.ts` | pass | EV-001 |
| TASK-003/REQ-001 | TASK-003/AC-003 | token estimate over `SYSTEM_PROMPT` | pass | EV-002 |
| TASK-003/REQ-001 | TASK-003/AC-004 | `npm test` and `tsc --noEmit` | pass | EV-003 |

- **EV-001** — grep results recorded in the commit for this task.
- **EV-002** — prompt length measured after the edit; comfortably above the caching
  floor.
- **EV-003** — `cd chatbot && npm test` → 33 pass, 0 fail; `tsc --noEmit` → exit 0.

## Final review

- Documentary coverage: PASS
- Spec → Code: ALIGNED
- Code → Spec: ALIGNED — one changed path, reviewed, classified behavior_preserving
  with the rationale above.
