# ADR 0001: API contract strategy (Zod package vs alternatives)

**Status:** Accepted (as implemented)  
**Date:** 2026-05-09  
**Context:** Personal monorepo starter with Next.js (`apps/web`) and NestJS (`apps/api`). We need a single source of truth for request/response shapes that both apps can import without coupling the web bundle to Nest internals.

## Context

HTTP is the boundary between web and API. Type safety can be enforced by:

- Shared TypeScript types only (no runtime validation).
- A dedicated contract package with runtime validation.
- Generated clients from an OpenAPI spec.
- tRPC-style in-process or shared-router typing (not applicable once Nest is a separate HTTP service).

The repo currently ships **`packages/contracts`**: Zod schemas, inferred types, and a small `createApiClient()` that parses JSON with those schemas.

## Options considered

### A — Zod-first shared package (`@raadmounif/contracts`) + hand-written client methods

**Pros**

- No codegen step; CI stays simple.
- Schemas are the contract; `z.infer` keeps TS and runtime aligned.
- Works today with plain `fetch` and Nest controllers.
- Easy for contributors to read and change in one place.

**Cons**

- Client methods must be updated manually when routes change (easy to forget until runtime or tests).
- No machine-readable OpenAPI artifact for external consumers (mobile, partners) unless added separately.
- Duplication risk if someone bypasses `createApiClient` and hand-parses JSON.

### B — OpenAPI from Nest → generated TypeScript client (e.g. `openapi-typescript` / Orval / Hey API)

**Pros**

- Single HTTP description artifact; good for public APIs and multiple clients.
- Client surface can be regenerated after controller changes; drift is caught at build time.
- Familiar to teams that already standardize on REST + OpenAPI.

**Cons**

- Extra pipeline (generate step in CI or pre-commit); more moving parts.
- DTOs in Nest and generated types can drift from Zod if both exist unless one is source of truth.
- Heavier onboarding for a solo/small team template.

### C — tRPC (or similar) shared router package consumed by Next

**Pros**

- Excellent end-to-end inference without maintaining parallel client methods.
- Matches patterns from popular scaffolds (e.g. Astro + tRPC monoliths).

**Cons**

- Does not map cleanly to “Nest as separate deployable HTTP service”; you end up with a second RPC layer or a Nest adapter that duplicates REST.
- Locks client and server into the tRPC ecosystem for the public API boundary.

### D — Type-only shared package (no runtime validation)

**Pros**

- Minimal code; fastest to write.

**Cons**

- No protection against malformed JSON at runtime; production bugs and security footguns.
- Violates the project rule: parse JSON with Zod.

## Recommendation

**Keep Option A** for this starter: `@raadmounif/contracts` as the single Zod-first contract layer plus `createApiClient`.

It matches the current stack (Nest REST + Next fetch), minimizes tooling, and enforces runtime validation on the client without codegen.

## Open questions / when to revisit

1. **Public or third-party API consumers** — If you need a published OpenAPI document, add Nest `@nestjs/swagger`, export `openapi.json`, and either (i) generate a second client package from it, or (ii) migrate generated types to become the source of truth and narrow Zod to edge validation only.
2. **Many endpoints** — If manual `createApiClient` updates become painful, introduce codegen (Option B) while keeping Zod on the wire for untrusted JSON.
3. **Internal only, same repo** — If the team strongly prefers tRPC ergonomics, revisit Option C with a clear boundary (e.g. BFF pattern) rather than mixing tRPC and Nest REST without intent.

## Follow-up

If this ADR is superseded, add `0002-...md` with status **Supersedes ADR 0001** and link from here.
