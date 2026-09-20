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

**Two executable checks exist, both in `chatbot/`.** (VERIFIED)

    cd chatbot && npm test          # 23 tests, Node's own runner, no framework
    cd chatbot && ./node_modules/.bin/tsc --noEmit

Both exit 0. Corrected under TASK-001: at bootstrap the typecheck was the only
check, and the bootstrap report said so. `npm test` covers `src/validate.ts`, the
request-validation boundary, and nothing else.

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
  refactor of `script.js` or `styles.css` is unguarded. The tests added under
  TASK-001 cover the Worker's pure logic only; nothing in `js/` or `css/` is tested.
- **No CI**, so the guard and the typecheck run only when someone remembers.
- **No link checker**, though the page carries external links and asset references.
- The `.specanchor` tree itself is publicly served, like everything else committed.

## Evidence / sources

| Statement | Status | Source / revision |
|---|---|---|
| Typecheck passes, src and tests | VERIFIED | `tsc --noEmit` exit 0 @ `17f67458a495f539d29adcc7622ce929562f1914` |
| Validation suite passes | VERIFIED | `npm test` → 23 pass, 0 fail @ `17f67458a495f539d29adcc7622ce929562f1914` |
| No CI | OBSERVED | no `.github/` in `git ls-files` |
| No tests for the static site | OBSERVED | `git ls-files` — tests exist only under `chatbot/` |
| Widget uses `textContent` | OBSERVED | `js/chat.js`, `bubble()` |
| Server-side validation | OBSERVED | `chatbot/src/index.ts`, `validateMessages()` |
| Global daily ceiling exists | OBSERVED | `chatbot/src/index.ts`, `LIMITS.globalPerDay` |
| Chat error path behaves | VERIFIED | starter clicked against an absent endpoint; friendly message rendered, state cleared, failed reply not persisted |
| Chat happy path | VERIFIED | production probe returned a real streamed answer @ `6967f66c7613f74112eb88932cc08e0e19d6e21d` |
| Chat safeguards | VERIFIED | four probes: identity disclosure, salary deflection, discriminatory question, prompt injection |

## Unknowns

- The rate-limit and budget block branches have never fired in production.
  (NOT_VERIFIED) Their decision logic is tested; the KV read/write path around them
  runs on every request but has never returned a block.

## Change history

- 2026-09-19 — Created during SDD bootstrap at `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5`.
