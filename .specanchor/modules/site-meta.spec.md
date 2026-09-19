---
type: module-spec
module: site-meta
status: draft
source_paths:
  - robots.txt
  - googlebcc3d894ce85ddc8.html
last_reviewed: 2026-09-19
---

# Module: site-meta

## Responsibility

How crawlers and Google Search Console see the site.

## Public interfaces

- `robots.txt` — crawler directives.
- `googlebcc3d894ce85ddc8.html` — Search Console verification. Its **content** is the
  contract, not just its presence: it must contain the verification line naming the
  same token as the filename.

## Domain invariants

- **INV-META-001** — The verification file must never be deleted, renamed or have its
  contents altered. Losing it loses the Search Console property.
- **INV-META-002** — It existed untracked on the NAS before being committed. It is
  now in git, but the NAS copy is the one that is served; both must agree.

## Traps, already paid for

The file being untracked on the NAS caused a pull to abort, because the incoming
commit added a path that already existed in the working tree. The remedy was to move
it aside, pull, then diff to confirm the two copies were identical.

Related: never run `git clean -fd` in the web root. It would remove this file and
Synology's `@eaDir/`.

## Known uncertainties and debt

- Cloudflare's Bot Preference Sync prepends managed directives to the served
  `robots.txt`. (OBSERVED, reported from the dashboard) Once the zone is active, what
  the internet receives will no longer match this file byte for byte.
- There is no `sitemap.xml`. (OBSERVED)

## Statement evidence

| Statement | Evidence status | Source / revision | Verification result |
|---|---|---|---|
| Verification file serves the correct token | VERIFIED | fetched in production; content matches the filename token | pass |
| `robots.txt` returns 200 | VERIFIED | HTTP probe | pass |
| No sitemap | OBSERVED | `git ls-files` @ `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5` | — |

## Change history

- 2026-09-19 — Created during SDD bootstrap.
