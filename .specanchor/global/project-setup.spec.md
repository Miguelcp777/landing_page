---
type: global-spec
status: draft
last_reviewed: 2026-09-19
---

# Project Setup, Deployment and Operations

## Purpose

Describe how the project is run and released, including the traps that have already
cost time.

## Current behavior with evidence status

**Local development** (OBSERVED) is a plain static server:

    python -m http.server 4390

There is nothing that only works in production, so this serves the real article.

**Deployment is a pull, not a push.** (OBSERVED) Pushing to the remote is not enough;
the NAS working tree must pull. The web root is **not** a git repository any more:
`.git` was moved out of it after being served publicly, so the tree is driven from a
separated git directory in the operator's home. A wrapper script performs the pull.

**Cache busting.** (OBSERVED) CSS and JS are linked with a shared `?v=` query string,
currently `20260919-chat`, unified across all links. It must be bumped whenever those
files change or a referenced asset is replaced in place.

**No CI.** (OBSERVED) There is no `.github/` directory and no pipeline.

## Constraints

- **Git only in the web root.** Copying files over SMB or File Station diverged the
  NAS tree with Windows CRLF and made every pull abort with local changes.
- **Never `git clean -fd` in the web root.** Untracked files that must survive live
  there: the Google Search Console verification file and Synology's `@eaDir/`.
- Deleting a file from the repository does not delete it from the NAS. It must be
  removed there too.
- Do not place a `.git` directory, or a `.git` file containing a `gitdir:` pointer,
  back into the web root. Nginx would serve either as readable text.

## Invariants

- **INV-OPS-001** — No infrastructure identifier is written into any committed file:
  no IP address, DDNS hostname, SSH user or absolute NAS path. They live in the
  operator's local assistant memory, which is not committed.
- **INV-OPS-002** — The `?v=` string is bumped in the same change that modifies a
  linked CSS or JS file.

## Known deployment traps, already resolved

Recorded so they are not rediscovered:

- Repository owned by a different user than the caller requires a `safe.directory`
  entry.
- `core.autocrlf` must be false on the NAS; on Linux it is unnecessary and breaks
  pulls.
- When `checkout -- .` fails to clear the index, a hard reset to the tracked remote
  branch is the working remedy. Back up to the operator's home first, never into the
  web root, and diff against the remote to prove nothing NAS-local is lost.

## Cloudflare (dashboard state, not code)

At bootstrap the DNS is being migrated to Cloudflare so the apex can follow a dynamic
DDNS through CNAME flattening. Configured: both hostnames proxied, encryption mode
Full, Always Use HTTPS on, and a 301 redirect rule from apex to `www` excluding
`/.well-known/`. (OBSERVED, reported from the dashboard; not independently verified
by this repository.)

DNSSEC is **not** enabled on the domain. (VERIFIED — no DS record at the `.es` parent
and no DNSKEY in the zone, queried over DNS-over-HTTPS, with a positive control.)

This is dashboard configuration with no representation in the repository. Treat this
section as a narrative record, not a source of truth.

## Evidence / sources

| Statement | Status | Source / revision |
|---|---|---|
| Local server command | OBSERVED | `README.md`; `.claude/launch.json` |
| Web root has no `.git` | VERIFIED | five `.git` paths return 404 in production |
| `?v=` unified | VERIFIED | one distinct value across all links in `index.html` at `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5` |
| No CI | OBSERVED | no `.github/` in `git ls-files` |
| DNSSEC absent | VERIFIED | DoH query for DS and DNSKEY, plus control query |
| Deployment traps | OBSERVED | `CLAUDE.md`; encountered during real deployments |

## Unknowns

- Whether the NAS working tree is currently at `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5`. (UNKNOWN) It is pulled
  manually and can lag.
- Web Station virtual-host configuration. (UNKNOWN) Not in this repository.

## Change history

- 2026-09-19 — Created during SDD bootstrap at `ebaf2a1298fab854cfc3b571215d8d5f90a21fa5`.
