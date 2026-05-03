# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

PoC for a Next.js application acting as an OIDC relying party via **BetterAuth**, authenticating against a **first-party** OIDC Provider — **Ory Hydra** — running locally. Hydra is backed by SQLite, bind-mounted to the host so the database file is directly inspectable.

The relying-party / login / consent / logout implementation goes in `front/`. Hydra is treated as managed infrastructure (no source in this repo).

## Layout (the parts that aren't obvious from `ls`)

- `compose.yaml` — three services on a shared network:
  - `hydra-migrate` runs `migrate sql up -e --yes` once and exits; `hydra` waits on `service_completed_successfully`.
  - `hydra` runs `serve all --dev` on `:4444` (public) and `:4445` (admin). It expects login/consent/logout UIs at `http://localhost:3000/{login,consent,logout}` — those endpoints must be implemented in `front/`.
  - `front` builds from `front/Dockerfile` and runs `pnpm dev` on `:3000`. From inside the container, Hydra is reachable at `http://hydra:4444` / `http://hydra:4445` (env vars `HYDRA_PUBLIC_URL` / `HYDRA_ADMIN_URL`).
- `data/hydra/` — bind-mount target for Hydra's SQLite DB (`db.sqlite`). Hydra runs as `${UID:-1000}:${GID:-1000}`, so files are host-owned and openable with `sqlite3` directly. Do not switch this to a named volume — direct host access is a requirement.
- `front/` — Next.js 16 app. **Read `front/AGENTS.md` before editing**: Next.js 16 has breaking changes vs. older versions, and the local `node_modules/next/dist/docs/` is the source of truth, not training-data knowledge.

## Common commands

Run from the repo root.

| Purpose | Command |
| --- | --- |
| First start / rebuild images | `docker compose up --build` |
| Develop with file sync + auto-rebuild on dep changes | `docker compose up --watch` |
| Stop and remove containers | `docker compose down` |
| Reset Hydra's database | `docker compose down && rm -f data/hydra/db.sqlite && docker compose up --build` |
| Inspect Hydra DB on the host | `sqlite3 data/hydra/db.sqlite` |
| Register an OAuth2 client (admin API) | `curl -X POST http://localhost:4445/admin/clients -H 'content-type: application/json' -d '{...}'` |

`front/` standalone (Node on host, no Hydra):

| Purpose | Command |
| --- | --- |
| Dev server | `cd front && pnpm dev` |
| Lint (Biome) | `cd front && pnpm lint` |
| Format (Biome) | `cd front && pnpm format` |
| Production build | `cd front && pnpm build` |

There is no test runner configured yet.

## `front/` toolchain rules (mandatory)

- **Use pnpm only — never `npm` or `yarn`.** `pnpm-lock.yaml` is the lockfile of record; `npm install` would generate `package-lock.json` and silently diverge dependencies from what the Docker image installs via `pnpm install --frozen-lockfile`. The Dockerfile pins pnpm via `corepack prepare pnpm@10.28.0 --activate` — match that locally (Corepack handles it automatically when invoked from `front/`).
- **Run Biome before considering a change done.** `pnpm lint` (= `biome check`) must pass — it covers both linting and formatting. Use `pnpm format` (= `biome format --write`) to auto-fix formatting only. Do not introduce ESLint/Prettier; Biome is the single source of truth, configured in `front/biome.json`.

## Docker Compose Watch behavior

Configured under `services.front.develop.watch` in `compose.yaml`:

- `sync` on `./front` → `/app` (ignores `node_modules/`, `.next/`, `.git/`) — source edits propagate to the container and Next.js HMR picks them up.
- `rebuild` on `front/package.json` and `front/pnpm-lock.yaml` — dependency changes trigger an image rebuild so `pnpm install` re-runs.

Since `node_modules` is *not* synced, dependencies live in the image layer; never bind-mount `front/` wholesale over `/app` or you'll mask the installed `node_modules`.

Use `docker compose up --watch`, not `docker compose watch`. Bare `watch` starts services detached and only emits sync/rebuild events, so after `Watch enabled` no service logs appear and it looks like startup hung — Next.js's `Ready in …` and per-request log lines are simply not attached. `up --watch` attaches to all service stdouts and enables the same watcher.

## Hydra dev-mode caveats

`serve all --dev` is set in `compose.yaml`, which permits HTTP, weak `SECRETS_SYSTEM`, and similar for local convenience. The `URLS_*` env vars in `compose.yaml` (issuer, login, consent, logout) hard-code `localhost:3000`/`localhost:4444` — if you change ports or hostnames, update them together.
