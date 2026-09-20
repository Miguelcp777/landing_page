---
type: task-spec
id: TASK-015
status: verified
created: 2026-09-20
scope: light
---
# Task: The method note, restated as a query

## Request

The owner asked how the method note could be written as a SQL query. Three
candidates were drafted and put to him; he chose the method note in `#toolbox` over
the hero headline and over a new standalone block.

That was the right one, for a reason worth keeping: the note is already a sequence
of steps, so SQL gives it structure rather than a costume — and it sits in a
secondary section, so it risks nothing in the hero, which is read by recruiters who
are frequently not technical.

## The draft was invalid, and that mattered here

The query offered in the question was:

```sql
SELECT finding, business_impact ... GROUP BY cluster, platform
```

Neither selected column is aggregated and neither is in the `GROUP BY`. It does not
compile. On a page whose argument is that its author writes SQL, a query that a
SQL-literate reader can reject at a glance would do more damage than no query at
all, and the reader most likely to look closely is the one being persuaded.

The shipped version is a query you would actually write, with the method's steps as
comments annotating which clause is which step. That is the difference between an
example and a costume: every line stands on its own, and the comments only point at
what is already there.

## Decisions

**The prose stays.** The note is the version a non-technical reader needs, and this
page is read by both kinds. The query follows it as the same claim written formally
— which is precisely what the note describes doing.

**Comments sit above their clauses, not trailing them.** A Spanish comment is longer
than its English original, so trailing comments aligned with spaces inside a `<pre>`
would break on every language switch. Above the clause they are immune, and they
read better.

**No syntax colouring.** `ADR-0002` settled the palette at one accent. A query lit up
in four hues would be the third, fourth and fifth colours arriving through the back
door. Comments carry the meaning, so comments are the only thing set apart.

**Only the comments are translated.** The SQL is identical in both languages, as it
would be in a repository. Six keys, `studio.q0` through `q4` and `studio.qCaption`.

**The schema is invented** — `contracts`, `install_base` — and matches the schema
already used by the code veil, so the page tells one consistent fiction.

## Requirements and acceptance

- **TASK-015/REQ-001** — The query is valid PostgreSQL.
- **TASK-015/REQ-002** — The prose note is preserved.
- **TASK-015/REQ-003** — Comments translate; the SQL does not; EN and ES have key
  parity.
- **TASK-015/REQ-004** — The block scrolls horizontally on its own if it must; the
  page never does.
- **TASK-015/REQ-005** — Contrast stays at WCAG AA.
- **TASK-015/REQ-006** — No employer or customer identifier appears.

## Verification evidence

| Requirement | Verification | Actual result | Evidence |
|---|---|---|---|
| TASK-015/REQ-001 | parsed with `sqlglot` in the postgres dialect | pass | EV-001 |
| TASK-015/REQ-002 | the query's previous sibling is `.method-note` | pass | EV-002 |
| TASK-015/REQ-003 | key parity across `translations.*.studio` | pass — zero one-sided keys | EV-003 |
| TASK-015/REQ-004 | computed `overflow-x`, block and page scroll widths | pass | EV-004 |
| TASK-015/REQ-005 | contrast audit | pass — 220 nodes, 0 failures | EV-005 |
| TASK-015/REQ-006 | the schema was written for this task | pass | EV-006 |

- **EV-001** — the query was extracted from the served HTML, stripped of its comment
  spans and parsed. It parses. Every non-aggregated `SELECT` expression appears in
  `GROUP BY` — the exact defect the draft had. `HAVING` contains an aggregate
  (`bool_and`). `ORDER BY exposure` resolves to an output alias, which PostgreSQL
  permits. Checked mechanically rather than by eye, because by eye is how the draft
  passed in the first place.
- **EV-002** — `previousElementSibling.className === "method-note"`.
- **EV-003** — all six keys present in both languages; `studio` has zero keys on one
  side only. The HTML default text is English, per the crawler rule in `CLAUDE.md`.
- **EV-004** — `overflow-x: auto` on the `pre`; at 1440 the block needs no scroll of
  its own and the page reports none.
- **EV-005** — SQL 14.97, comments 6.53, both far above the threshold. Full page
  audit 220 nodes, zero failures.
- **EV-006** — `contracts` and `install_base`, the same invented schema as the code
  veil.

## Side effect worth noting

`#toolbox` grew from 762px to 1326px. That section had one of the largest empty
voids measured in TASK-011, and the query lands in it. The fix for the void was
never more whitespace tuning; it was that the section had too little to say.

## Open

- Verified in the local preview, not in production.
- A screenshot of the finished block could not be taken: the pane returned a blank
  frame, so the block was verified structurally — geometry, contrast, containment,
  parity — rather than visually. Per the rule recorded in TASK-014, the blank frame
  is not evidence of anything.

## Final review

- Documentary coverage: PASS
- Spec → Code: ALIGNED
- Code → Spec: ALIGNED
