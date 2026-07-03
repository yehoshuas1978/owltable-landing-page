# OwlTable Masking — Prove It, Don't Promise It

Masking is the one feature a test-data product cannot get *mostly* right. A single reversible column invalidates the whole exercise. OwlTable's masking engine is built around a simple discipline: **unsafe runs are blocked before they start, and safe runs produce proof.**

## Blocked before, proven after

Before a single row changes, OwlTable's readiness assessment checks the things that actually go wrong in the field:

- **Reversible hashing is a blocker, not a warning.** Deterministic hashes of low-cardinality PII (SSNs, birthdates, ZIP codes) can be reversed with a lookup table. OwlTable auto-generates a per-installation cryptographic pepper at startup and refuses hash-based masking without one.
- **Weak encryption keys are a blocker.** Format-preserving encryption never runs under a default key — OwlTable generates an installation-specific secret and blocks if it can't.
- **Constraint conflicts are found up front.** Columns whose masking would violate CHECK constraints, length limits, or uniqueness are flagged with concrete recommendations before execution.

After the run, OwlTable captures **masking proofs**: verifiable evidence that sampled values actually changed, resolvable even after primary keys themselves were remapped. Your compliance answer stops being "we ran the tool" and becomes "here is the evidence."

## 300+ algorithms, referential integrity included

Emails, names, national IDs for 25+ countries, phone formats for 200+ regions, PANs with valid Luhn checksums, IBANs, medical codes — plus **generic FF1 format-preserving encryption** that keeps digits digits, letters letters, and punctuation in place, reversibly, for tokenize/detokenize workflows.

Foreign-key graphs are remapped consistently: mask a customer ID in the parent table and every child reference follows, orphaned references included. Unique columns are masked with collision-avoidance that scales — value tracking spills to the database instead of exhausting memory on 100M-row tables.

## Free-text PII, consistently masked

Production databases hide PII where column-based tools can't see it: support tickets, clinical notes, comment fields. OwlTable routes free-text columns through an AI NER pipeline that finds and replaces names, emails, phone numbers, and other entities inside the text.

And uniquely, the free text stays **consistent with the structured data**. When the `name` column masks "John Smith" to "Maya Levi", a note reading *"Called John Smith about the refund"* becomes *"Called Maya Levi about the refund"* — same fake identity, same row, same database. QA engineers and downstream joins see one coherent world instead of contradicting fakes.

## Built for interrupted reality

- **Checkpoint and resume**: every run records progress; a crash resumes instead of restarting.
- **Staged key data is encrypted at rest** with installation-keyed AES-256, so even the operational resume state never holds plaintext production keys.
- **Runs don't fail on cleanup**: if dropping helper indexes hits a lock timeout after your data is already masked, the run completes with an explicit warning instead of reporting failure.

## Performance without recklessness

Free-text and independent-table phases run parallel out of the box. Adaptive concurrency watches live database pressure and backs workers off before your production replica notices. Deeper parallelism (splitting one huge table across workers) ships with the product but stays off until *your* benchmark proves it helps on *your* hardware — OwlTable includes the benchmark harness to find out. We'd rather be measurably fast than theoretically fast.
