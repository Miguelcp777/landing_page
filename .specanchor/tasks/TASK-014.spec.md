---
type: task-spec
id: TASK-014
status: verified
created: 2026-09-20
scope: light
---
# Task: X-ray on the portrait

## Request

With the code veil live, the owner asked what could happen when the cursor passes
over his photo.

The answer was already implied by the veil. The portrait is the only opaque object
on the page large enough to hide it completely — everywhere else the code finds a
gutter or a margin, but a 320×400 photograph is a wall. Opening a soft hole in it
makes the portrait the one place where the effect means something rather than just
happening again: behind the photo there is no band colour, because the hero is
transparent, so what comes through is the veil, then the atmosphere field, then the
paper. "The data behind the person" is the page's actual argument.

## What it does

Hovering the figure opens a 150px lens centred on the cursor, 62% transparent at
its centre and fully opaque by the edge, so the face reads as translucent rather
than bitten into. A slow desaturation runs underneath it so the code reads through
more cleanly.

The caption is deliberately untouched. The role and the employer stay fully legible
whatever the cursor is doing; they are the two facts a recruiter is checking.

Coordinates are the figure's own, not the viewport's, and they ride the existing
pointer handler — which means the "Pausar efectos" control, reduced motion, coarse
pointers and narrow viewports all suppress it for free, with no second gate to keep
in sync.

## Requirements and acceptance

- **TASK-014/REQ-001** — Hovering the portrait reveals the veil through it.
- **TASK-014/REQ-002** — At rest the portrait carries no mask, no filter and no
  class: the effect leaves no trace when it is not running.
- **TASK-014/REQ-003** — The caption stays fully opaque.
- **TASK-014/REQ-004** — The same conditions that suppress the other pointer effects
  suppress this one.
- **TASK-014/REQ-005** — Contrast stays at WCAG AA.

## Verification evidence

| Requirement | Verification | Actual result | Evidence |
|---|---|---|---|
| TASK-014/REQ-001 | lens driven to the face, captured | pass | EV-001 |
| TASK-014/REQ-002 | computed mask, filter and class on a fresh load | pass | EV-002 |
| TASK-014/REQ-003 | the rule targets `img`; the caption is a sibling | pass | EV-003 |
| TASK-014/REQ-004 | code review — one handler, one gate | **not verified** | EV-004 |
| TASK-014/REQ-005 | contrast audit, chat open | pass — 212 nodes, 0 failures | EV-005 |

- **EV-001** — captured with the Python data-quality block and the `row_number()`
  dedup readable through his head and shoulder, the face still clearly recognisable.
- **EV-002** — on a fresh load the portrait reports `mask: none`, `filter: none`,
  `is-xray: false`.
- **EV-003** — `.editorial-portrait.is-xray img` addresses the image only.
- **EV-004** — same limitation as TASK-013: the pane reports `document.hidden`, one
  of the conditions `interactive()` gates on, so the handler cannot be driven here.
- **EV-005** — 212 nodes, zero below AA, chat panel open.

## A measurement trap worth recording

Two screenshots in this task were **stale**, and both times the stale frame said the
mask was not rendering when it was. The first radial mask was reported as invisible;
a deliberately extreme control — a linear gradient cutting the photo in half — then
rendered correctly, proving masks work on the image, and re-running the original
radial produced the effect immediately.

That is the fourth stale reading from this pane in one session. The pattern is now
clear enough to state as a rule: **when a visual change appears not to have applied,
verify with a control before believing it.** A computed style that says the rule is
there while the picture says it is not means the picture is wrong, not the rule.

## Open

- Verified in the local preview, never with a real cursor — see EV-004.
- Three numbers are first guesses and sit together in section 41: the lens radius
  (150px), the centre transparency (`.38` alpha) and the desaturation (`.32`).
- The desaturation could not be judged: `filter` transitions do not advance while
  the pane suspends rendering, so every reading caught it frozen at its start value.

## Final review

- Documentary coverage: PASS
- Spec → Code: ALIGNED
- Code → Spec: PARTIAL — REQ-004 has no executed evidence.
