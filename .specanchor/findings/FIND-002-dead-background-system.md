---
type: finding
status: open
created: 2026-09-20
visibility: cross-task
---

# Finding: a second background system exists in CSS and nothing uses it

## Observation

`styles.css:2276-2297` defines `.neural-atmosphere` — twenty-two lines of a complete
background treatment: a masked dot grid, a breathing radial glow on a 16-second
cycle, concentric wave rings on a 32-second cycle, a reduced-motion variant, a
mobile mask variant, a light-theme variant and a `--section` modifier.

No element in `index.html` or `cv.html` carries the class. No script creates one.

Found while measuring the page for TASK-011, whose whole subject is that the
background looks flat. Some of this work would have addressed that complaint had it
ever been wired up.

## Evidence

- `grep -n "neural-atmosphere" index.html` — no matches.
- `grep -n "neural-atmosphere" js/*.js` — matches only two i18n strings,
  `studio.neuralMode: 'Red neuronal'` in `portfolio.js:36-37`, which suggests the
  class was meant to be one mode of a toggle that shipped without it.
- The rules that are live instead are `.data-atmosphere`, created in
  `portfolio.js:152` and styled at `editorial.css:164-167`.

Status: **VERIFIED** for the absence — the greps were run. The intent behind the code
is **INFERRED** from the orphaned translation keys.

## Why it matters

Small in bytes, but it is a trap of the same family as FIND-001: a future reader
looking for the background implementation finds two, and the elaborate one is the
decoy. The `orbitMode` / `neuralMode` translation pair implies a user-facing toggle
that does not exist, so a reader may also go looking for a missing control.

It is served publicly like the rest of the repo, so it is also dead weight on every
page load.

## Suggested disposition

- [ ] Promote to global/module spec
- [ ] Create/update ADR
- [x] Create debt task — decide between the two: either wire `.neural-atmosphere` in
      as part of move B (unsticking the background), or delete it along with the two
      orphaned translation keys.
- [ ] Discard

Preference is to delete unless move B ends up wanting it, on the same reasoning as
FIND-001: half a feature that cannot be switched on is worse than none.

## Review decision

Left open. Deliberately not acted on inside TASK-011 — deleting a block of CSS is
not a styling change and does not belong in a task whose diff should be readable as
"what changed visually".
