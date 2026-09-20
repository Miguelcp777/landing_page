---
type: adr
status: accepted
id: ADR-0002
created: 2026-09-20
---

# ADR-0002: One typeface. Typographic contrast comes from size and weight, not a second family

## Context

TASK-011 established by measurement that the page read as flat. TASK-012's move D
answered part of that with a second family: **Instrument Serif** on the hero
statement, the section titles and the bio statement, with Inter everywhere else.

It was verified as sound — both faces loaded, no overflow at desktop or phone width,
212 text nodes per theme at WCAG AA — and the owner rejected it on sight. His words:
*"demasiado diferente al resto"*.

He was right, and the reason is specific rather than a matter of taste. Instrument
Serif is a **display** serif: very high stroke contrast, the thin strokes far thinner
than the thick ones. Inter is a grotesque with almost none. Two faces pair when they
share a skeleton and differ in detail; these share nothing, so instead of one voice
with two registers the page had two voices taking turns.

Rather than argue about fonts in prose, four alternatives were rendered with the
page's real headline, on the page's real paper colour, with Inter body copy directly
beneath each one — because the defect was never in the headline alone, it was in the
jump between the headline and the paragraph under it. The candidates were
Source Serif 4, Literata and Newsreader, all low-contrast reading serifs that pair
with a sans by design, plus the no-serif control.

The owner chose the control.

## Decision

**The site uses one typeface: Inter.** Hierarchy is carried by size, weight, colour
and space.

A second family may be proposed again, but only under two conditions:

1. It is judged **against Inter body copy at real size**, not as a specimen. A
   headline that looks good alone tells you nothing about the pairing.
2. It is a low stroke-contrast face. Display serifs are ruled out for this page.

Reverting D left moves B (the atmosphere field anchored to the first screen) and E
(illustrated covers desaturated at rest) untouched, so the page keeps everything
TASK-012 gained that did not depend on the font.

## Consequences

The page loads one family from Google Fonts rather than two — one fewer font file,
and the self-hosting debt recorded in TASK-012 stays a one-family problem.

The original complaint — that the page looked bland — is answered by the tonal score
and the elevation from TASK-011, not by typography. If it resurfaces, the honest
next moves are spacing rhythm and scale, not another family.

Section 39 of `editorial.css` keeps a comment recording why the serif is absent, so
the next person to have this idea finds the answer before spending an afternoon on
it.
