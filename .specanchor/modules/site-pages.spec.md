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
- **INV-PAGES-004** — CSS and JS links share one `?v=` value. Divergence has silently
  shipped stale assets before.
- **INV-PAGES-005** — `cv.html` fits on one printed A4 page.

## Dependencies

`site-styles`, `site-behavior`, `chat-widget`, `site-assets`.

## Known uncertainties and debt

- The JSON-LD `jobTitle` in `index.html` says only "Supervisor of Technical Service",
  which understates the analytical framing the rest of the page argues for.
  (OBSERVED) Not yet reconciled with `product-behavior.spec.md`.
- `cv.html` duplicates styling inline instead of sharing the CSS layers. (OBSERVED)
  Deliberate for print isolation, but it is duplication.

## Tests / verification

No automated tests. Print layout and section integrity are verified manually.

## Statement evidence

| Statement | Evidence status | Source / revision | Verification result |
|---|---|---|---|
| Section IDs and order | OBSERVED | `index.html` @ `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5` | — |
| Canonical present once per page | VERIFIED | assertion in the edit script, one match per file | pass |
| `data-chat` currently `off` | VERIFIED | `grep data-chat index.html` @ `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5` | pass |
| `?v=` unified | VERIFIED | one distinct value across all links | pass |
| CV fits one A4 page | OBSERVED | measured in a prior session after the QR was added | — |
| Eight sections render | VERIFIED | DOM query in a browser, all eight present | pass |

## Change history

- 2026-09-19 — Created during SDD bootstrap.
