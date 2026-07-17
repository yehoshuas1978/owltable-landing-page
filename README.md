# OwlMask Landing Page

The marketing and landing site for the OwlMask ecosystem (OwlMask PII masking
and the OwlTable data-provisioning platform). It presents the value
proposition, feature overviews, pricing, and documentation links.

## What it does

- Presents the OwlMask/OwlTable platforms to users and prospects.
- Highlights core capabilities: Data Masking, Subsetting, Synthetic Data, and
  Validation.
- Links to product documentation and deployment guides.

Marketing and product copy lives under [`documentation/`](documentation/)
(feature pages, product comparisons, launch articles, and video scripts).

### Communication Strategy

If you are an internal employee or creator producing demos, marketing assets, or tutorials, please consult the authoritative [OwlTable Communication Handbook](documentation/docs/media/owltable-communication-handbook.md) before starting.
## Develop

```bash
npm install
npm run dev     # http://localhost:3000
```

Edit pages under `app/`; the dev server hot-reloads on save.

## Build

```bash
npm run build
npm run start
```

Deploy the build output on any Next.js-compatible host per the team's
deployment process.
