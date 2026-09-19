---
type: global-spec
status: draft
last_reviewed: 2026-09-19
---

# Architecture

## Purpose

Fix the structural decisions that any change has to respect: what runs where, what
loads in which order, and which boundary the API key never crosses.

## Current behavior with evidence status

**Static site, no build.** (OBSERVED) HTML, CSS and vanilla JavaScript are served as
written. There is no bundler, transpiler, template engine or package manifest at the
repository root. A contributor can open `index.html` from a plain HTTP server and get
the production article.

**The repository is the web root.** (OBSERVED, and VERIFIED by a prior exposure) The
NAS serves a working tree of this repository directly. Everything committed is
publicly reachable. This is not incidental: it caused a real incident in which
`/.git/` was served and the full history was reconstructible.

**Two CSS layers, ordered.** (OBSERVED) `css/styles.css` loads first and carries
sections 1-26. `css/editorial.css` loads second, carries sections 27-34, and wins.

**Two JS layers, ordered.** (OBSERVED) `js/script.js` loads first with the base
behavior; `js/portfolio.js` loads second and overrides parts of it.

**The chat backend is a separate runtime.** (OBSERVED) `chatbot/` is a Cloudflare
Worker in TypeScript with its own `package.json`, the only compiled code in the
project. It is mounted on a route of the site's own domain rather than on a
`workers.dev` subdomain, so the browser calls the same origin that served the page.

## Intended behavior

The static site stays buildless. (INTENT) The absence of a toolchain is the reason a
change can be made and deployed in minutes, and the reason nothing rots between
deployments.

The Worker stays the only component holding a secret. (INTENT) No credential may be
placed in any file the browser can fetch.

## Constraints

- No build step may be introduced for the site without an ADR.
- No server-side code on the NAS. `contact.php` existed and was deliberately removed.
- The Worker may not serve site content; it answers `/api/chat` only.

## Invariants

- **INV-ARCH-001** — The API key exists only in Cloudflare Workers Secrets. It is
  never in the repository, in a frontend file, or in a response body.
- **INV-ARCH-002** — `editorial.css` loads after `styles.css`; `portfolio.js` loads
  after `script.js`. Reordering silently changes rendering and translations.
- **INV-ARCH-003** — Anything committed is public. A file that must stay private must
  not be committed, and `.gitignore` is the mechanism.
- **INV-ARCH-004** — The chat endpoint is same-origin. Moving it to another hostname
  reintroduces CORS and is a contract change.

## Conventions

- CSS sections are numbered in comments and continue across both files. The next
  free number lives in `editorial.css`.
- New editorial styles go in `editorial.css`, not in `styles.css`.

## Non-goals

- A single-page-application router. The site is documents plus modals.
- Server-side rendering, a CMS, or a database.

## Evidence / sources

| Statement | Status | Source / revision |
|---|---|---|
| No build step at root | OBSERVED | absence of root `package.json`; `git ls-files` at `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5` |
| Load order of CSS and JS | OBSERVED | `index.html` link and script tags |
| Repo is web root | OBSERVED | `CLAUDE.md`; `README.md` |
| `/.git/` was publicly served and is now 404 | VERIFIED | HTTP probe of five `.git` paths, all 404, this session |
| Worker is the only compiled code | OBSERVED | `chatbot/package.json`, `chatbot/tsconfig.json` |
| Worker typecheck passes | VERIFIED | `./node_modules/.bin/tsc --noEmit` exit 0 at `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5` |

## Unknowns

- Nginx and Web Station configuration are not in the repository and were not read
  during bootstrap. (UNKNOWN) Their content is part of the real contract.

## Change history

- 2026-09-19 — Created during SDD bootstrap at `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5`.
