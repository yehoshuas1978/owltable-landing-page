# OwlTable — Provably Safe Test Data for PostgreSQL

**Your developers need production-realistic databases. Your auditors need proof nothing leaked. OwlTable delivers both.**

OwlTable is a data provisioning platform that builds safe, realistic test databases from production PostgreSQL data. Where other tools ask you to trust that masking happened, OwlTable **proves** it — with readiness gates that block unsafe runs before they start, cryptographic masking proofs after they finish, and honest preflight reports in between.

## Why teams choose OwlTable

**Safety is enforced, not suggested.** Every operational run passes a backend readiness assessment covering blockers, warnings, prerequisites, permissions, and destructive impact. A run that would leave data exposed doesn't get a warning banner — it gets refused, server-side, no matter which client asked.

**Evidence, not assurances.** Masking runs capture verifiable proof that values changed. Synthetic runs emit a fidelity report scoring how well the generated data matches the source — including a privacy section that measures exact-copy risk and distance-to-closest-record, and says plainly when generated rows sit too close to real ones.

**It survives reality.** Multi-hour runs on real databases fail sometimes — networks drop, locks time out. Every OwlTable engine checkpoints its progress and resumes where it stopped. A crash at 99% costs you minutes, not the night.

**PostgreSQL-native depth.** OwlTable is built for PostgreSQL, not ported to it: planner-statistics-aware generation, `COPY`-streamed transfer, catalog-level constraint enforcement, and safety guards that understand how Postgres actually behaves.

## Three engines, one platform

### Masking
Transform production data in place with 300+ algorithms — from country-specific national IDs and phone formats to NIST FF1 format-preserving encryption. Referential integrity is preserved across foreign keys; unique constraints are honored with collision handling; deterministic hashing is automatically salted with a per-installation secret so masked values can't be reversed by precomputation. An AI pipeline masks names, emails, and other PII **inside free-text columns** — and keeps them consistent with the structured columns, so the customer masked to "Maya Levi" in the name column is "Maya Levi" in the notes too. No other tool on the market does this.

### Subsetting
Carve a small, referentially complete database out of a big one. Tell OwlTable your target size — "give me roughly a million rows" — and preflight recommends the selection percentage that lands there, while warning honestly about what can't shrink (fully copied lookup tables, foreign-key cycles). First-time provisioning streams over PostgreSQL `COPY` for order-of-magnitude throughput, and incremental refresh keeps existing subsets current.

### Synthetic generation
Generate realistic data with **zero rows read from production** — column shapes come from PostgreSQL's own planner statistics, guarded so observed production values never leak into output. Declared constraints (UNIQUE, CHECK, foreign keys) are enforced during generation, strongly correlated numeric columns can keep their relationship, and every run can be scored with a fidelity and privacy report.

## The honesty principle

OwlTable's preflights are designed to prevent surprises, not to look green:

- *"Table `audit_log` (40M rows) will be copied in full — this may make the target far bigger than your subset."*
- *"These tables form a foreign-key cycle; loading them needs elevated target privileges."*
- *"Your child-record ratio will generate ~48,000 rows, not the 1,000 you requested — the ratio wins."*
- *"Generated rows sit 72% closer to real records than real records sit to each other — review before treating this data as privacy-safe."*

Every message above is real product output. If a run is going to disappoint you at hour three, OwlTable tells you at minute zero.

## Get started

OwlTable runs alongside OwlMask as part of the same platform. See [how OwlTable compares](owltable-comparison.md) to the rest of the market, or contact us for a guided evaluation.
