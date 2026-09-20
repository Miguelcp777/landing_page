---
type: task-spec
id: TASK-012
status: verified
created: 2026-09-20
scope: light
---
# Task: Unstick the background, give the page a voice, calm the covers

## Request

The owner asked to continue with moves B, D and E from the plan agreed in TASK-011:
unstick the background, add typographic contrast, fix the covers that fight the
palette.

## B — the field stops being a wallpaper

`.data-atmosphere` was `position: fixed; inset: 0`. Three consequences, and
TASK-011 made the first two worse:

1. Identical in every viewport, so scrolling never changed it. That is a literal
   restatement of the original complaint.
2. It kept animating regardless of where the reader was. `enabled()` checked paused
   state, reduced motion, pointer type, width and `document.hidden` — **no scroll
   check at all**. Once TASK-011 made the lower bands opaque, the canvas repainted at
   25fps behind opaque sections for the whole visit, for nothing.
3. Its points are laid out across the viewport in a 9×5 grid, which only means
   something while the field *is* the viewport.

It is now `position: absolute` at the top of the document, one viewport tall. It
scrolls away like any other element, the grid keeps its meaning, and an
IntersectionObserver stops the loop once it leaves.

Two supporting changes the move forced:

- Pointer coordinates were `event.clientX/clientY`. That was the same thing while
  the field was fixed; once it scrolls the two diverge and the highlight follows the
  wrong spot. They are now taken from the field's own bounding box.
- `onScreen` initialises to `true`. If the observer never fires — no support, or a
  host that suspends delivery — the behaviour degrades to exactly what it was
  before, never to a dead field.

The grid itself was invisible: 0.65px dots at `opacity: .10`. Now 1.15px at `.18`,
masked off the left where the headline sits and faded out at the foot so it resolves
into the band below instead of being sliced by it.

## D — typographic contrast

The page was Inter at every size. Legible, and it says nothing.

**Instrument Serif** now carries the three lines that make the argument: the hero
statement, the section titles and the bio statement. Everything else stays Inter,
**including the numerals** — a display serif makes figures harder to compare at a
glance, which is the wrong signal on this particular page.

It is one weight plus its italic, on the Google Fonts connection the page already
opens, so no new origin and no new preconnect.

Two details that are the point rather than decoration:

