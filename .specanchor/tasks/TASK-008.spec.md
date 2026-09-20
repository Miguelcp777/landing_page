---
type: task-spec
id: TASK-008
status: verified
created: 2026-09-20
---
# Task: Education on the CV, and two prompt corrections

## Request, scope and current behavior

Three things, all small, all from testing the live assistant.

1. The deployed chat said "Tengo **una** Técnico Especialista". The agreement is wrong
   in Spanish and a native reader notices at once.
2. It volunteered "de grado superior", a classification I never wrote. It happens to
   be correct, but the model inferred it, and an inference that lands today can miss
   tomorrow.
3. `cv.html` had **no education section at all** — summary, experience and skills,
   nothing else. The chat could answer what he studied; the document a recruiter
   downloads could not.

Found while doing the above: `cv.html` carried **three different** cache-busting
values (`20260815`, `20260916-2`, `20260920qr2`) while `index.html` carried one. The
earlier unification only ever touched the landing page.

## Desired outcome and acceptance

- **TASK-008/REQ-001** — The prompt gives the correct Spanish phrasing and forbids
  "una Técnico".
- **TASK-008/REQ-002** — The prompt forbids classifying the qualification by level.
- **TASK-008/REQ-003** — `cv.html` carries an Education section.
- **TASK-008/REQ-004** — `cv.html` still fits one printed A4 page.
- **TASK-008/REQ-005** — Both documents request assets at the same `?v=`.
- **TASK-008/AC-001** — grep confirms both prompt instructions.
- **TASK-008/AC-002** — The rendered CV shows four sections ending in Education.
- **TASK-008/AC-003** — Print height at A4 content size stays under 1047px.
- **TASK-008/AC-004** — `index.html` and `cv.html` each resolve to exactly one
  distinct `?v=`, and it is the same one.

## Affected anchors and impact rationale

`chat-worker.spec.md` (the prompt) and `site-pages.spec.md` (the CV).

Both classified **behavior_preserving** for their modules' contracts: no interface,
binding, error code or invariant changes meaning. `INV-PAGES-005`, the one-page rule,
is preserved and now carries measured evidence instead of a recollection.

## How the one-page rule was checked

Not by eye and not by recollection. The `@media print` blocks were extracted from the
document's own inline styles and re-applied as ordinary CSS at the A4 content box,
703×1047 px, which is 210×297 mm minus the 10/12 mm margins the stylesheet sets.

- Before: **921 px**, 126 px spare.
- After: **969 px**, 78 px spare. The Education section costs 37 px, 48 with margins.

The measurement was taken twice: the first reading showed only three sections because
the browser had served a cached `cv.html`, which is exactly the class of error this
session spent the afternoon fixing at the edge.

## Verification evidence

| Requirement | Acceptance | Verification | Actual result | Evidence |
|---|---|---|---|---|
| TASK-008/REQ-001 | TASK-008/AC-001 | grep of `chatbot/src/profile.ts` | pass | EV-001 |
| TASK-008/REQ-002 | TASK-008/AC-001 | grep of `chatbot/src/profile.ts` | pass | EV-001 |
| TASK-008/REQ-003 | TASK-008/AC-002 | DOM read of the rendered CV | pass | EV-002 |
| TASK-008/REQ-004 | TASK-008/AC-003 | print rules applied at 703×1047, height measured | pass | EV-003 |
| TASK-008/REQ-005 | TASK-008/AC-004 | pattern scan of both documents | pass | EV-004 |

- **EV-001** — grep results recorded in this task's commit.
- **EV-002** — four sections read from the DOM, ending in Education; no horizontal
  overflow at 703 px.
- **EV-003** — 969 px against 1047 px available, 78 px spare.
- **EV-004** — both documents resolve to exactly `20260920-fixhist`, asserted in the
  edit script rather than eyeballed.

## Open

Redeploy the Worker for the prompt corrections to take effect; the CV change needs a
NAS pull. Neither is done by this commit.

The prompt now carries three separate "do not inflate" rules — title, level, language
agreement. If a fourth appears, they are probably better as one short list than as
three paragraphs.

## Final review

- Documentary coverage: PASS
- Spec → Code: ALIGNED
- Code → Spec: ALIGNED
