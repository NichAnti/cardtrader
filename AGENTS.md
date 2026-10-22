# Agent Development Notes

This is a Foldkit app. Read [`FOLDKIT.md`](./FOLDKIT.md) before writing any code in this project. It covers the architecture, the APIs, and the conventions the project is built on.

Foldkit owns `FOLDKIT.md` and replaces it whole on upgrade. This file is yours. Anything you want an agent to know about this project goes below, where an upgrade won't touch it.

`FOLDKIT.md` reads the line below to decide whether it has already offered to vendor the Foldkit source. Leave it in place.

subtree_prompted: false

## Project Notes

Domain vocabulary, deployment steps, local conventions that differ from Foldkit's defaults: write them here.

- Follow official docs and examples (foldkit.dev, alchemy.run, the `alchemy-run/alchemy` examples). Do not invent patterns. Alchemy v2 is Effect-based; v1 guides do not apply.
- Tooling comes from the Nix flake (`nix develop`): Bun and Node.js. The Bun version in `flake.lock` must match `bun-version` in `.github/workflows/deploy.yml`.
- `effect` and `@effect/platform-*` stay at exactly `4.0.0` (Foldkit's peer pin). `alchemy` is pinned exactly; upgrade it deliberately in its own PR.
- Deployment is `Cloudflare.Website.Foldkit` in `alchemy.run.ts`. API routes live in `src/worker.ts` under `/api` and `/api/*` (`assets.runWorkerFirst`); unknown API paths return 404 JSON, everything else falls through to the SPA.
- Stages: `dev_<user>` (local `bun run dev`), `pr-<n>` (PR previews), `prod` (pushes to `main`). Only CI deploys or destroys `prod`.
- Run `bun run check` before pushing; CI runs the same script before every deploy.

### Working Rules

- Propose every change as an exact diff and wait for explicit approval before editing any file.
- Make no changes outside this repository (system config, global tools, dotfiles, agent memory) unless explicitly asked.
- The user runs commands (`nix develop`, `bun`, `git`, deploys) unless they ask the agent to; give exact, copy-pasteable commands.
- Verify against official docs, official example repos, or the installed package source in `node_modules` before stating how something works. Say clearly what is unverified.
- Prefer the official example over a custom approach; when deviating, say so and why.
- Never deploy or destroy `prod` and never push to `main`; changes go through a PR.
