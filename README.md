# Monorepo starter

Personal TypeScript monorepo template by **Raad Munif** — Next.js (web), NestJS (api), and shared typed contracts.

## Stack

- pnpm workspaces + Turborepo
- TypeScript 5 with project references
- Next.js 15, React 19
- NestJS 11 on Fastify
- Tailwind v4
- ESLint 9 (flat config), Prettier 3
- Husky + lint-staged
- Changesets for versioning shared packages

## Layout

```
apps/
  web/        Next.js app
  api/        NestJS app
packages/
  contracts/  Shared API request/response types
  ui/         Shared React components
  env/        Shared env validation helpers
tooling/
  tsconfig/         Base tsconfig presets
  eslint-config/    Shared ESLint flat configs
  prettier-config/  Prettier preset
```

## Getting started

```bash
pnpm install
docker compose up -d        # optional, only if you wire a database
pnpm dev
```

- Web: http://localhost:3000
- API: http://localhost:4000

## Common scripts

| Command          | What it does                          |
| ---------------- | ------------------------------------- |
| `pnpm dev`       | Run web + api in parallel             |
| `pnpm build`     | Build everything in dependency order  |
| `pnpm typecheck` | `tsc --noEmit` across the workspace   |
| `pnpm lint`      | ESLint over all packages              |
| `pnpm format`    | Prettier write                        |
| `pnpm test`      | Run all package test scripts          |
| `pnpm changeset` | Add a changeset for a package release |

## Adding a feature

1. Add or update the request/response shape in `packages/contracts`.
2. Implement the route in `apps/api`.
3. Consume it from `apps/web` via the typed client in `packages/contracts`.

## Releasing shared packages

```bash
pnpm changeset           # describe the change
pnpm version             # bump versions + write changelogs
pnpm release             # build + publish (CI does this on main)
```
