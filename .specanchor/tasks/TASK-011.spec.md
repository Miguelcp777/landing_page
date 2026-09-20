---
type: task-spec
id: TASK-011
status: verified
created: 2026-09-20
scope: light
---
# Task: A tonal score for the page, and elevation

## Request and current behavior

The owner said the background looked bland and asked what could be done about it.

Measured before touching anything, the complaint is exact. The whole site ran on two
near-identical off-whites:

```
--bg-body     #f7f6f0   hero, stats, cases, capabilities, projects, experience
--bg-surface  #ffffff   about, contact
```

That is a luminance difference of roughly 3% across **8,205 px** of scroll. The
alternation existed in the CSS but sat below the threshold at which an eye registers
it, so eight screens of scrolling produced no visible change.

Two further findings from the same measurement:

- `.data-atmosphere`, the animated field, is `position: fixed`. It is a wallpaper:
  identical in every viewport regardless of scroll position. Its dot grid renders at
  `opacity: .10` with 0.65 px dots, which is close to invisible.
- Every card returned `box-shadow: none`. A 1 px border over a fill three percent
  from its own background is not elevation, so nothing on the page sat above
  anything else.

Also found and **not** acted on: `.neural-atmosphere` in `styles.css:2276-2297` is a
second, richer background system — dot grid, radial waves, breathing glow — that no
element in the HTML references and no script injects. It is dead. Recorded as
FIND-002 rather than deleted inside a styling task.

## What changed

**Section 38 of `editorial.css`.** The page now moves through four tones and one
dark chapter:

| Section | Light theme | Role |
|---|---|---|
| hero, stats | paper `#f7f6f0` | the only bands left transparent, so the fixed atmosphere field still shows |
| analytical cases | sand `#eceadf` | |
| capabilities | paper | |
| about | white `#ffffff` | unchanged |
| **projects** | **`#17221f`** | the chapter break |
| experience | paper | |
| contact | sand | |

The bands are **token overrides, not colour overrides**. Every component already
draws from `var(--bg-*)` and `var(--text-*)`, and custom properties inherit down the
tree whatever selector consumes them, so redefining the tokens on one section
restyles its entire subtree without a single component rule being touched.

Projects was chosen for the dark band on three grounds: it carries the loudest
imagery on the page (the AI illustrations), and a dark ground is what makes those
read as deliberate rather than garish; it is the longest section at 2,320 px, so the
band reads as a chapter and not a stripe; and it sits between white and paper, so
both edges are hard breaks.

In the dark theme the same section has to go the other way — lighter than its
surroundings — which is handled by a separate, lower-specificity rule.

**Elevation.** A two-step shadow scale, tinted with the page's own near-black rather
than pure black. Project cards and stat cards take the first step and lift to the
second on hover; capabilities and timeline entries take the first step only, because
they are not clickable and a card that rises under the cursor and does nothing is a
lie. `box-shadow` was absent from the existing transition lists, so those are
re-declared or the hover snaps.

## What the change surfaced, and what was done about it

**Nine legacy rules hardcoded the colours of the superseded blue theme** instead of
reading the tokens: `#0F172A` and `#475569` written literally under
`html.light-theme` in `styles.css`. They looked correct only because `#0F172A` sits
close to the editorial `#202923` on paper. A section that overrides the tokens
cannot reach them, so on the new dark band the project titles rendered at **contrast
1.31** — invisible — and the descriptions at 1.8.

The local fix would have been to override them inside the band. The correct fix was
to convert all nine to `var(--text-primary)` / `var(--text-secondary)`, which is what
`INV-STYLE-002` already required of them. Outside a band the resolved values are
unchanged for any page that does not load the editorial layer, because those are the
same literals the tokens hold.

**A pre-existing dark-theme bug in the chat widget.** The launcher and the Send
button set `color: #fff` over `background: var(--primary-color)`. In the light theme
primary is a dark green and white works; in the dark theme primary is mint `#b5ddc1`
and white gives **contrast 1.49**. Both now use `color: var(--bg-body)`, which is the
pattern `.btn--primary` already used. This was not caused by this task — it shipped
with TASK-001 — and it is fixed here because the audit that found it was run here.

## Requirements and acceptance

- **TASK-011/REQ-001** — The page presents at least four distinct background tones,
  including one dark band, in the light theme.
- **TASK-011/REQ-002** — The score also works in the dark theme, where the banded
  section must be lighter than its surroundings rather than darker.
