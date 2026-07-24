# OwlMask Landing Page

The marketing and landing site for the OwlMask ecosystem (OwlMask PII masking
and the OwlTable data-provisioning platform). It presents the value
proposition, feature overviews, pricing, and documentation links.

## What it does

- Presents the OwlMask/OwlTable platforms to users and prospects.
- Highlights core capabilities: Data Masking, Subsetting, Synthetic Data, and
  Validation.
- Links to product documentation and deployment guides.

Published site/docs source lives under [`documentation/`](documentation/)
(MkDocs feature pages and product comparisons). Internal launch articles and
video scripts moved to
[`../owltable-share/documentation/marketing/`](../owltable-share/documentation/marketing/).

### Communication Strategy

If you are an internal employee or creator producing demos, marketing assets, or tutorials, please consult the authoritative [OwlTable Communication Handbook](../owltable-share/documentation/marketing/owltable-communication-handbook.md) before starting.
## Develop

```bash
npm ci --workspaces=false
npm run dev     # http://localhost:3000
```

Edit pages under `src/app/`; the dev server hot-reloads on save.

Copy the optional values from `.env.example` into `.env.local` when developing
against the portal. `NEXT_PUBLIC_PORTAL_URL` is the portal API origin used for
the public product catalog and authentication status, for example
`http://localhost:9080`. Paths and trailing slashes are accepted but normalized
to the origin. If it is unset, unreachable, or returns an invalid catalog
contract, the site uses the deployment-safe static catalog.

The portal's
[`V2__seed_catalog.sql`](https://github.com/yehoshuas1978/owlmask-portal/blob/04542061a1367168d5b77be83d7948b3eadb6574/backend/src/main/resources/db/migration/V2__seed_catalog.sql)
is the pricing source of truth. The runtime-parsed
[`portal-catalog-v1.0-04542061.json`](src/lib/fixtures/portal-catalog-v1.0-04542061.json)
fixture pins the five-product `/api/v1/public/catalog` DTO at portal commit
`04542061` (2026-07-20). Catalog updates must change the fallback, fixture, and
contract tests together; invalid or non-yearly canonical data falls back as a
complete catalog rather than mixing sources.

## Build

```bash
npm run typecheck
npm test
npm run lint
npm run build
npm run start
```

The application CI workflow performs the same clean standalone install and
verification with `NEXT_PUBLIC_PORTAL_URL` set. Documentation deployment
remains a separate workflow.

Deploy the build output on any Next.js-compatible host per the team's
deployment process.
