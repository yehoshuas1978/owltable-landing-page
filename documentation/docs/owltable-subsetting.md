# OwlTable Subsetting — A Small Database That Behaves Like the Big One

A 2TB production database is useless for development and dangerous for testing. What teams need is 2% of it — with every foreign key intact, every parent row present, and no surprises about what actually got copied. That's OwlTable subsetting.

## Tell it the size you want

Set a target row budget — *"give me about a million rows"* — and OwlTable's preflight computes which selection percentage of your driving table lands nearest it, accounting for the tables that don't shrink (small lookup tables copied whole). If the budget is impossible because full copies alone exceed it, preflight says exactly that and tells you which tables are responsible, instead of letting you discover a 100GB "subset" at hour three.

## Referential integrity by construction

Starting from your driving table (e.g. `customers`), OwlTable walks the foreign-key graph in both directions — parents needed for integrity, children needed for completeness — and transfers rows in dependency order. Composite keys, self-referencing tables, and multi-path relationships are handled; foreign-key cycles are detected and reported up front with the privilege requirements they imply.

## Honest preflight, typed for automation

Every planned table gets an assessment: subset, full copy (and *why*), or blocked (and *why*). Warnings are both human-readable and machine-typed — `FULL_COPY_PROMOTION`, `FOREIGN_KEY_CYCLE`, `NO_STABLE_IDENTITY_FULL_COPY` — so CI pipelines can gate on them programmatically. Row counts appear in the warnings themselves: you learn that a promoted child table carries 40 million rows *before* the run, not after.

## Fast where it's safe to be fast

First-time provisioning streams data between PostgreSQL sessions using native `COPY` — an order-of-magnitude gain over row-by-row inserts — with automatic fallback to the fully-validated batch path if anything about the fast path doesn't hold. Foreign-key metadata is resolved once and cached instead of re-queried every propagation round.

## Deterministic, incremental, resumable

- **Deterministic sampling**: the same seed selects the same subset, so environments are reproducible.
- **Incremental refresh**: update an existing subset with changed rows instead of rebuilding from scratch; optionally delete rows that fell out of the subset.
- **Checkpointed transfer**: interrupted runs resume from the last committed segment.
- **Soft-delete awareness**: exclude logically deleted rows with configurable column and semantics.

## Provisioning-mode by default

Point subsetting at a source and a target connection and OwlTable allocates a fresh managed schema, prepares its structure from the source, transfers the subset, and validates referential integrity on the result — one operation, one audit trail, one place to look when someone asks what exactly is in that test database.
