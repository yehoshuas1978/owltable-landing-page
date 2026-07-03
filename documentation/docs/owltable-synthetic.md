# OwlTable Synthetic Generation — Realistic Data That Never Read a Row

Sometimes even masked production data is too much production data. For greenfield features, demos, load tests, and the most sensitive schemas, OwlTable generates synthetic databases whose engine **never reads production rows** — and then scores its own output so you know exactly how realistic and how private the result is.

## Statistics-shaped, leak-guarded

OwlTable shapes generated values from what PostgreSQL's query planner already knows: null fractions, distinct counts, and value distributions. Because planner statistics can contain actual observed values, every statistics column passes through a PII guard — column names *and the observed values themselves* are run through the detection stack, and anything that can't be affirmatively cleared as non-sensitive is stripped before generation sees it. The result: realistic shapes, zero leaked values.

## Constraints are honored, not discovered at insert time

The generator reads your schema's declared constraints and obeys them:

- **Foreign keys**: tables generate in dependency order with real parent keys, including configurable parent-child cardinality ("2–4 orders per customer").
- **UNIQUE**: single and composite unique constraints are enforced with tuple tracking and retries — no run-killing duplicate errors.
- **CHECK**: parsed range and allowed-value constraints generate values inside the legal domain; constraints that can't be modeled are surfaced as preflight warnings instead of silent time bombs.

## Correlations can survive

Column-independent generators produce an `amount` that ignores `quantity`. Turn on correlation preservation and OwlTable measures strongly correlated numeric pairs in the source (via SQL aggregates only) and regenerates the dependent column conditionally — so the relationships your reports and tests depend on still exist in the synthetic data.

## The fidelity report: trust, quantified

Every generated table can be scored against its source:

- **Marginal fidelity** per column: means, spreads, null rates, with a similarity score.
- **Correlation preservation**: pairwise relationships in source vs. generated, differences highlighted.
- **Privacy signals**: the fraction of generated rows that exactly reproduce a source row, and **distance-to-closest-record** — how near generated rows sit to specific real records compared to how near real records sit to each other. If generated data hugs real records, the report says so in plain language.
- **An overall 0–100 score** with honest notes about what the generator can and cannot preserve.

No other rule-based generator tells you this. Most ML generators charge for it.

## Production-grade run mechanics

- **Checkpoint and resume**: committed tables stay committed; a failure resumes from the first incomplete table.
- **Per-chunk progress**: long single-table generations report movement continuously, not just at table boundaries.
- **Dry-run mode**: generate everything, validate everything, commit nothing — provably.
- **Readiness gates**: missing profiles, unreviewed columns, and FK-parent gaps refuse the run server-side before a row is written.
