# Specification Index

| Module | Source paths | Persistent spec | Status | Last reviewed |
|---|---|---|---|---|
| site-pages | `index.html`, `cv.html` | `.specanchor/modules/site-pages.spec.md` | draft | 2026-09-19 |
| site-styles | `css/*` | `.specanchor/modules/site-styles.spec.md` | draft | 2026-09-19 |
| site-behavior | `js/script.js`, `js/portfolio.js` | `.specanchor/modules/site-behavior.spec.md` | draft | 2026-09-19 |
| chat-widget | `js/chat.js` | `.specanchor/modules/chat-widget.spec.md` | draft | 2026-09-19 |
| chat-worker | `chatbot/*` | `.specanchor/modules/chat-worker.spec.md` | draft | 2026-09-19 |
| site-assets | `assets/*`, `favicon.*`, `apple-touch-icon.png` | `.specanchor/modules/site-assets.spec.md` | draft | 2026-09-19 |
| site-meta | `robots.txt`, `googlebcc3d894ce85ddc8.html` | `.specanchor/modules/site-meta.spec.md` | draft | 2026-09-19 |

## Global specifications

- `.specanchor/global/architecture.spec.md`
- `.specanchor/global/product-behavior.spec.md`
- `.specanchor/global/project-setup.spec.md`
- `.specanchor/global/quality-and-security.spec.md`

## Unmapped by design

`CLAUDE.md`, `README.md`, `.gitignore`, `.claude/*`, `anchor.yaml` and
`chatbot/package-lock.json` are excluded in `anchor.yaml`. They are project
documentation, tooling configuration or a dependency lock, not product contracts.
The exclusion is policy, not detection: revisit it if any of them starts carrying
behavior.
