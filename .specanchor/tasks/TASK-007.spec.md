---
type: task-spec
id: TASK-007
status: verified
created: 2026-09-20
---
# Task: Correct the qualification

## Request, scope and current behavior

The owner corrected himself immediately after TASK-006 shipped. The qualification is
**Técnico Especialista en Electrónica Industrial**, a Spanish vocational
qualification — not "Ingeniería Técnica Industrial, especialidad Electrónica", which
is what TASK-006 recorded and which is a university engineering degree.

TASK-006 was shipped but **never deployed**, so the wrong text never reached a
visitor. It existed in the repository for one commit.

Knowledge-base text only.

## Desired outcome and acceptance

- **TASK-007/REQ-001** — The profile states the correct qualification.
- **TASK-007/REQ-002** — The prompt forbids rendering it as an engineering title in
  any language, and says why.
- **TASK-007/REQ-003** — A direct question about holding a university degree is
  answered plainly with no, then redirected to the work.
- **TASK-007/AC-001** — No degree-like phrasing survives in the prompt: a pattern scan
  finds no "Ingeniería Técnica Industrial" and no "engineering degree".
- **TASK-007/AC-002** — grep confirms the correct title and the prohibition.
- **TASK-007/AC-003** — The prompt stays above the caching floor of `INV-WORKER-005`.

## Affected anchors and impact rationale

`.specanchor/modules/chat-worker.spec.md`. Classified **behavior_preserving**: the
module contract is untouched; this is content.

## Design note

The risk this guards against got larger, not smaller, with the correction. A model
answering in English about a Spanish vocational qualification in electronics has an
obvious and wrong rendering available — "industrial electronics engineer" — and it
would be a false claim to a title that is legally protected in Spain.

So the instruction is stronger than TASK-006's: not a softer "do not upgrade" but an
explicit list of the words that are forbidden, in any language, with the reason
attached so it is not mistaken for style guidance.

The second half matters as much. Asked outright whether he has a university degree,
the answer is no, and the prompt now says to give it plainly and pivot to the work
rather than deflecting to email. Deflecting a factual question with a known answer
reads as evasion, which is worse than the answer itself — and the answer is not
weak: nine years running the operations he now analyses is the argument.

## Verification evidence

| Requirement | Acceptance | Verification | Actual result | Evidence |
|---|---|---|---|---|
| TASK-007/REQ-001 | TASK-007/AC-002 | grep of `chatbot/src/profile.ts` | pass | EV-001 |
| TASK-007/REQ-002 | TASK-007/AC-001 | pattern scan for degree-like phrasing | pass | EV-002 |
| TASK-007/REQ-003 | TASK-007/AC-002 | grep of the no-degree instruction | pass | EV-001 |
| TASK-007/REQ-001 | TASK-007/AC-003 | prompt length measurement | pass | EV-003 |

- **EV-001** — grep results recorded in this task's commit.
- **EV-002** — pattern scan over the prompt body found zero occurrences of
  "Ingeniería Técnica Industrial" or "engineering degree".
- **EV-003** — prompt measured after the edit, above the 1024-token caching floor.

## Open

Still to verify in production once the Worker is redeployed: ask the live assistant
what it studied, in both languages, and confirm it does not reach for "engineer".
The wrong text was never deployed, so there is nothing live to correct.

`cv.html` still has no education section, raised under TASK-006 and unchanged.

## Final review

- Documentary coverage: PASS
- Spec → Code: ALIGNED
- Code → Spec: ALIGNED
