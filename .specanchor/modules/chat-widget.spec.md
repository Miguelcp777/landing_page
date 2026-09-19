---
type: module-spec
module: chat-widget
status: draft
source_paths:
  - js/chat.js
last_reviewed: 2026-09-19
---

# Module: chat-widget

## Responsibility

The chat panel: launcher, conversation UI, streaming client and error surface.
Vanilla JavaScript, consistent with the no-build constraint.

## Public interfaces

- **Activation** — reads `data-chat` on `<body>`. Returns immediately unless `"on"`.
- **Endpoint** — `POST /api/chat`, same origin, body `{messages: [{role, content}]}`.
- **Response** — Server-Sent Events. `{"t": "..."}` per text delta, `{"done": true}`
  to finish, `{"error": "..."}` on failure.
- **Error codes** rendered as copy: `rate_limited`, `busy_today`, anything else falls
  back to a generic message. All three name the email address.
- **Storage** — `sessionStorage` key `chat-history`.
- CSS contract: section 34 of `editorial.css`, `.chat*` class names.

## Domain invariants

- **INV-WIDGET-001** — Model output is written with `textContent`, never `innerHTML`.
- **INV-WIDGET-002** — A failed reply is not written into the history, so a retry
  does not resend a broken turn.
- **INV-WIDGET-003** — The input is re-enabled on every exit path, including errors.
- **INV-WIDGET-004** — Copy exists in both languages and follows `<html lang>`.
- **INV-WIDGET-005** — Ships disabled. See INV-PAGES-003.

## Error semantics

Network failure, non-OK response and an empty stream all render a friendly message
naming the email address. The panel never shows a stack trace or an upstream error.

## Security and permissions

No credential reaches this module. It sends conversation text to the same origin and
renders text back. The history is per-visitor and never leaves their browser except
as request bodies.

## Tests / verification

No automated tests. Verified manually in a browser.

## Known uncertainties and debt

- The happy path has never been executed: there is no deployed Worker.
  (NOT_VERIFIED)
- No Turnstile token is sent. If `TURNSTILE_SECRET` is ever set on the Worker, this
  module must start supplying a token in the same change, or chat stops working.
  (OBSERVED — a real coupling between two modules.)

## Statement evidence

| Statement | Evidence status | Source / revision | Verification result |
|---|---|---|---|
| Disabled without `data-chat="on"` | VERIFIED | page loaded with `off`; no widget in the DOM | pass |
| Renders launcher, panel, starters | VERIFIED | DOM query with the flag temporarily on | pass |
| Error path clears state correctly | VERIFIED | starter clicked with no endpoint; message shown, input re-enabled, history not polluted | pass |
| Language follows `<html lang>` | VERIFIED | all six strings switched to Spanish on toggle | pass |
| No horizontal overflow at 375px | VERIFIED | panel 343px in a 375px viewport, `scrollWidth` 375 | pass |
| Textarea not clipped | VERIFIED | `scrollHeight` 44 against a 46px box after the placeholder fix | pass |
| Happy path | NOT_VERIFIED | no deployed Worker, no API key | not_run |

## Change history

- 2026-09-19 — Created during SDD bootstrap.
