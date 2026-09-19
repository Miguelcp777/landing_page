# Chat backend

Cloudflare Worker behind the chat panel on www.miguelcastillo.es. It holds the
Anthropic API key, rate-limits callers and streams the answer back. Roughly 300
lines, no framework.

The Worker is mounted on a **route of the site's own domain** rather than on a
`workers.dev` subdomain, so the browser calls `/api/chat` on the origin it
already loaded the page from: no CORS, no second hostname, and the static site
keeps being served from the NAS exactly as before.

```
browser → www.miguelcastillo.es/api/chat  → Worker → api.anthropic.com
browser → www.miguelcastillo.es/*         → NAS
```

## Why the source is public

This directory is inside the web root, so it is readable at
`https://www.miguelcastillo.es/chatbot/`. That is deliberate. There is nothing
secret in it — the key lives in Workers Secrets — and a portfolio whose biggest
gap is "no code anyone can look at" is better off with this readable.

Do not put anything in here you would not publish. `.dev.vars` is gitignored for
exactly that reason.

## Prerequisites

The domain must already be on Cloudflare. Until the zone exists, `wrangler
deploy` has nowhere to attach the route. See the apex-domain section of the root
`CLAUDE.md`.

## Deploy

```bash
npm install
```

Create the KV namespace for the rate-limit counters and paste the id it prints
into `kv_namespaces[0].id` in `wrangler.jsonc`:

```bash
npx wrangler kv namespace create CHAT_RL
```

Store the key. This prompts, and the value never touches the repo:

```bash
npx wrangler secret put ANTHROPIC_API_KEY
```

```bash
npx wrangler deploy
```

## Before pointing anyone at it

1. **Set a spend limit in the Anthropic console.** The limits in the code bound
   the damage; a hard cap on the account ends the argument.
2. Flip the widget on: `data-chat="on"` on `<body>` in `index.html`. It ships
   off, because a chat button that fails on every message is worse than none.
3. Bump the `?v=` on the script links in `index.html`.

## Limits

In `src/index.ts`, `LIMITS`:

| | |
|---|---|
| `perIpPerDay` | 40 messages from one IP |
| `globalPerDay` | 800 messages total — the real spend ceiling |
| `maxMessages` | 24 turns in one conversation |
| `maxTokensOut` | 700 |

`globalPerDay` is the one that matters. A per-IP limit is defeated by anything
distributed; a hard daily total is not.

Counters live in KV, which is eventually consistent, so a burst can slip a few
calls past the limit. That overshoot is acceptable at this scale — Durable
Objects would be the strict version, and are only worth it if this ever sees
real traffic.

## Turnstile (optional)

Leave `TURNSTILE_SECRET` unset and the check is skipped entirely. Set it, and
every request must carry a valid token — which also means the frontend has to
start sending one, so do both together or the chat stops working.

## The model

`MODEL` in `wrangler.jsonc`, currently `claude-sonnet-5`. Answering from a fixed
4k-token profile does not need more. Upgrading to `claude-opus-5` is a one-word
change.

The profile in `src/profile.ts` is sent as a cached system prompt, so every turn
after the first reads it at a tenth of the input price. Keep it above ~1024
tokens or Anthropic will not cache it at all.

## Changing what the bot knows

Everything is in `src/profile.ts`. There is no database, no vector store and no
retrieval step: the whole profile fits in the prompt, and at this size anything
more elaborate would be slower, costlier and easier to get wrong.

It also carries the guardrails — no invented figures, no employer data, no
questions that are discriminatory in hiring, and a list of things Miguel has not
decided yet (salary, notice, relocation, languages, education) that it must hand
off by email rather than guess.

Redeploy after editing it: the prompt is compiled into the Worker.
