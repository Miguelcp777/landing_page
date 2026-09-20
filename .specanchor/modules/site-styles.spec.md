---
type: module-spec
module: site-styles
status: draft
source_paths:
  - css/*
last_reviewed: 2026-09-19
---

# Module: site-styles

## Responsibility

All presentation. Two ordered layers: an inherited base and an editorial layer that
overrides it.

## Source ownership

- `css/styles.css` — sections 1-26, inherited. Modify with care.
- `css/editorial.css` — sections 27-34, the layer that wins. New work goes here.

## Public interfaces

Theme custom properties on `:root`, redefined for the light theme:
`--bg-body`, `--bg-surface`, `--text-primary`, `--text-secondary`, `--primary-color`,
`--border`, `--font-heading`, `--font-body`.

Structural class names consumed by `site-behavior`: `.reveal-section`,
`.reveal-stagger`, `.stat-number`, `.skill-bar__fill`, `.visually-hidden`.

## Domain invariants

- **INV-STYLE-001** — `editorial.css` loads after `styles.css`. Reversing the order
  breaks the page.
- **INV-STYLE-002** — Colours come from the theme variables, never hard-coded, so the
  light/dark toggle keeps working.
- **INV-STYLE-003** — Section numbering is continuous across both files. The next
  free number is **39**, in `editorial.css`.
- **INV-STYLE-004** — A section that wants a different tone redefines the **tokens**,
  not the colours. Section 38 gives `#projects` its dark band by overriding
  `--bg-body`, `--text-primary` and the rest on the section itself; because custom
  properties inherit down the tree regardless of which selector consumes them, the
  whole subtree restyles with no component rule touched. Setting `background` and
  `color` directly on a section is the wrong move: its children keep the tokens of
  the theme outside it and the text disappears.

## Traps, already paid for

These are the two failure modes that have actually cost time here:

- **Specificity.** `styles.css` contains rules like `html.light-theme .foo`, which is
  (0,2,1) and beats `.editorial .foo` at (0,2,0). When an editorial rule appears not
  to apply, check this before anything else. The fix used for the stat counters was
  to raise specificity to `html .editorial .stat-number`, not to add `!important`.
- **`--primary-gradient` is a dark green** and disappears against a dark surface. For
  text and fills use the flat, themed `var(--primary-color)`.
- **A hard-coded colour that matches its token is still a bug.** Nine rules under
  `html.light-theme` in `styles.css` wrote `#0F172A` and `#475569` literally. They
  rendered correctly for as long as the page had one light theme, because those sit
  close to the editorial values — and then TASK-011 introduced a section that
  overrides the tokens, which a literal cannot follow. Project titles came out at
  contrast **1.31**. `INV-STYLE-002` had forbidden this all along; nothing enforced
  it. All nine are now `var()`.

A third, smaller one: an `inline-flex` element computes to `flex` inside a flex
container, so the display value you wrote is not necessarily the one that applies.

## Performance / operational constraints

Both files are served uncompiled and unminified, cache-busted by the shared `?v=`.

## Known uncertainties and debt

- `styles.css` is 2301 lines of inherited CSS with no test coverage. (OBSERVED) Any
  refactor is unguarded.
- Some icons are emoji characters rather than SVG. (OBSERVED) Inconsistent with the
  LinkedIn and chat marks, which are inline SVG.

## Statement evidence

| Statement | Evidence status | Source / revision | Verification result |
|---|---|---|---|
| Load order | OBSERVED | `index.html` link tags @ `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5` | — |
| Section numbering, next is 35 | OBSERVED | trailing comment blocks in `editorial.css` | — |
| Specificity trap is real | VERIFIED | stat numbers rendered invisible until specificity was raised | pass |
| Chat panel follows the theme | VERIFIED | toggled to dark in a browser; panel surfaces and text followed | pass |
| `styles.css` is 2301 lines | VERIFIED | `grep -c ''` @ `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5` | pass |
| Four tonal bands render per theme | VERIFIED | computed `background-color` of the eight sections, both themes, TASK-011 | pass |
| No text falls below WCAG AA | VERIFIED | contrast audit over 213 rendered text nodes, both themes, TASK-011 | pass |
| Section 38 is the last section | VERIFIED | trailing comment blocks in `editorial.css` | pass |

## Change history

- 2026-09-19 — Created during SDD bootstrap.
- 2026-09-20 — TASK-011: section 38, the tonal score and the shadow scale.
  `INV-STYLE-004` added; nine literal colours converted to tokens.
