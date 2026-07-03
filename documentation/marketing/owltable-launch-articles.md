# OwlTable Launch Article Drafts (internal — blog/LinkedIn/dev.to source material)

Three ready-to-adapt articles. Tone: engineer-to-engineer, concrete, no adjectives that
can't be demonstrated. Every claim maps to shipped behavior.

---

## Article 1 — "Your masking tool says it worked. Can it prove it?"
*(~800 words, compliance/engineering-leadership audience)*

**Thesis.** The test-data industry runs on trust-me. Jobs report SUCCESS; auditors get log
files. The interesting engineering problem isn't masking a column — it's *proving* the
whole database is safe afterwards.

**Outline.**
1. Open with the audit question: "show me evidence the June refresh contained no PII."
   Walk through what most teams actually have (a Jenkins log).
2. Enumerate the failure modes a green job log hides: unsalted deterministic hashes
   reversed by rainbow tables; PII inside free-text columns; the ticket-notes column
   nobody classified; operational staging tables holding plaintext key material.
3. Introduce enforcement-first design: readiness assessments that *block* server-side
   (pepper missing → BLOCKED; default encryption key → BLOCKED; constraint conflicts →
   surfaced with recommendations). Contrast with UI-warning designs a script bypasses.
4. Introduce proof capture: sampled evidence that values changed, resolvable across
   primary-key remaps; encrypted-at-rest operational state; the PII finding → profile
   rule → coverage trail.
5. Close: the question to ask any vendor (and OwlTable's answer).

**Pull quote.** "A masking run should end with evidence, not adjectives."

---

## Article 2 — "The same fake person everywhere: consistent PII masking in free text"
*(~1,000 words, technical deep-dive audience; strongest differentiation story)*

**Thesis.** Masking the `name` column is 1990s technology. The hard problem is the support
note that says "Called John Smith about the refund" — and the harder problem is making
that note agree with the masked column.

**Outline.**
1. The two-fake-identities bug: structured masking produces "Maya Levi", NER free-text
   masking independently produces "Dana Cohen" for the same person, same row. Downstream
   joins and QA sanity checks now contradict.
2. Why it's hard: the free-text engine and the column engine run at different times with
   different knowledge; random strategies can't be recomputed later.
3. The OwlTable design: a per-row ledger captures original→masked pairs as structured
   columns are masked; before free text goes to the NER model, mentions of those
   originals become inert placeholders; after the model masks everything else, the
   placeholders resolve to the *actual structured masked values*. One person, one fake
   identity, whole row.
4. Engineering details worth bragging about: whole-word matching, longest-original-first,
   capped memory with honest degradation, placeholder tokens chosen so NER ignores them,
   true originals (never placeheld text) kept for validation/audit.
5. Close: this is what "PostgreSQL-dedicated" buys — depth instead of connector count.

**Pull quote.** "Realistic test data means one coherent fake world, not a different lie in
every column."

---

## Article 3 — "We built a synthetic data generator that grades its own homework"
*(~900 words, data-engineering audience)*

**Thesis.** Every generator claims "realistic." Ours ships the report card: marginal
fidelity, correlation preservation, exact-copy risk, and distance-to-closest-record —
computed in plain SQL against your own database.

**Outline.**
1. The unfalsifiable-marketing problem: "realistic synthetic data" with no metric.
2. What we measure and why each metric matters (means/spreads → basic realism;
   pairwise correlations → whether reports still work; copy risk + DCR → whether
   "synthetic" quietly memorized real rows). Include the exact-copy-table demo:
   DCR ratio ≈ 0, memorization warning fires — the report catches the worst case
   by construction.
3. How generation earns good scores without reading rows: planner-statistics shaping
   behind a PII guard; declared-constraint enforcement; opt-in Gaussian conditional
   sampling for correlated pairs (show the r=0.95 reproduction test).
4. Honest limitations, stated proudly: no deep generative models, no formal DP — and the
   note the report prints when correlations differ. Honesty as a feature.
5. Close: fidelity reporting is available via API today; run it against your last
   generated environment and see what it says.

**Pull quote.** "If your generator won't score its own output, ask why."

---

## Distribution checklist
- [ ] Adapt Article 1 for LinkedIn (600-word cut, lead with the audit anecdote)
- [ ] Article 2 to dev.to / HN-friendly technical blog (keep the ledger/placeholder detail)
- [ ] Article 3 with real fidelity-report screenshots from the sample database
- [ ] Extract preflight one-liners (see video script 3) as a social carousel
- [ ] Comparison page (`/docs/owltable-comparison`) linked from all three
