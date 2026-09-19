---
type: global-spec
status: draft
last_reviewed: 2026-09-19
---

# Quality and Security

## Purpose

State what verification actually exists, what does not, and the security properties
that must hold.

## Current behavior with evidence status

**The only executable check is the Worker typecheck.** (VERIFIED)

    cd chatbot && ./node_modules/.bin/tsc --noEmit

Exit code 0 at `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5`.

**There is no test suite for the static site.** (OBSERVED) No test files, no runner,
no assertions. Verification is manual and browser-based.

**There is no CI.** (OBSERVED) Nothing runs on push.

**Manual verification is the real quality gate.** (OBSERVED) In practice, changes are
checked by loading the page in a browser, reading the console, and measuring the DOM.
That has caught defects that inspection missed: a duplicated `viewBox` that made the
vCard QR unparseable while still returning HTTP 200, and a placeholder that clipped
the chat textarea to half a line at 375px.

## Invariants

- **INV-SEC-001** — No secret is committed. The Anthropic key lives in Workers
  Secrets; `chatbot/.dev.vars` is gitignored and only `.dev.vars.example` is tracked.
- **INV-SEC-002** — No infrastructure identifier in any committed file. See
  `project-setup.spec.md`.
- **INV-SEC-003** — Model output is never inserted as HTML. The chat widget assigns
  through `textContent` only.
- **INV-SEC-004** — Request validation happens server-side in the Worker. Frontend
  limits are a convenience; anything reachable with `curl` is validated again.
- **INV-SEC-005** — The public chat endpoint has a hard daily ceiling on total calls,
  independent of any per-IP limit, because a per-IP limit does not survive a
  distributed caller.

## Verification expectations for a change

- A change to `chatbot/*` runs the typecheck.
- A change with a visible effect is loaded in a browser and checked at 375px and at
  desktop width, in both languages and both themes, with the console read.
- A claim that something works is backed by a command and its output, or it is marked
  NOT_VERIFIED. A declared passing result is not evidence.

## Known gaps

- **No automated regression protection whatsoever for the site.** (OBSERVED) Any
  refactor of `script.js` or `styles.css` is unguarded.
- **No CI**, so the guard and the typecheck run only when someone remembers.
- **No link checker**, though the page carries external links and asset references.
- The `.specanchor` tree itself is publicly served, like everything else committed.

## Evidence / sources

| Statement | Status | Source / revision |
|---|---|---|
| Typecheck passes | VERIFIED | `tsc --noEmit` exit 0 at `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5` |
| No test suite, no CI | OBSERVED | `git ls-files` at `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5` |
| Widget uses `textContent` | OBSERVED | `js/chat.js`, `bubble()` |
| Server-side validation | OBSERVED | `chatbot/src/index.ts`, `validateMessages()` |
| Global daily ceiling exists | OBSERVED | `chatbot/src/index.ts`, `LIMITS.globalPerDay` |
| Chat error path behaves | VERIFIED | starter clicked against an absent endpoint; friendly message rendered, state cleared, failed reply not persisted |
| Chat happy path | NOT_VERIFIED | requires a deployed Worker and a real API key; never executed |

## Unknowns

- Whether the Worker behaves correctly against the live Anthropic API. (UNKNOWN) It
  has never been run end to end.

## Change history

- 2026-09-19 — Created during SDD bootstrap at `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5`.
