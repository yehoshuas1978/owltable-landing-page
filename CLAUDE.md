# OwlMask Landing Page Instructions

The workspace-wide product and engineering instructions are in
[`../CLAUDE.md`](../CLAUDE.md). This file adds rules specific to
`owlmask-landing-page`.

## Scope

`owlmask-landing-page` is the Next.js marketing and documentation site. It is
customer-facing copy: a claim made here is a claim the product must meet.

## Technology

Derive versions from `package.json`. As of 2026-07-26: Next 16, React 19,
TypeScript 5, Vitest, Node 24 (`application-ci.yml` is the runtime of record —
`deploy-docs.yml` sets up no Node at all).

## Rules that are easy to get wrong

- **This repo is a workspace member but builds standalone.** CI uses
  `npm ci --workspaces=false`; do the same locally, or you will resolve
  dependencies from the workspace root and get a build that does not match CI.
- **Keep `eslint-config-next` pinned to the same version as `next`.** Lint rules
  must come from the framework version they lint.
- **Prices live in the portal.** The static fallback in
  `src/components/Pricing.tsx` and the JSON-LD prices in `layout.tsx` and the
  compare pages must be updated in the *same task* whenever the portal seed
  catalog changes. The site reads `GET /api/v1/public/catalog` when
  `NEXT_PUBLIC_PORTAL_URL` is set; the fallback exists for when it is not.
- **Do not describe a capability the product does not have.** Language support in
  particular: only certified languages may be presented as production-supported,
  and masking must never be described as a guarantee that no PII remains.
- **`.env.example` is deliberately un-ignored** (`!.env.example`) so required
  variables stay documented. Do not commit a real `.env`.

## Verification

```bash
npm ci --workspaces=false
npm run typecheck && npm run lint && npm test && npm run build
```

`application-ci.yml` runs all four on every push and pull request.
