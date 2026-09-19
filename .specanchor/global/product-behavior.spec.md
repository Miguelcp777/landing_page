---
type: global-spec
status: draft
last_reviewed: 2026-09-19
---

# Product Behavior

## Purpose

State what the site is for, so that a change can be judged against the goal rather
than against taste.

## Current behavior with evidence status

**The site exists to move Miguel Castillo into a Data Analyst role** (INTENT, stated
by the owner), then BI Analyst, then Data Engineer. Every change should reinforce
that framing.

**Two-level identity.** (OBSERVED) The page presents him as a data analyst *and* as
Technical Service Supervisor for Iberia at Johnson & Johnson Vision. The operational
role is evidence for the analytical claim, not a competing story: he does not analyse
service operations from outside, he runs them.

**Evidence precedes biography.** (OBSERVED) Section order in `index.html` is
`#hero` → `#stats` → `#data-passion` → `#toolbox` → `#about` → `#projects` →
`#experience` → `#contact`. `#projects` sits above `#experience` deliberately.

**Bilingual.** (OBSERVED) English and Spanish, switched by `#lang-toggle`, persisted
in `localStorage` under `site-lang`, reflected on the `<html lang>` attribute.

**`www` is the canonical host.** (OBSERVED) `index.html` and `cv.html` carry
`<link rel="canonical">` pointing at `https://www.miguelcastillo.es`.

## Intended behavior

The apex domain should reach the site rather than a registrar parking page. (INTENT)
At bootstrap the DNS migration to Cloudflare is in flight; `www` remains canonical
and the apex is intended to 301 to it.

## Constraints

- **Confidentiality is a hard rule.** Every figure in a dashboard or diagram is
  synthetic and deliberately blurred. Nothing derives from customer, contract or
  employer data. New visuals must generate their numbers, must carry no client name,
  serial, contract code or internal system identifier, and must keep the caption
  declaring the data synthetic.
- Claims about experience must be defensible in an interview. The page is a
  professional representation of a real person applying for real jobs.

## Invariants

- **INV-PROD-001** — Every user-visible string exists in both `en` and `es`.
- **INV-PROD-002** — The English text is also written into the HTML, because crawlers
  that do not execute JavaScript read the markup.
- **INV-PROD-003** — No real employer, customer or contract data appears anywhere in
  the repository, including in alt text, filenames and commit messages.
- **INV-PROD-004** — Anything presented as AI-generated must be labelled as such.
  The chat assistant answers **in the first person, as Miguel** (see `ADR-0001`),
  which is legitimate only while all three of these hold:
  1. The panel carries a visible AI label without the visitor having to ask.
  2. A direct question about whether this is a person, a bot or an AI is answered
     plainly and immediately, with the email address for reaching Miguel himself.
  3. The assistant never claims to do something only a person could do — accept an
     offer, agree a salary, confirm a date, commit to a meeting, recall a past
     conversation.

  Dropping any one of the three turns the voice into impersonation. Changed under
  TASK-004; the previous form mandated the third person.

## Non-goals

- A blog or a general-purpose personal site.
- Deceiving anyone about what the assistant is. It speaks **as** Miguel by his
  explicit choice, and says what it is whenever that matters or is asked.

## Evidence / sources

| Statement | Status | Source / revision |
|---|---|---|
| Section order | OBSERVED | `index.html` at `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5` |
| Language toggle mechanism | VERIFIED | clicked `#lang-toggle` in a browser; `<html lang>` became `es` and widget copy followed |
| First-person copy renders in both languages | VERIFIED | browser check of launcher, title, note, placeholder and starters @ `1537cd484005951502fa62f2bf49765a8c6f04c9` |
| AI label visible with the panel open | VERIFIED | computed style of `.chat__note` is not `none` |
| Canonical host | OBSERVED | `index.html`, `cv.html` `<link rel="canonical">` |
| Figures are synthetic and blurred | OBSERVED | `assets/images/dashboard-*.svg` captions; `CLAUDE.md` |
| Career goal and ordering | INTENT | stated by the owner |

## Unknowns

- No verifiable external evidence is linked: there is no public repository, Tableau
  Public dashboard or equivalent a reader can open. (OBSERVED) This is the largest
  known gap in the product.

## Change history

- 2026-09-19 — Created during SDD bootstrap at `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5`.
