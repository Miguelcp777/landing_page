---
type: module-spec
module: site-behavior
status: draft
source_paths:
  - js/script.js
  - js/portfolio.js
last_reviewed: 2026-09-19
---

# Module: site-behavior

## Responsibility

Everything the page does after it loads: translation, reveal animations, counters,
skill bars, project modals, theme toggle and the animated data field.

## Source ownership

- `js/script.js` — base behavior, 1322 lines.
- `js/portfolio.js` — editorial translations and the data field, 248 lines, loads
  second.

## Public interfaces

- `translations` — an object keyed `en` and `es`, read through `data-i18n`.
- `localStorage` keys: `site-lang` (`en`/`es`), `site-theme` (`light`/`dark`),
  `site-effects` (`on`/`paused`).
- `<html lang>` — written on language change. Other modules observe it.
- IntersectionObserver contracts on `.reveal-section`, `.stat-number[data-target]`
  and `.skill-bar__fill[data-width]`.

## Domain invariants

- **INV-BEHAV-001** — Every translation key exists in both `en` and `es`. A missing
  key renders as an empty element, not as a fallback.
- **INV-BEHAV-002** — `portfolio.js` performs **hard assignment** of
  `translations[lang].projects[id] = {...}`. Whatever `script.js` defined for those
  keys is destroyed. This has already buried richer content once. To extend a project
  entry, edit `portfolio.js`, not `script.js`.
- **INV-BEHAV-003** — Animations respect `prefers-reduced-motion`.
- **INV-BEHAV-004** — Changing `<html lang>` is the signal other modules listen for;
  writing `localStorage` alone is not sufficient.

## Error semantics

No error surface. Failures are silent, which is part of why INV-BEHAV-001 matters.

`portfolio.js` also carries a capture-phase guard that stops a click on
`.project-card__code` from reaching the card's own handler. Capture phase, so it
runs first whatever order the scripts loaded in.

## Known uncertainties and debt

- The `translations` object is large and duplicated across two files with an
  override relationship that is easy to miss. (OBSERVED)
- No automated check that the `en` and `es` key sets match. (OBSERVED) This is the
  single most valuable test this project does not have.

## Statement evidence

| Statement | Evidence status | Source / revision | Verification result |
|---|---|---|---|
| Hard assignment of project translations | OBSERVED | `js/portfolio.js`; documented in `CLAUDE.md` | — |
| `site-lang` persistence | OBSERVED | `js/script.js` around line 897 | — |
| `<html lang>` is written on toggle | VERIFIED | clicked `#lang-toggle`; attribute became `es` | pass |
| Reduced-motion guard on the counter | OBSERVED | `js/script.js`, added in a prior session | — |
| No EN/ES key-parity check exists | OBSERVED | `git ls-files` shows no test files | — |

## Change history

- 2026-09-19 — Created during SDD bootstrap.
- 2026-09-20 — TASK-012: the data-atmosphere loop now stops when the field
  leaves the viewport, and pointer coordinates are taken from the field's own
  box rather than the viewport. Previously the canvas repainted at 25fps for
  the whole visit, including behind opaque sections. `onScreen` defaults to
  true so a host that never delivers the observation degrades to the old
  behaviour rather than to a dead field.
- 2026-09-20 — TASK-013: the code veil, and a split of the effects gate that
  fixes a TASK-012 regression. `interactive()` is about the visitor and governs
  the cursor ring and the veil everywhere; `enabled()` adds the atmosphere
  canvas's own on-screen condition. Folding the two together had killed the
  cursor ring below the hero.
