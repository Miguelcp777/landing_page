---
type: module-spec
module: site-assets
status: draft
source_paths:
  - assets/*
  - favicon.ico
  - favicon.svg
  - apple-touch-icon.png
last_reviewed: 2026-09-19
---

# Module: site-assets

## Responsibility

Every binary and vector asset: the portrait, the analytical diagrams, project cover
art, icons and the vCard QR.

## Public interfaces

- `assets/images/profile-400.webp`, `profile-800.webp` — responsive portrait srcset.
- `assets/images/profile-1.jpg` — the Open Graph image. Referenced absolutely in
  `index.html`; deleting it silently breaks every social preview.
- `assets/images/dashboard-1.svg`, `-2.svg`, `-4.svg` — the three case diagrams.
- `assets/images/project-art/*.webp` — project covers at 640/1200/1800.
- `assets/images/vcard-qr.svg` — a `BEGIN:VCARD` payload a phone camera can read.
- `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`.

## Domain invariants

- **INV-ASSET-001** — Every figure in a diagram is synthetic, and the caption says
  what the reader is looking at. Blurred for the dashboard captures; the planner
  cover is a drawing with its figures shown, and its caption says "illustration"
  rather than borrowing the blurred-capture wording. A caption that misdescribes
  the image is a small, pointless lie on a page about trustworthiness.
- **INV-ASSET-005** — **No capture of employer software.** The dashboard diagrams
  are drawn from scratch. `bpbuilder-*.webp`, captures of an internal tool's UI,
  were removed under TASK-010 when that tool was taken private.
- **INV-ASSET-002** — An SVG must parse. A well-formed-looking file can still be
  invalid, and the server will happily return 200 for it.
- **INV-ASSET-003** — Replacing an asset in place requires bumping the `?v=` string,
  because the filename does not change.
- **INV-ASSET-004** — The QR must stay scannable: module size at or above roughly
  0.5mm at print size, and a white background that survives the dark theme.

## Traps, already paid for

- **The QR shipped broken.** A duplicated `viewBox` made the SVG unparseable. It
  returned HTTP 200 and started with `<svg`, so a naive check passed. It was the
  owner who noticed the image was missing. Verification must parse the XML and check
  `naturalWidth`, not just the status code.
- **Manual redaction of dense dashboards is unreliable.** Three separate passes each
  left a leak: source filenames, a table sliver, and a bubble chart. Each was found
  only by looking at the image again. The diagrams were eventually rebuilt from
  scratch rather than redacted.

## Security and permissions

No real data. Blurring is applied to synthetic numbers, so de-blurring recovers
invented values only — the blur is presentation, not protection.

## Known uncertainties and debt

- Some project cover art is generic AI illustration rather than a real interface
  capture. (OBSERVED) Weaker evidence than a genuine screenshot.
- `profile-2.jpg` and `data-science-bg.jpg` are tracked; their current use was not
  confirmed during bootstrap. (UNKNOWN)

## Statement evidence

| Statement | Evidence status | Source / revision | Verification result |
|---|---|---|---|
| OG image resolves in production | VERIFIED | HTTP 200 for `profile-1.jpg` | pass |
| 15 of 16 images load, none broken | VERIFIED | DOM audit in a browser | pass |
| Diagrams carry the synthetic caption | OBSERVED | `dashboard-*.svg` | — |
| QR parses and renders | VERIFIED | fixed after a duplicated `viewBox`; single-`viewBox` assertion plus XML parse | pass |
| `profile-2.jpg` usage | UNKNOWN | not traced during bootstrap | — |

## Change history

- 2026-09-19 — Created during SDD bootstrap.
