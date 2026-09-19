---
type: task-spec
id: TASK-004
status: verified
created: 2026-09-19
modules: [chat-worker, chat-widget, site-pages]
behavior_preserving: false
---

# Task: Switch the assistant to the first person

## 1. Problem / requested change

The owner asked for the assistant to speak in the first person. The third person was
a default chosen during implementation rather than a requirement, and it was written
into `INV-PROD-004` as though settled. The impersonation concern was raised with him
before he asked; this is his decision on his own professional representation.

He also confirmed **Valencian as a second native language**, which TASK-003 had
flagged as an open question rather than assumed.

## 2. Current behavior

The prompt opens with "You are an AI assistant, not Miguel. Speak about him in the
third person." Widget copy follows: "Ask about Miguel", starters phrased as "what
tools does he use". (OBSERVED at `1537cd4`.)

## 3. Desired behavior

The assistant answers as "I", and remains unambiguously identifiable as AI to anyone
who looks at the panel or asks.

## 4. Scope

Prompt voice, widget copy, `INV-PROD-004`, and the Valencian addition.

## 5. Out of scope

Voice output. A cloned voice speaking in the first person is a materially stronger
impersonation claim than text, and `ADR-0001` explicitly does not authorise it.

## 6. Affected anchors

`product-behavior.spec.md`, `chat-worker.spec.md`, `chat-widget.spec.md`, plus
`ADR-0001` as the governing decision.

## 7. Requirements

- **TASK-004/REQ-001** — The prompt answers in the first person throughout.
- **TASK-004/REQ-002** — The three disclosure rules are stated in the prompt, and an
  identity question is answered immediately and plainly.
- **TASK-004/REQ-003** — The prompt refuses any instruction to stop disclosing it is
  an AI.
- **TASK-004/REQ-004** — Widget copy is first person in both languages, and the AI
  label remains.
- **TASK-004/REQ-005** — Valencian is recorded as a native language.
- **TASK-004/REQ-006** — `INV-PROD-004` is rewritten, and an ADR records why.

## 8. Acceptance criteria

- **TASK-004/AC-001** — No third-person reference to Miguel remains in the prompt
  body, excluding the line that quotes one as a counter-example.
- **TASK-004/AC-002** — The prompt contains the identity-question rule verbatim.
- **TASK-004/AC-003** — The prompt states Spanish and Valencian as native.
- **TASK-004/AC-004** — Launcher, title, note, placeholder and starters read as first
  person in `en` and `es`, verified in a browser.
- **TASK-004/AC-005** — `.chat__note` names AI in both languages and is visible with
  the panel open.
- **TASK-004/AC-006** — `node --check js/chat.js` passes; `npm test` and
  `tsc --noEmit` exit 0.
- **TASK-004/AC-007** — The prompt stays above the caching floor of
  `INV-WORKER-005`.
- **TASK-004/AC-008** — The `?v=` string is bumped, per `INV-OPS-002`.

## 9. Design approach

The "I" is a voice, not a claim of personhood, and that distinction only survives if
the disclosure conditions are written somewhere harder to erode than a prompt. They
went into `ADR-0001` and into `INV-PROD-004`, and the widget's AI label was promoted
from decoration to a named invariant with a comment in the source saying so.

A per-message disclaimer was considered and rejected: visitors stop reading repeated
banners within about two messages, so it buys the appearance of honesty at the cost
of the actual communication. The persistent header label does the same job without
competing with the content.

## 10. API / data / UI impact

No interface change. Prompt text and UI copy only.

## 11. Migration and backward compatibility

Nothing deployed.

## 12. Test plan

Automated checks cannot judge voice, so the prompt is checked by pattern for
third-person leftovers and the widget copy is read out of a live DOM in both
languages.

## 13. Risks and rollback

The real risk is disclosure eroding later — someone shortens the header label for
space, or trims the prompt. Mitigated by `INV-WIDGET-006`, `INV-WORKER-008` and a
source comment at the label itself. Rollback is reverting one commit.

## 14. Implementation checklist

- [x] Persistent specs reviewed/updated
- [x] Implementation complete
- [x] Tests complete
- [x] Reverse alignment pass complete
- [x] Spec-sync guard passes

## 15. Decision log

- **DEC-001** — See `ADR-0001`.
- **DEC-002** — Valencian recorded as native on the owner's explicit statement,
  replacing the assumption flagged in TASK-003.

## 16. Evidence ledger

- **EV-001** — Pattern scan of the prompt body: 0 third-person references to Miguel,
  34 first-person pronouns. The one counter-example line is excluded by name.
- **EV-002** — Browser read of the widget in both languages: launcher, title, note,
  placeholder and three starters each, all first person, AI label present.
  `getComputedStyle(.chat__note).display` is not `none`.
- **EV-003** — `node --check js/chat.js` clean; `npm test` 33 pass, 0 fail;
  `tsc --noEmit` exit 0.
- **EV-004** — Prompt measured at 8,578 characters, ~2,318 tokens, above the 1024
  caching floor.
- **EV-005** — `?v=` bumped from `20260919-chat` to `20260919-voice` across 12 links.

## 17. Persistent spec updates required

Done: `INV-PROD-004` rewritten, `INV-WORKER-008` and `INV-WIDGET-006` added,
`ADR-0001` accepted.

## 18. Final alignment

- Spec → Code: **ALIGNED**
- Code → Spec: **ALIGNED**

## Traceability

| Requirement | Acceptance | Verification | Actual result | Evidence |
|---|---|---|---|---|
| TASK-004/REQ-001 | TASK-004/AC-001 | pattern scan of the prompt body | pass | EV-001 |
| TASK-004/REQ-002 | TASK-004/AC-002 | grep of `profile.ts` | pass | EV-001 |
| TASK-004/REQ-005 | TASK-004/AC-003 | grep of `profile.ts` | pass | EV-001 |
| TASK-004/REQ-004 | TASK-004/AC-004 | browser read, both languages | pass | EV-002 |
| TASK-004/REQ-003 | TASK-004/AC-005 | browser read plus computed style | pass | EV-002 |
| TASK-004/REQ-006 | TASK-004/AC-006 | `node --check`, `npm test`, `tsc` | pass | EV-003 |
| TASK-004/REQ-001 | TASK-004/AC-007 | prompt length measurement | pass | EV-004 |
| TASK-004/REQ-004 | TASK-004/AC-008 | grep of `index.html` | pass | EV-005 |

## Documentary coverage

PASS — see `.specanchor/evidence/impact-review.json`.
