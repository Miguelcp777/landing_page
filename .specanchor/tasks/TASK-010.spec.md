---
type: task-spec
id: TASK-010
status: verified
created: 2026-09-20
modules: [site-pages, site-behavior, site-assets, site-styles]
behavior_preserving: false
---

# Task: Link the audited repositories from the project cards

## 1. Problem

The page claimed seven applications and linked none of them. A reader had only the
owner's word, which for someone changing sector is close to the whole problem.

Twelve public repositories existed the whole time. The page never mentioned GitHub.

## 2. What an audit changed about the plan

Auditing them first was not ceremony. It found:

- `video_audio-downloader` publishing the NAS address, the SSH user and absolute
  paths. Fixed and history-rewritten separately, before any linking.
- `bussines_plan_generator` — the Business Plan Tool this page featured — is an
  **employer-internal tool**: it stamps "Confidential · Internal" on its own reports,
  carries the employer's logo and corporate red, and is built around their data
  export. The owner took it private and commissioned a clean-room rebuild.
- `falla_Turia` ships `node_modules` and could not even be cloned on Windows, so it
  was never reviewed and is not linked.

So this task links four repositories, not seven, and replaces one card entirely.

## 3. Scope

Four `Code` links, a GitHub link in `#contact`, the proj2 card replaced by the
rebuild, and the employer's UI captures deleted from the repository.

## 4. Requirements

- **TASK-010/REQ-001** — Cards with an audited public repository link it.
- **TASK-010/REQ-002** — A click on that link must not also open the card's modal.
- **TASK-010/REQ-003** — proj2 describes and links the rebuild, not the private tool.
- **TASK-010/REQ-004** — No capture of employer software remains in the repository.
- **TASK-010/REQ-005** — `#contact` links the GitHub profile beside LinkedIn.
- **TASK-010/REQ-006** — The new cover renders without being cropped, and its caption
  describes what it actually is.

## 5. Acceptance criteria

- **TASK-010/AC-001** — Four `.project-card__code` links, correct hrefs, all
  `target="_blank"` with `rel="noopener"`.
- **TASK-010/AC-002** — Dispatching a click on the link leaves the modal closed.
- **TASK-010/AC-003** — No `bpbuilder` reference in any tracked file, and the three
  image files are gone.
- **TASK-010/AC-004** — No employer mention in either proj2 translation block.
- **TASK-010/AC-005** — The cover loads, and computed `object-fit` is `contain`.
- **TASK-010/AC-006** — The caption key exists in both languages, and EN/ES key sets
  in `portfolio.js` match.
- **TASK-010/AC-007** — `node --check` clean on both scripts; console clean on load.

## 6. Design notes

**The link sits above a button.** The card is `role="button"`. An anchor inside it
would fire both. The guard is a capture-phase listener in `portfolio.js` rather than
an inline `onclick`, so it also covers the keyboard and does not depend on script
order.

**The cover is drawn, not captured.** The previous card used a blurred screenshot of
the employer's tool. Its replacement is an SVG of the revenue bridge, at 1200×470 to
match the card's crop box: at the original 3:2 the container cropped the title and
the baseline off a chart, which makes a chart useless. `object-fit: contain` is the
belt to that braces.

**The caption changed with the image.** It said "Live interface · Figures obscured",
inherited from the capture. The new image is a drawing whose figures are shown.
Leaving the old wording would have been a small lie on a page whose argument is that
its author is careful with data.

## 7. Evidence

- **EV-001** — Browser read: four links, hrefs `contract-revenue-planner`,
  `Entrenador_Maraton_Valencia`, `TuriaDJ`, `comunio_mundial_2026`; all
  `target="_blank"` with `noopener`.
- **EV-002** — Dispatched a bubbling click on the link: modal stayed closed.
- **EV-003** — `grep` finds no `bpbuilder` in any tracked file; `git rm` removed three.
- **EV-004** — Pattern scan of both proj2 blocks: no `J&J`, `Johnson` or `MedTech`.
- **EV-005** — Cover loads, natural 300×118 scaled, rendered 477×186, computed
  `object-fit: contain`, caption reads "Ilustración · cifras sintéticas".
- **EV-006** — EN/ES key parity in `portfolio.js`: zero keys on one side only.
- **EV-007** — `node --check` clean on `script.js` and `portfolio.js`; no console
  errors on a freshly created tab.

## 8. A measurement trap worth recording

Two readings were wrong before they were right.

The console showed SVG path errors from **two earlier broken versions** of the GitHub
icon, because the console buffer survives navigation. Only a freshly created tab gave
the truth. This is the second time in this project that stale console output caused a
false diagnosis.

And the cover read as broken — `complete: false` — for several checks. It was not:
the browser pane was hidden, so the lazy-loading observer never fired. Fetching the
file directly returned 200 and a valid 225×150 image. **A lazy image in a hidden pane
is indistinguishable from a broken one** unless you go around the observer.

Both were my own measurement errors, not defects, and both cost more time than the
work.

## 9. Traceability

| Requirement | Acceptance | Verification | Actual result | Evidence |
|---|---|---|---|---|
| TASK-010/REQ-001 | TASK-010/AC-001 | browser read of the four links | pass | EV-001 |
| TASK-010/REQ-002 | TASK-010/AC-002 | dispatched click, modal state checked | pass | EV-002 |
| TASK-010/REQ-004 | TASK-010/AC-003 | grep plus `git status` | pass | EV-003 |
| TASK-010/REQ-003 | TASK-010/AC-004 | pattern scan of both blocks | pass | EV-004 |
| TASK-010/REQ-006 | TASK-010/AC-005 | browser read plus computed style | pass | EV-005 |
| TASK-010/REQ-006 | TASK-010/AC-006 | EN/ES key parity scan | pass | EV-006 |
| TASK-010/REQ-005 | TASK-010/AC-007 | `node --check`, clean-tab console | pass | EV-007 |

## 10. Final review

- Documentary coverage: PASS
- Spec → Code: ALIGNED
- Code → Spec: ALIGNED
