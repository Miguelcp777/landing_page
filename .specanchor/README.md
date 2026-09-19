# Project Spec Anchor

Contracts for `www.miguelcastillo.es`. Use the installed `sdd-spec-anchor` skill for
material changes: light task for localized work, full task for anything touching a
contract in `global/` or a module's public interface.

## This directory is served publicly

The repository **is** the NAS web root, so everything here is readable at
`https://www.miguelcastillo.es/.specanchor/`. Never write an IP, a DDNS hostname, an
SSH user, an absolute NAS path or an API key into these files. That rule already
governs `CLAUDE.md` and `README.md`; it governs this tree too.

## Commands

Baseline inventory and unmapped material files:

    python .specanchor/scripts/check-spec-sync.py --baseline

Documentary coverage for local uncommitted work:

    python .specanchor/scripts/check-spec-sync.py --review .specanchor/evidence/impact-review.json

Committed branch work, against the real target branch of this repository:

    python .specanchor/scripts/check-spec-sync.py --base origin/master --review .specanchor/evidence/impact-review.json

The guard checks documentary coverage only. It cannot tell you whether the code and
the spec actually agree; that comes from reading the diff in both directions and from
executed checks.

## Project checks that exist today

    cd chatbot && ./node_modules/.bin/tsc --noEmit

There is no test suite for the static site and no CI. Both are recorded as gaps in
`global/quality-and-security.spec.md`.

## Layout

- `global/` — contracts that outlive any single module
- `modules/` — one spec per mapped module
- `tasks/` — scoped light and full tasks
- `decisions/` — ADRs
- `evidence/` — baseline, impact reviews
- `findings/` — out-of-scope discoveries
