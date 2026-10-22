# Cardtrader

A [Foldkit](https://foldkit.dev) single-page app with Tailwind, deployed to
Cloudflare Workers with [Alchemy](https://alchemy.run). API routes are served
by the same Worker under `/api/*`.

## Setup

Requires Nix with flakes. The dev shell provides Bun and Node.js.

```sh
nix develop
bun install
bun alchemy profile edit --add Cloudflare
```

`bun install` also installs the pre-push hook, which runs `bun run check`.
Push from inside `nix develop` so the hook can find `bun`.

## Daily work

```sh
bun run dev     # Vite dev server on stage dev_$USER
bun run check   # format check, lint, typecheck, tests
bun run format  # fix formatting
```

## Layout

- `src/main.ts` — the Foldkit app (Model, Message, update, view)
- `src/entry.ts` — boots the runtime
- `src/worker.ts` — Worker entry; handles `/api/*`, everything else is served
  from the built assets
- `alchemy.run.ts` — the Alchemy stack

## Deployment

CI (`.github/workflows/deploy.yml`) owns every deploy:

| Event               | Stage    | Result            |
| ------------------- | -------- | ----------------- |
| Push to `main`      | `prod`   | Production deploy |
| PR opened / updated | `pr-<n>` | Preview deploy    |
| PR closed           | `pr-<n>` | Preview destroyed |

Every deploy runs `bun run check` first. The workflow reads the repository
secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

Do not deploy or destroy `prod` from a local machine.

Workflow: branch, open a PR, check the preview URL in the deploy job output,
merge.
