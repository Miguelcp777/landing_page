---
type: task-spec
id: TASK-006
status: verified
created: 2026-09-20
---
# Task: Record the degree

## Request, scope and current behavior

The owner supplied his degree: Ingeniería Técnica Industrial, especialidad
Electrónica. Until now the assistant deflected every question about education to
email, which reads badly — "what did he study?" is a routine screening question, and
an answer of "I do not have that" invites the reading that something is being hidden.

Knowledge-base text only. No code, no interface, no limits.

## Desired outcome and acceptance

- **TASK-006/REQ-001** — The profile states the degree.
- **TASK-006/REQ-002** — The prompt forbids upgrading it to "Ingeniería Industrial" or
  to a Master's, which are different and longer qualifications in Spain.
- **TASK-006/REQ-003** — The institution and the years stay unanswered, because the
  owner did not supply them.
- **TASK-006/AC-001** — grep confirms the degree and the do-not-inflate instruction.
- **TASK-006/AC-002** — The undecided list no longer names education as wholly unknown,
  but still withholds institution and years.
- **TASK-006/AC-003** — The prompt stays above the caching floor of `INV-WORKER-005`.

## Affected anchors and impact rationale

`.specanchor/modules/chat-worker.spec.md` owns `chatbot/*`. Classified
**behavior_preserving**: the module's contract — HTTP interface, bindings,
invariants, error codes — is untouched, and the spec's statements about the profile
carrying guardrails and an undecided list both remain true. What changes is content.

## Design note

The explicit instruction not to inflate the title is the point of this change, not
padding. "Ingeniería Técnica Industrial" and "Ingeniería Industrial" differ by a real
qualification in Spain, the names are one word apart, and a model asked in English
has every incentive to reach for the more impressive rendering. Overstating a degree
on someone's behalf is the kind of error that surfaces in a background check, which
makes it far worse than an admitted gap.

The same reasoning already governs the English level, pinned at B2 under TASK-003.

## Verification evidence

| Requirement | Acceptance | Verification | Actual result | Evidence |
|---|---|---|---|---|
| TASK-006/REQ-001 | TASK-006/AC-001 | grep of `chatbot/src/profile.ts` | pass | EV-001 |
| TASK-006/REQ-002 | TASK-006/AC-001 | grep of `chatbot/src/profile.ts` | pass | EV-001 |
| TASK-006/REQ-003 | TASK-006/AC-002 | grep of the undecided list | pass | EV-001 |
| TASK-006/REQ-001 | TASK-006/AC-003 | prompt length measurement | pass | EV-002 |

- **EV-001** — grep results recorded in this task's commit.
- **EV-002** — prompt measured after the edit, above the 1024-token caching floor.

## Open, and outside this task

`cv.html` has **no education section at all**. Three sections only: summary,
experience, technical skills. The degree now answerable by the chat is still absent
from the document a recruiter downloads, which is the more formal artifact of the
two. Raised with the owner rather than fixed here.

## Final review

- Documentary coverage: PASS
- Spec → Code: ALIGNED
- Code → Spec: ALIGNED
