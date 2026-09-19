---
type: bootstrap-report
status: draft
revision: ebaf2a1298fab854cfc3b571215d8d5f90a21fa5
date: 2026-09-19
---

# SDD Spec Anchor bootstrap report

Adoption of the Spec Anchor protocol in the landing-page repository. Scope:
**Bootstrap** — an existing application with no anchors.

## What was inspected

`git ls-files` at `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5`: 55 tracked files. Structure, entry points, the two CSS
layers and their load order, the two JS layers and their override relationship, the
Worker manifest and bindings, asset inventory, and the existing documentation in
`CLAUDE.md` and `README.md`. Configuration was read without copying secret values.

No prior specification or ADR directory existed, so no existing convention had to be
preserved. `CLAUDE.md` already carried substantial hard-won knowledge; it was used as
a source and has been extended, not replaced.

## Modules

Seven, covering all 50 material files with none unmapped.

| Module | Paths | Why it is a boundary |
|---|---|---|
| site-pages | `index.html`, `cv.html` | The documents and their data attributes |
| site-styles | `css/*` | Two ordered layers with a specificity contract |
| site-behavior | `js/script.js`, `js/portfolio.js` | i18n and the observers |
| chat-widget | `js/chat.js` | Separate lifecycle, gated by a flag |
| chat-worker | `chatbot/*` | Different runtime, holds the only secret |
| site-assets | `assets/*`, icons | Confidentiality rules apply at file level |
| site-meta | `robots.txt`, verification file | Content is contractual |

`chat-widget` is deliberately separate from `site-behavior`: it ships disabled, has
its own deployment dependency, and its contract is an HTTP interface rather than the
DOM.

## Runtime evidence actually executed

| Check | Command | Result |
|---|---|---|
| Worker typecheck | `cd chatbot && ./node_modules/.bin/tsc --noEmit` | exit 0 |
| Guard baseline | `python .specanchor/scripts/check-spec-sync.py --baseline` | exit 0, 50 material, 0 unmapped |
| Guard self-tests | `pytest tests/test_guard.py` | **NOT_RUN** — pytest is not installed |

Baseline failures: none, because there is almost nothing to fail. See the coverage
gap below.

Browser verification performed this session on the chat widget (rendering, error
path, both languages, both themes, 375px and desktop) is recorded in
`modules/chat-widget.spec.md` with per-statement results.

## Documentary coverage

`PASS`. The baseline maps every material file to a module spec.

**This number is weak on purpose, and should be read as such.** Documentary coverage
means each file has an owning spec. It says nothing about whether the specs are
*true*. The guard itself states it cannot produce a semantic verdict.

## Functional alignment

`NOT_VERIFIED` in both directions.

This bootstrap wrote no code. Nothing was changed, so nothing drifted — but equally,
no spec statement has been confirmed against executed behavior beyond the handful
marked VERIFIED in the evidence tables.

## Uncertainties carried forward

1. **The Worker has never run.** Every statement in `chat-worker.spec.md` below the
   typecheck is OBSERVED from source, not VERIFIED.
2. **Nginx and Web Station configuration are not in this repository.** They are a
   real part of the serving contract and are unversioned and unread.
3. **Cloudflare zone state is dashboard configuration**, captured narratively only.
4. **No automated tests exist for the static site.** The largest single gap. The
   highest-value first test would assert that the `en` and `es` translation key sets
   match, since a missing key renders as empty rather than falling back.
5. `profile-2.jpg` and `data-science-bg.jpg` are tracked but their use was not traced.

## This tree is publicly served

The repository **is** the NAS web root, so `.specanchor/` is readable at
`https://www.miguelcastillo.es/.specanchor/`. The specs were written under the
project's existing confidentiality rule and contain no IP, DDNS hostname, SSH user,
absolute NAS path or credential. A pattern check was run before committing.

If that exposure is unwanted, the alternative is to add `.specanchor/` to
`.gitignore` — at the cost of losing version history for the specs, which largely
defeats the point. The current choice is consistent with `chatbot/` and `CLAUDE.md`
already being public.

## Next steps

1. Run a **pilot task** on a real change and check the overhead is proportionate.
   The natural candidate is the chat deployment, which is a genuine contract change:
   the KV id, the secret, and flipping `data-chat` to `on`.
2. Consider CI. There is none today. The guard wants `--base origin/master` and a
   review generated at the checked-out HEAD.
3. Install `pytest` if the guard's own regression tests are to be trusted.

## Change history

- 2026-09-19 — Bootstrap executed at `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5`.
