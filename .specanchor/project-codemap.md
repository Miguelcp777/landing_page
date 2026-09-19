# Project Codemap

Revision at capture: `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5` (branch `master`).

## Runtime / stack

Static site: HTML5, CSS3 and vanilla JavaScript. **No build step, no bundler, no
framework, no server-side code.** Served by Nginx on a Synology NAS from a working
tree of this repository.

One piece of compute exists: a Cloudflare Worker (TypeScript) in `chatbot/`, not yet
deployed, which backs the chat panel.

## Entry points

| Entry | Path | Notes |
|---|---|---|
| Landing page | `index.html` | The whole site is one page plus modals |
| CV | `cv.html` | Standalone, own print stylesheet |
| Chat API | `chatbot/src/index.ts` | `POST /api/chat` — not deployed yet |

## Main modules

| Module | Responsibility | Primary paths | Dependencies |
|---|---|---|---|
| site-pages | Document structure, metadata, i18n anchors | `index.html`, `cv.html` | site-styles, site-behavior, site-assets |
| site-styles | Base cascade plus the editorial layer that overrides it | `css/*` | — |
| site-behavior | i18n, reveal, counters, skill bars, modals, data field | `js/script.js`, `js/portfolio.js` | site-pages |
| chat-widget | Chat panel UI and streaming client | `js/chat.js` | chat-worker, site-styles |
| chat-worker | API key custody, validation, rate limiting, model call | `chatbot/*` | Anthropic API, Cloudflare KV |
| site-assets | Portrait, diagrams, project art, icons, vCard QR | `assets/*`, `favicon.*` | — |
| site-meta | Crawler directives and search-console verification | `robots.txt`, `googlebcc3d894ce85ddc8.html` | — |

## Data stores

None in the site. The Worker uses one Cloudflare KV namespace (`CHAT_RL`) holding
only rate-limit counters keyed by IP and by day. No user data is persisted anywhere.
Chat history lives in the visitor's `sessionStorage` and never leaves their browser
except as request bodies to the Worker.

## External integrations

| Integration | Used by | Notes |
|---|---|---|
| Anthropic Messages API | chat-worker | Key in Workers Secrets, never in the repo |
| Cloudflare Workers KV | chat-worker | Rate-limit counters only |
| Cloudflare Turnstile | chat-worker | Optional, skipped when the secret is unset |
| Google Fonts | site-pages | Preconnect plus stylesheet |
| Google Search Console | site-meta | HTML file verification |

## Authentication / authorization

None. The site is entirely public and has no accounts, sessions or logins. The only
credential in the system is the Anthropic API key, held server-side by the Worker.

## Build / test / deploy

No build. Deployment is a `git pull` into the NAS working tree, driven from a
separated git directory outside the web root. See `global/project-setup.spec.md`.

The only executable check in the repository is the Worker typecheck.

## Cross-cutting concerns

- **The repository is the web root.** Anything committed is publicly reachable.
- **Confidentiality.** Every figure in the diagrams is synthetic and blurred.
- **Bilingual.** Every user-visible string needs an EN and an ES form.
- **Cache busting.** CSS and JS are linked with a shared `?v=` query string.

## Unanchored or uncertain areas

- Nginx and Web Station configuration live on the NAS, not in this repository. They
  are a real part of the contract and are unversioned.
- Cloudflare zone configuration (DNS, SSL mode, redirect rule) is dashboard state,
  not code. Captured narratively in `global/project-setup.spec.md` only.
