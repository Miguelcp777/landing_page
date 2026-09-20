---
type: task-spec
id: TASK-016
status: verified
created: 2026-09-20
scope: light
---
# Task: The owner's self-portrait query, in About

## Request

The owner wrote his own query and asked for it on the page. He chose About, at the
end of the biography, over the footer and over replacing the method query.

It is a different register from TASK-015's and they do not compete: that one says
**how he works**, this one says **who he is**. About is where the personal voice
already lives, so it is the right home.

## The bug in the original, and why it mattered

He wrote:

```sql
FROM Miguel Castillo
```

Run through the parser, that resolves to `Miguel AS Castillo` — table `Miguel`,
aliased `Castillo`. Two bare identifiers separated by a space **is** the alias
syntax. It does not raise an error, which is what makes it dangerous: nothing
catches it until a reader who knows SQL reads it, and that reader is the audience.

`FROM "Miguel Castillo"` fixes it, because a quoted identifier may contain spaces.
Verified: the parser then reports `table='Miguel Castillo', alias=''`.

The detail is small and it is the whole point. It is the difference between "put a
SQL joke on the page" and "written by someone who writes SQL".

## Decisions

**No caption, no translation.** The identifiers and the string literal stay English
in both languages, exactly as they would in a repository. Translating the inside of
a code block would be the tell that it is decoration rather than code.

**One code-block treatment, not two.** Section 42's rules were widened to
`:is(.method-query, .bio-query)` rather than duplicated, so the two queries cannot
drift apart. Section 43 carries only the spacing that differs.

**`coffee_level > 0` stays.** It is a joke that appears in a lot of data portfolios,
which was said plainly before shipping it. It is his page and his personality, and a
reader who spots it will smile rather than subtract.

## A layout bug this introduced, caught on the phone

At 375px the new block reported a content box of **436px on a 375px screen**. A
`<pre>` holds unbreakable lines, and a grid item defaults to `min-width: auto`, so
the block widened its own grid track and dragged the whole About column past the
viewport.

The dangerous part was the symptom: `body` clips horizontally, so there was **no
scrollbar and no visible breakage** — the column was silently cut off on a phone.
`overflow-x: auto` on the block cannot help until the track is allowed to shrink
below its content, so `.about__text` now carries `min-width: 0`.

The method query in `#toolbox` never had this problem because its container is a
plain block, not a grid track. Same markup, different parent, different outcome.

## Requirements and acceptance

- **TASK-016/REQ-001** — The query is valid PostgreSQL and its table is the full
  name, not an aliased `Miguel`.
- **TASK-016/REQ-002** — It sits between the closing biographical thought and the
  CV/LinkedIn links.
- **TASK-016/REQ-003** — Both code blocks share one treatment.
- **TASK-016/REQ-004** — Nothing overflows the viewport at desktop or phone width;
  long lines scroll inside their own block.
- **TASK-016/REQ-005** — Contrast stays at WCAG AA.

## Verification evidence

| Requirement | Verification | Actual result | Evidence |
|---|---|---|---|
| TASK-016/REQ-001 | `sqlglot` parse of the served HTML | pass | EV-001 |
| TASK-016/REQ-002 | previous and next sibling classes | pass | EV-002 |
| TASK-016/REQ-003 | both blocks matched by the shared selector | pass | EV-003 |
| TASK-016/REQ-004 | overflow scan at 1024 and 375, discounting scroll containers | pass, **after a fix** | EV-004 |
| TASK-016/REQ-005 | contrast audit | pass — 218 nodes, 0 failures | EV-005 |

- **EV-001** — extracted from `index.html`, HTML-unescaped and parsed in the postgres
  dialect. `table='Miguel Castillo'`, `alias=''`. No `GROUP BY` and no aggregates, so
  there is nothing else that can be inconsistent. The `&gt;` escape renders as `>`.
- **EV-002** — `previousElementSibling` is `bio-synthesis`, `nextElementSibling` is
  `bio-links`.
- **EV-003** — `.method-query, .bio-query` matches 2 elements; section 42's figure,
  `pre` and `code` rules all use `:is(...)`.
- **EV-004** — at 375px before the fix: block content box 436px, `about__text` past
  the viewport, `pageScrollsX: false` because the body clips. After: both blocks
  report `clientWidth 333` and scroll internally, and a scan that discounts anything
  inside a horizontal scroll container returns **zero** genuinely overflowing
  elements.
- **EV-005** — 218 nodes, zero below AA; the block itself reads 14.97.

## Open

- Verified in the local preview, not in production.
- No screenshot of either block exists. The pane has returned blank frames all
  session, so both queries were verified structurally. Per TASK-014's rule, a blank
  frame is not evidence — but it is also not a substitute for the owner looking at
  it once it is live.

## Final review

- Documentary coverage: PASS
- Spec → Code: ALIGNED
- Code → Spec: ALIGNED
