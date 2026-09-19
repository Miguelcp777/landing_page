---
type: adr
status: accepted
id: ADR-0001
created: 2026-09-19
---

# ADR-0001: The chat assistant speaks in the first person, with disclosure kept mandatory

## Context

The chat panel was originally built to speak *about* Miguel in the third person: "he
built the install base pipeline". That was a default chosen during implementation,
not a requirement the owner asked for, and it was written into
`INV-PROD-004` as though it were settled.

The reasoning behind it was impersonation risk. A recruiter who believes they are
corresponding with a person, and later discovers they were not, has been misled about
something that matters in hiring — and the damage lands on the candidate.

The owner has now asked for the first person, after that concern was raised. It is
his page, his professional representation and his call.

There is also a real cost to the third person that the original decision
underweighted. The page is a portfolio written throughout in Miguel's own voice; a
panel that refers to him as "he" reads as though it were written by someone else
about him, which is both stilted and subtly distancing at exactly the moment a
visitor is trying to form an impression of the person.

## Decision

The assistant answers in the **first person**, as Miguel.

Disclosure does not become optional. Three things are load-bearing and must survive
any future edit to the copy or the prompt:

1. **The panel is visibly labelled as AI**, without the visitor having to ask. The
   label sits under the title, in view whenever the panel is open.
2. **A direct question about whether this is a person, a bot or an AI gets a plain
   answer**, immediately and without deflection, plus the email address for reaching
   Miguel himself.
3. **The assistant never claims to be doing something only a person could do.** It
   does not agree to meetings, accept offers, negotiate, confirm dates, or assert
   that it personally remembers a past conversation.

The "I" is a voice, not a claim of personhood. That distinction only holds while
those three conditions do, which is why they are recorded here rather than left in a
prompt that someone might trim.

## Alternatives considered

**Third person, as originally built.** Safest against impersonation, and rejected by
the owner. It also reads as though someone else wrote the page.

**First person with a per-message disclaimer.** Maximum disclosure, but it makes
every answer about the medium rather than the content, and visitors stop reading
repeated banners within about two messages. Rejected: it buys the appearance of
honesty at the cost of the actual communication.

**First person with no disclosure at all.** Rejected outright. This is the thing the
original concern was about, and nothing in the owner's request asked for it.

## Consequences

- `INV-PROD-004` changes. It no longer mandates the third person; it mandates the
  three disclosure conditions above.
- `chatbot/src/profile.ts` changes voice throughout, and the identity-question rule
  becomes more prominent rather than less.
- `js/chat.js` copy changes to the first person, and the AI label in the panel header
  becomes load-bearing rather than decorative. Removing it is now a spec violation.
- The starter questions are addressed to Miguel ("what tools do you use?") rather
  than about him.

## Affected specs/modules

- `.specanchor/global/product-behavior.spec.md` — `INV-PROD-004`
- `.specanchor/modules/chat-worker.spec.md`
- `.specanchor/modules/chat-widget.spec.md`

## Validation / revisit conditions

Revisit if any of these happen:

- A visitor reports having believed they were talking to Miguel in person. That is
  direct evidence the disclosure is not working, and it outranks the aesthetic
  argument for the first person.
- The panel is ever embedded somewhere the header label is not visible — a
  full-screen mode, an iframe, a voice-only interface. The label is the primary
  disclosure; if it disappears, disclosure has to be rebuilt before the voice ships
  in that surface.
- Voice output arrives. A cloned voice speaking in the first person is a materially
  stronger impersonation claim than text, and this ADR does not authorise it. It
  needs its own decision.
