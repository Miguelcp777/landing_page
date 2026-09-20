---
type: task-spec
id: TASK-013
status: verified
created: 2026-09-20
scope: light
---
# Task: A veil of SQL and Python revealed under the cursor

## Request

The owner asked for the reveal effect he had seen elsewhere — a second layer showing
through around the pointer — and proposed that on this page the hidden layer should
be **SQL queries and Python code**, across the whole site.

It is the strongest idea anyone has had for this page, because it is not decoration.
The site's largest weakness has always been that it *claims* analytical skill; an
effect made of real query code turns an ornament into evidence a visitor stumbles
into.

## The two constraints that shaped the build

**Legibility cannot be traded for the effect.** This page argues that its author is
careful with data. An effect that made the copy harder to read would refute the
argument more effectively than the effect supports it. So the guarantee is
structural rather than a matter of tuning opacity until it seems fine:

```
section background   (band colour, paints first)
  code veil          z-index 1, position: fixed
    section content  z-index 2, via main > section > .container
```

The veil is physically incapable of covering a word, because every word paints
above it. What it fills instead is the empty space, of which this page has a great
deal. It also carries `pointer-events: none`, so it cannot intercept a click either
— confirmed by `elementFromPoint` returning the card under the cursor, not the veil.

**The code is invented.** The confidentiality rule in `CLAUDE.md` covers decoration
too. Eight snippets: deduplication by `row_number()`, a cost-per-system aggregate, a
pandas outer-join reconciliation that logs disagreements, multi-format date parsing,
expiry bucketing by quarter, a data-quality assertion block, an ASP query with
`percentile_cont`, and a coverage query with `count(*) filter`. Tables are
`install_base`, `service_orders`, `contracts`. No employer system, table, column,
customer or figure appears.

They were chosen to be genuinely competent rather than plausible-looking, since the
audience most likely to read them closely is the one being persuaded.

## mix-blend-mode failed, and what replaced it

One fixed layer spans bands of opposite lightness — paper for most of the page,
near-black for the projects chapter — and no single ink reads on both.
`mix-blend-mode: overlay` was the obvious answer and it produced **nothing visible**
on the near-white ground: overlay against a very light backdrop screens toward
white.

The replacement needs no blending. The reveal is a 190px circle, so only the band
under the cursor is ever visible, and one ink at a time is enough: the script reads
`--primary-color` from whichever section is under the pointer and sets it as
`--veil-ink`. Deep green `#235d47` on the light bands, mint `#b5ddc1` on the dark
chapter, and it follows the theme for free because it reads the live token. Values
are cached per element and the cache is discarded in `sync()`, which already runs on
a theme change.

## A regression from TASK-012, found here

TASK-012 folded `onScreen` into `enabled()` so the atmosphere canvas would stop when
its field scrolled away. But `enabled()` also gated the pointer handler and the
cursor ring — so since yesterday **the cursor ring has died the moment you scroll
past the hero**, which nobody noticed because the pane that would have shown it
reports `document.hidden`.

The gate is now split by what it is actually about:

- `interactive()` — the visitor: paused state, reduced motion, pointer type, width,
  tab visibility. Governs the ring and the veil, everywhere on the page.
- `enabled()` — `interactive()` plus the canvas's own condition, that its field is
  still on screen.

## Requirements and acceptance

- **TASK-013/REQ-001** — Code is revealed around the cursor across the page.
- **TASK-013/REQ-002** — The veil can never obscure text, structurally rather than by
  tuning, and can never intercept a pointer event.
- **TASK-013/REQ-003** — The ink is legible on both the light bands and the dark
  chapter, and follows the theme.
- **TASK-013/REQ-004** — No employer, customer or system identifier appears in the
  snippets.
- **TASK-013/REQ-005** — The existing "Pause effects" control, reduced motion, coarse
  pointers and narrow viewports all suppress it, like every other pointer effect.
- **TASK-013/REQ-006** — The cursor ring works below the hero again.
- **TASK-013/REQ-007** — Contrast stays at WCAG AA and nothing overflows.

## Verification evidence

| Requirement | Verification | Actual result | Evidence |
|---|---|---|---|
| TASK-013/REQ-001 | lit the veil at points in `#hero` and `#projects`, captured both | pass | EV-001 |
| TASK-013/REQ-002 | computed z-index of veil and containers; `elementFromPoint` under the cursor | pass | EV-002 |
| TASK-013/REQ-003 | read `--veil-ink` resolved over each band | pass | EV-003 |
| TASK-013/REQ-004 | the snippets are in the diff and were written for this task | pass | EV-004 |
| TASK-013/REQ-005 | code review of the gate plus the three media queries | **partial** | EV-005 |
| TASK-013/REQ-006 | code review of the split gate | **not verified** | EV-005 |
| TASK-013/REQ-007 | contrast audit, chat open | pass — 215 nodes, 0 failures | EV-006 |

- **EV-001** — captured with the code visible behind the hero copy and, separately,
  in mint in the gutters of the dark chapter. The headline and body copy are
  untouched in both.
- **EV-002** — veil `z-index: 1`, `position: fixed`; `#toolbox > .container`
  `z-index: 2`; `pointer-events: none`; `elementFromPoint(394, 420)` returns
  `project-card__body`, not the veil. Nothing that must escape a stacking context
  sits inside a section container — the header, chat, modal, skip link and cursor
  ring are all outside, at z-index 900 and above.
- **EV-003** — `#hero` resolves the ink to `#235d47`, `#projects` to `#b5ddc1`, and
  the grid's computed colour follows: `rgb(35,93,71)` then `rgb(181,221,193)`.
- **EV-004** — every table and column name is invented. Grep the diff.
- **EV-005** — **the effect was never driven by a real pointer.** The browser pane
  reports `document.hidden`, which is one of the conditions `interactive()` gates on,
  so a synthesised `pointermove` is correctly refused and the handler cannot be
  exercised here. Everything above was verified by setting the presentation
  properties directly and reading back what the ink logic would have chosen. The
  suppression paths and the ring fix are code review only.
- **EV-006** — 215 text nodes, zero below AA, chat panel open, veil descendants
  excluded from the audit since they are decoration behind the text.

## Open

- Verified in the local preview, not in production, and **never with a real cursor**
  — see EV-005. The first things to check on a real machine: that the code follows
  the pointer smoothly, that the ring works below the hero again, and that
  "Pausar efectos" turns the veil off.
- The reveal radius (190px), the ink opacity (`.55`) and the snippet font size
  (11.5px) are first guesses. They are three numbers in section 40.
- In card-dense sections the veil shows mainly in the gutters, because cards are
  opaque and sit above it. That is the legibility guarantee working as designed, not
  a defect, but it does mean the effect is strongest in the sections with the most
  empty space.
- The layer is `position: fixed` and does not shift with scroll. Through a 190px
  aperture that is not perceptible, so no parallax was added.

## Final review

- Documentary coverage: PASS
- Spec → Code: ALIGNED
- Code → Spec: PARTIAL — REQ-005 and REQ-006 have no executed evidence.