- Instrument Serif sits smaller on the line than Inter at the same size and needs
  less negative tracking (`-.015em`, not Inter's `-.04em`). Sizes were raised to
  compensate; serifs need the room.
- `.hero__statement em` was forced upright, because Inter's italic added nothing.
  It is now italic. A serif italic is the reason to have a serif.

## E — the covers

The AI illustrations are the most saturated thing on the page and the least relevant
work on it. TASK-011's dark band already stopped them reading as garish; they are now
held back at rest (`saturate(.72) contrast(1.03)`) and released on hover and
focus-within. That puts the colour where the visitor put their attention instead of
where the illustration happens to be loudest.

`.project-cover--chart` is excluded. It is a chart, not an illustration, its palette
is the page's own, and desaturating it would only wash it out.

The other half of E is already done and needed nothing: the planner cover used to
dissolve into the page and the dark band fixed that as a side effect.

## Requirements and acceptance

- **TASK-012/REQ-001** — The field scrolls with the document instead of being fixed.
- **TASK-012/REQ-002** — The animation stops when the field is out of view, and
  degrades to the previous behaviour if the observer never reports.
- **TASK-012/REQ-003** — The dot grid is visible.
- **TASK-012/REQ-004** — A display serif carries the hero statement, section titles
  and bio statement; body copy and numerals stay Inter.
- **TASK-012/REQ-005** — Larger display type causes no horizontal overflow at
  desktop or phone width.
- **TASK-012/REQ-006** — Illustrated covers are held back at rest and released on
  hover; the chart cover is untouched.
- **TASK-012/REQ-007** — Contrast stays at WCAG AA everywhere, in both themes, with
  the chat panel open.
- **TASK-012/AC-001** — The field's `bottom` relative to the viewport changes when
  the page is scrolled.
- **TASK-012/AC-002** — Computed font-family, style and size on each target.
- **TASK-012/AC-003** — `scrollWidth <= clientWidth` on the display elements and no
  element extends past the viewport, at 1440 and 375.
- **TASK-012/AC-004** — Computed `filter` at rest, and the hover rule resolves.
- **TASK-012/AC-005** — Contrast audit, both themes, chat open.

## Affected anchors and impact rationale

`.specanchor/modules/site-styles.spec.md` and
`.specanchor/modules/site-behavior.spec.md`. Classified **light**: presentation and
one animation lifecycle. No API, data, permission or architectural contract moves.

## Verification evidence

| Requirement | Acceptance | Verification | Actual result | Evidence |
|---|---|---|---|---|
| TASK-012/REQ-001 | TASK-012/AC-001 | measured the field's rect at scroll 0 and 4200 | pass | EV-001 |
| TASK-012/REQ-002 | — | code review only | **not verified** | EV-002 |
| TASK-012/REQ-003 | — | computed dot size and opacity, plus a screenshot | pass | EV-003 |
| TASK-012/REQ-004 | TASK-012/AC-002 | computed styles on all four targets | passed, then **reverted** | EV-004, EV-008 |
| TASK-012/REQ-005 | TASK-012/AC-003 | overflow scan at 1440×900 and 375×812 | pass | EV-005 |
| TASK-012/REQ-006 | TASK-012/AC-004 | computed filter, and the hover rule read from the CSSOM | pass | EV-006 |
| TASK-012/REQ-007 | TASK-012/AC-005 | contrast audit, both themes | pass — 212 nodes, 0 failures each | EV-007 |

- **EV-001** — `bottom` went from `768` to **`-3432`** at `scrollY 4200`. Fixed
  positioning would have held it at 768.
- **EV-002** — **The observer could not be exercised.** The browser pane reports
  `document.hidden: true`, and IntersectionObserver delivery is tied to rendering
  updates, which a hidden page suspends. A control observer registered by hand on the
  same element also never fired, which is how the limitation was established rather
  than assumed. The mitigation is the initial value: `onScreen = true`, so the
  unverified path can only degrade to the old always-on behaviour.
- **EV-003** — `1.15px` dots at `opacity: .18`, up from `0.65px` at `.10`. Visible
  in the captures at both phone and desktop width.
- **EV-004** — hero, section title and bio all resolve to `"Instrument Serif"`; the
  hero `em` resolves `font-style: italic`; `.hero__description` stays Inter. Both
  faces report `status: loaded`.
- **EV-005** — at 1440: `scrollWidth 1009` against `innerWidth 1024`, zero elements
  past the edge. At 375: `scrollWidth 375`, zero past the edge, and
  `scrollWidth === clientWidth` on all four display elements, so no text overflows a
  clipped box either.
- **EV-006** — rest `saturate(0.72) contrast(1.03)`; the hover rule resolves to
  `filter: none`; the chart cover reports `none` at rest. `filter .45s` is in the
  transition list beside the existing transform.
- **EV-007** — 212 nodes per theme, zero below AA, chat panel opened and one bubble
  of each role planted first. The dark theme was measured on a **clean load**, not by
  clicking the toggle, because the toggle route returns stale computed styles in this
  pane (recorded in TASK-011).

## D was reverted

The owner rejected the serif on sight — *"demasiado diferente al resto"* — and he was
right for a specific reason: Instrument Serif is a display face with very high stroke
contrast, Inter is a grotesque with almost none, so the two took turns instead of
pairing. Four alternatives were rendered with the real headline on the real paper
colour, each with Inter body copy directly beneath, since the defect lived in the
jump between the two rather than in the headline. He chose the no-serif control.

**REQ-004 is withdrawn, not failed.** It was implemented and verified; the
requirement itself was the wrong one. The reasoning and the conditions under which a
second family could be proposed again are in `ADR-0002`.

B and E are untouched by the revert and were re-verified after it.

- **EV-008** — after the revert: all four targets resolve to Inter at their original
  sizes, the hero emphasis is upright again, zero Instrument Serif faces report
  loaded, and the font request is back to one family. B still reports
  `position: absolute` with the grid at `.18`; E still reports
  `saturate(0.72) contrast(1.03)`. Contrast re-audited at 212 nodes per theme, zero
  failures in each, chat panel open.

## Open

- Verified in the local preview, not in production.
- **REQ-002 is unverified**, per EV-002. The first thing to check on a real machine
  is that the field's animation actually stops after scrolling past the hero.
- Google Fonts is a third party in the critical path, and now for two families
  rather than one. Self-hosting the two files in `assets/fonts/` would remove the
  dependency and a DNS round trip. Not done here; it is a separate change.
- **The serif is a taste call, not a measurement.** Everything above says it is
  legible, fits, and breaks nothing. Whether it is *right* for a data analyst's page
  is the owner's judgement, and it reverts by deleting one block of section 39.

## Final review

- Documentary coverage: PASS
- Spec → Code: ALIGNED
- Code → Spec: PARTIAL — REQ-002 has no executed evidence.