- **TASK-011/REQ-003** — Cards carry elevation; non-interactive cards do not lift on
  hover.
- **TASK-011/REQ-004** — No text anywhere on the page falls below WCAG AA in either
  theme.
- **TASK-011/REQ-005** — No colour is hardcoded where a token exists
  (`INV-STYLE-002`).
- **TASK-011/AC-001** — Computed `background-color` of the eight sections returns
  four or more distinct values per theme, one of them dark.
- **TASK-011/AC-002** — A contrast audit over every rendered text node passes at AA
  in both themes.
- **TASK-011/AC-003** — The `?v=` cache-buster is bumped on both pages.

## Affected anchors and impact rationale

`.specanchor/modules/site-styles.spec.md`, and one line of
`.specanchor/modules/chat-widget.spec.md`. Classified **light**: presentation only.
No API, data, permission, integration or architectural contract moves. The public
endpoint, the worker, the profile and the content are untouched.

## Verification evidence

| Requirement | Acceptance | Verification | Actual result | Evidence |
|---|---|---|---|---|
| TASK-011/REQ-001 | TASK-011/AC-001 | computed styles, light theme | pass — 4 tones, band at `#17221f` | EV-001 |
| TASK-011/REQ-002 | TASK-011/AC-001 | computed styles, dark theme | pass — band at `#1e2d28`, lighter than `#17221f` body | EV-002 |
| TASK-011/REQ-003 | — | computed `box-shadow` on each card class | pass | EV-003 |
| TASK-011/REQ-004 | TASK-011/AC-002 | contrast audit, both themes | pass — 213 nodes, 0 failures each | EV-004 |
| TASK-011/REQ-005 | — | grep for the literals | pass — 9 converted | EV-005 |
| — | TASK-011/AC-003 | grep of `index.html`, `cv.html` | pass — 12 + 3 links | EV-006 |

- **EV-001** — light theme returns paper `rgb(247,246,240)`, sand `rgb(236,234,223)`,
  white `rgb(255,255,255)` and `rgb(23,34,31)`.
- **EV-002** — dark theme returns `rgb(23,34,31)`, `rgb(28,41,37)`, `rgb(34,49,43)`
  and the band at `rgb(30,45,40)`.
- **EV-003** — `.project-card` and `.stat-item` carry `--shadow-1` and take
  `--shadow-2` on hover; `.capability` and `.timeline__content` carry `--shadow-1`
  with no hover rule.
- **EV-004** — a script walking every element with a non-empty text child, resolving
  the nearest painted background and applying the AA threshold by computed size and
  weight. 213 nodes checked per theme. The same script is what found the 1.31 and
  1.49 failures described above, before they were fixed.
- **EV-005** — the conversion script asserted exactly one match per selector and
  exactly nine changed lines.
- **EV-006** — bumped to `20260920-bands`.

## Follow-up after the first deploy

Production verification of the deployed CSS found a **third** instance of the same
`color:#fff`-over-`var(--primary-color)` bug: `.chat__msg--user`, the visitor's own
chat bubble. The AA audit had not caught it, and the reason matters — the audit walks
rendered nodes, and the chat panel is closed on load, so that bubble does not exist
when the audit runs. "213 nodes, zero failures" was true and still missed it.

Re-verified with the panel opened and one bubble of each role planted: **212 nodes,
zero failures, in both themes**. The user bubble now reads 10.95 in the dark theme.

One remaining `color:#fff` in `editorial.css` is correct and stays: the `Code` pill
sits on its own `rgba(8,12,22,.72)` ground over the cover image, so it is white on
near-black whatever the theme does.

A dark-theme audit run immediately after clicking the theme toggle reported 42
failures, including nav links at 1.58 from a rule that does not match the DOM. It was
the browser pane returning stale computed styles, not a defect: a clean load into the
dark theme returns the correct token value and zero failures. Third time this session
that pane has done this.

## Open

- Verified in the local preview, not in production. Not yet deployed to the NAS.
- The contrast audit resolves the nearest **painted** background. Text over an image
  — the project covers — is out of its reach and was not assessed.
- The band boundaries are hard edges by design. Whether that reads as deliberate or
  abrupt is a judgement the owner has to make, not a measurement.
- Moves B (unsticking the atmosphere), D (typographic contrast) and E (the covers)
  from the agreed plan are **not** in this task.

## Final review

- Documentary coverage: PASS
- Spec → Code: ALIGNED
- Code → Spec: ALIGNED
