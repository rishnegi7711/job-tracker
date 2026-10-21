## Project

Applyd is a full-stack app for tracking job applications and their interview rounds. Monorepo: `client/` (React + Vite + TypeScript) and `server/` (Express + Prisma + Postgres).

## Commands

Bun workspaces: install once from the repo root (`bun install --frozen-lockfile`). Run everything else from `client/` or `server/`. The client imports schemas as `server/src/schemas/...`.

### client/
- Dev: `cd client && bun run dev`
- Build (type-check + bundle): `cd client && bun run build`
- Test (run once): `cd client && bun run test --run`
- Lint: `cd client && bun run lint`

### server/
- Dev: `cd server && bun run dev` (tsx watch)
- Build (`prisma generate && tsc`): `cd server && bun run build`
- Start (compiled): `cd server && bun run start`
- Test (run once): `cd server && bun run test --run`

### Done means
- `bun run build` and `bun run test --run` pass in `server/` and `bun run build` passes in `client/`.
- Plain `bun run test` is watch mode and never exits. Don't use it for checks.

## Conventions

- Schemas live in `server/src/schemas/`: `XSchema` = what a form sends; `XRecordSchema = XSchema.extend({ id, ... })` = what the server stores and returns.
- Derive types, don't hand-write them: `z.infer<typeof XSchema>`. Option sets are `as const` arrays + `z.enum`; derive unions with `(typeof X)[number]`.
- Prisma stores option sets as plain strings. Zod enforces the allowed values.
- Validate at every boundary: `.parse()` in client fetch functions (a throw → `useQuery` `isError`); `.safeParse()` in routes (return 400 with field errors).
- Route pattern: `protect` → find → 404 → ownership check → 403 → validate → act → return the record. Every query is scoped to `req.userId`.
- Env vars: use `env` from `server/src/env.ts` or `client/src/env.ts`. Never read `process.env` or `import.meta.env` directly.
- Frontend: shadcn components in `client/src/components/ui`, imported via `@/`. Use `LoadingState` / `ErrorState` for query states.
- When invalidating queries, copy the exact `queryKey` from the `useQuery` it should refresh.
- Bun installs, Node runs. The server is CommonJS. Tests use Vitest.

## Gotchas

- `bun run dev` hides type errors. Run `bun run build` (`tsc -b`) before calling a task done.
- `fetch` doesn't reject on non-2xx. Guard `res.ok` on every fetch.
- A return type is a claim, not a check. Only `.parse()` makes fetched data match its type.
- Parse fetch responses with the record schema (`XRecordSchema`), not the input schema. `z.object()` strips unknown keys like `id`.
- `verbatimModuleSyntax` is on: types need `import type`. Unused imports fail the build (TS6133).
- `useQuery` retries failures 3× before `isError`. TanStack Query v5 doesn't log query errors.
- shadcn Select resets only with `key={field.value ?? "empty"}`. Date inputs reset with `""`. Keep submit buttons inside `<form>`.
- `import "dotenv/config"` must be the first line of the server entry.
- Shared Zod schemas in `server/src/schemas/` are bundled into the client by Vite. A file in `server/` isn't necessarily server code.
- An unexpected `bun.lock` diff is a real change. Don't commit it with unrelated work.

## Git

- You may commit and push, but only when I ask.
- Before committing: meet **Done means** (see Commands). Don't commit if anything fails.
- Show me `git status` and the commit message before you commit.
- Never `git add -A` or `git add .`. Stage files by name.
- Never `git reset --hard` or force-push.
- After pushing: run `git log -1` and confirm `HEAD -> main` and `origin/main` match.
- If git looks broken, stop and use read-only commands first (`git status`, `git log -1`, `git for-each-ref`). Fix refs with `git update-ref`.
- Commit messages: conventional and short (`feat:`, `fix:`, `refactor:`, `chore:`, `test:`).
- One concern per commit. Dependency bumps get their own `chore(deps):` commit.

## Working style

- Think before coding: state assumptions and ask when unclear. Don't guess.
- Simplicity first: the smallest change that solves the problem. No speculative abstractions.
- Surgical changes: touch only what the task needs. No drive-by refactors or reformatting.
- Goal-driven: define how success will be checked (build, test, browser), then verify it.

## Agent skills

### Issue tracker

Issues live in GitHub Issues on `rishnegi7711/job-tracker` (via `gh`). See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

### Install design skills

`.claude/skills/` and `.agents/` are gitignored. After a fresh clone, reinstall from the repo root (Node 22+ and Chrome needed):
- impeccable: `npx impeccable install --providers=claude --scope=project --no-hooks`. Update: `npx impeccable update`.
- taste skill: `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"`.
