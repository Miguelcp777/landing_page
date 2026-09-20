---
type: module-spec
module: site-pages
status: draft
source_paths:
  - index.html
  - cv.html
last_reviewed: 2026-09-19
---

# Module: site-pages

## Responsibility

The two documents the site serves, their structure, metadata and i18n anchors.

## Public interfaces

- **Section IDs** in `index.html`: `#hero`, `#stats`, `#data-passion`, `#toolbox`,
  `#about`, `#projects`, `#experience`, `#contact`. Navigation links and the reveal
  observer depend on them; renaming one is a contract change.
- **`data-i18n` attributes** — the key namespace consumed by `site-behavior`.
- **`data-project`** on project cards, resolved against `translations[lang].projects`.
- **`data-target`** on `.stat-number`, **`data-width`** on `.skill-bar__fill`.
- **`data-chat`** on `<body>` — the chat panel switch. `"on"` enables it; anything
  else, including absence, leaves it off.
- **`<link rel="canonical">`** declaring `www` as the canonical host.

## Inputs and outputs

Static documents. `cv.html` is standalone and carries its own print stylesheet.

## Domain invariants

- **INV-PAGES-001** — The English copy lives in the markup, not only in the
  translation tables. Crawlers that do not execute JavaScript read the markup.
- **INV-PAGES-002** — One `<link rel="canonical">` per document, pointing at the
  `www` host.
- **INV-PAGES-003** — `data-chat` is `"on"` since 2026-09-20, when the Worker went
  live. It must go back to `"off"` in the same change as any Worker outage or
  teardown: a chat button that fails on every message is worse than no chat button.
- **INV-PAGES-004** — CSS and JS links share one `?v=` value **across both documents**.
  Divergence has silently shipped stale assets before, and under TASK-008 `cv.html`
  was found carrying three separate stale values while `index.html` had one: the
  invariant was written but never checked. Check both files, not just the landing.
- **INV-PAGES-005** — `cv.html` fits on one printed A4 page.

## Dependencies

`site-styles`, `site-behavior`, `chat-widget`, `site-assets`.

## Project cards and their repositories

A card links its source with `.project-card__code`. The card itself is
`role="button"` and opens a modal, so the link needs the capture-phase guard in
`portfolio.js` — without it a click opens the repository **and** the modal behind
it.

| Card | Repository |
|---|---|
| proj2 Contract Revenue Planner | `contract-revenue-planner` |
| proj3 Entrenador Maratón | `Entrenador_Maraton_Valencia` |
| proj6 TuriaDJ | `TuriaDJ` |
| proj7 Comunio Mundial 2026 | `comunio_mundial_2026` |

**Do not link a repository that has not been audited.** proj5 has a public
repository and is deliberately unlinked: it ships `node_modules` and could not be
cloned for review.

## Known uncertainties and debt

- The JSON-LD `jobTitle` in `index.html` says only "Supervisor of Technical Service",
  which understates the analytical framing the rest of the page argues for.
  (OBSERVED) Not yet reconciled with `product-behavior.spec.md`.
- `cv.html` duplicates styling inline instead of sharing the CSS layers. (OBSERVED)
  Deliberate for print isolation, but it is duplication.
- **Nothing checks INV-PAGES-004 automatically.** It was violated in `cv.html` for an
  unknown number of commits and found only by reading the file. A one-line check
  comparing the distinct `?v=` values across both documents would have caught it.

## Tests / verification

No automated tests. Print layout and section integrity are verified manually.

## Statement evidence

| Statement | Evidence status | Source / revision | Verification result |
|---|---|---|---|
| Section IDs and order | OBSERVED | `index.html` @ `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5` | — |
| Canonical present once per page | VERIFIED | assertion in the edit script, one match per file | pass |
| `data-chat` currently `off` | VERIFIED | `grep data-chat index.html` @ `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5` | pass |
| `?v=` unified | VERIFIED | one distinct value across all links | pass |
| CV fits one A4 page | VERIFIED | print rules applied at 703×1047; content 969px, 78px spare, after adding Education | pass |
| `?v=` unified across both documents | VERIFIED | one distinct value in `index.html` and `cv.html` @ `0dd583ab96757632fc7b59ed102fc1d393039341` | pass |
| Eight sections render | VERIFIED | DOM query in a browser, all eight present | pass |

## Change history

- 2026-09-19 — Created during SDD bootstrap.
- 2026-09-20 — TASK-015: `#toolbox` gains a `figure.method-query` after the
  method note. Only its comments are translated (`studio.q0`-`q4`,
  `studio.qCaption`); the SQL is identical in both languages. The query is
  valid PostgreSQL, checked with a parser — see the task for why that matters.
