---
type: task-spec
id: TASK-017
status: verified
created: 2026-09-20
scope: light
---
# Task: Make the repository serveable from GitHub Pages as a mirror

## Why

On 2026-09-20 the site became unreachable from the owner's home ISP and from his
mobile carrier, while responding normally from outside Spain. Measured from his
machine, **11 of Cloudflare's 15 published IPv4 ranges refused TCP**, four
answered, and `example.com` forced to a blocked Cloudflare address failed too. That
is not an outage: Cloudflare does not lose 11 of 15 anycast ranges and keep four.
It is selective blocking of Cloudflare IP space, the documented side effect of
Spanish anti-piracy IP blocks.

`www.miguelcastillo.es` resolves into `188.114.96.0/20`, one of the blocked ranges.
The owner cannot choose his edge IP, and his audience is Spanish recruiters, so the
availability problem is real rather than cosmetic.

GitHub Pages serves from `185.199.x`, outside Cloudflare entirely, and the site is
100% static with the repository already on GitHub. This task makes the repository
serve correctly from a Pages **project** site — a subpath, `/landing_page/` — which
is the only thing that was standing in the way.

## What changed

**Three root-absolute icon links per page.** `/favicon.ico`, `/favicon.svg` and
`/apple-touch-icon.png` resolve to the domain root, which on a project site is
`miguelcp777.github.io/` rather than `miguelcp777.github.io/landing_page/`. Made
relative, which resolves correctly from both roots. They were the only absolute
references in the whole site; a sweep of `src`, `href`, `srcset`, `content`,
`data-diagram`, CSS `url()` and string literals in JS found nothing else.

**`.nojekyll`.** GitHub Pages runs Jekyll by default, which processes and can drop
files it does not expect. Nothing here needs it.

**The chat now checks the host.** `/api/chat` is a Cloudflare Worker route that
exists only on the real domain. On the mirror every message would 404 — and a
visibly broken widget is worse than no widget, which is the same reasoning that
kept the panel switched off before the Worker was deployed. `localhost` and
`127.0.0.1` stay in the list so it still runs in the local preview.

## What deliberately did not change

**The canonical tag and `og:url` still point at `https://www.miguelcastillo.es/`.**
That is correct for a mirror: it tells search engines which copy is authoritative
and stops the mirror competing with the real site.

**No `CNAME` file.** That would make Pages claim the custom domain, which belongs to
the Cloudflare setup.

**`robots.txt` is untouched.** It is shared by both deployments and cannot differ per
host without a build step. The canonical tag is the correct mechanism here.

## Requirements and acceptance

- **TASK-017/REQ-001** — Every asset resolves when the site is served from a
  subpath.
- **TASK-017/REQ-002** — The chat does not mount on a host that has no Worker.
- **TASK-017/REQ-003** — Everything else — bands, veil, atmosphere, effects toggle,
  both queries — still works from a subpath.
- **TASK-017/REQ-004** — Nothing breaks at the real domain root.

## Verification evidence

The site was served from a genuine subpath, `http://127.0.0.2:4391/landing_page/`,
using a Windows directory junction into the repository — not a copy, so the files
under test were the real ones.

| Requirement | Verification | Actual result | Evidence |
|---|---|---|---|
| TASK-017/REQ-001 | fetched every asset URL from the subpath | pass — 19/19 at 200 | EV-001 |
| TASK-017/REQ-002 | loaded from a host outside the allowed list | pass | EV-002 |
| TASK-017/REQ-003 | checked each feature from the subpath | pass | EV-003 |
| TASK-017/REQ-004 | relative paths resolve identically from a root | pass | EV-004 |

- **EV-001** — 16 images plus the three icons and `.nojekyll`, fetched rather than
  inspected. The DOM initially reported 14 images as broken; they are `loading="lazy"`
  and the pane suspends rendering, which is the same false positive recorded in
  TASK-014. Fetching returned 200 for all of them.
- **EV-002** — at `127.0.0.2` the scripts load (`translations` is defined,
  `studio.q0` present) and `.chat` is **not** in the DOM.
- **EV-003** — veil, atmosphere field and effects toggle all present; the tonal
  bands resolve to their expected values; both query blocks render. Network log for
  that load: every request 200.
- **EV-004** — a relative `favicon.ico` resolves to `/favicon.ico` from a root and
  `/landing_page/favicon.ico` from the subpath.

## A test that was invalid, and why it is recorded

The first attempt served the site on the machine's LAN address. Everything appeared
to work — the chat did not mount, which was the desired result.

It proved nothing. The page carries
`<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">`,
so over plain HTTP on a non-loopback origin the browser upgraded every subresource
to HTTPS and **no script loaded at all**: six `ERR_SSL_PROTOCOL_ERROR`s, and
`typeof translations === 'undefined'`. The chat had not been gated; it had never
run.

Re-run on `127.0.0.2`, which browsers treat as a secure context so the upgrade does
not apply, and which is outside the allowed host list. Scripts loaded and the chat
still did not mount — that is the real result.

A test that produces the expected answer for the wrong reason is worse than a
failing one.

## Open

- **Pages is not enabled yet.** `gh` is not installed on this machine, so the switch
  has to be thrown in the repository settings. Until then the mirror does not exist.
- Once live, the mirror should be loaded once to confirm Pages serves it the same
  way the subpath test did.
- The mirror does not carry the chat, by design.
- This mitigates the symptom, not the cause. If the blocks recur often, the real
  question is whether the primary should keep sitting behind a proxied Cloudflare
  record at all — a bigger decision than a mirror, and not one for today.

## Final review

- Documentary coverage: PASS
- Spec → Code: ALIGNED
- Code → Spec: ALIGNED
