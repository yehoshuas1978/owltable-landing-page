# OwlTable Video Scripts (internal — not published as docs)

Production notes: screen-capture the real GUI (data-operations tabs) against the sample
database. Keep cursor movement slow; zoom on preflight panels. Voice: confident, dry,
no hype words. All product claims below are shipped behavior — do not improvise features.

---

## Video 1 — "Prove It" (90-second positioning spot)

**[0:00–0:10] Hook.** Black screen, single line of text types out:
*"Your test database has production data in it."*
VO: "Somewhere in your company, right now, a copy of production is sitting in a test
environment. How sure are you about what's in it?"

**[0:10–0:30] The problem.** Quick cuts: a `SELECT * FROM customers` showing real-looking
emails; a support-ticket text column with a name and phone number highlighted.
VO: "Masking tools change columns. But PII hides in free text. Constraints break runs at
hour three. And when the auditor asks for evidence, you have… a job log."

**[0:30–1:05] The product.** Screen recording, three beats:
1. *Readiness gate*: a masking run refused — the BLOCKED check visible ("hash masking has
   no secret pepper"). VO: "OwlTable refuses unsafe runs before they start — enforced in
   the backend, not a dismissable warning."
2. *Free-text consistency*: side-by-side row — name column "Maya Levi", note text "Called
   Maya Levi about the refund." VO: "It masks names inside free text — and keeps them
   consistent with the columns. Nobody else does this."
3. *Proof/fidelity*: the fidelity report with the 0–100 score and privacy section.
   VO: "And when it's done, it hands you proof. Masking evidence. Privacy scores.
   Auditor-ready."

**[1:05–1:20] Positioning.** Logo.
VO: "OwlTable. Provably safe test data for PostgreSQL. Don't trust your masking tool.
Verify it."

---

## Video 2 — "A Safe Database in Five Minutes" (5-minute demo walkthrough)

**Chapter 1 (0:00–0:45) — Setup.** Show source connection (sample production-like DB,
~lots of rows) and empty target. State the goal: "a small, safe, referentially complete
copy for the dev team."

**Chapter 2 (0:45–1:45) — Discovery.** Run a PII scan. Show findings list: classifications,
confidence, evidence chips (column-name / value-sampling / NER), severity. Point out one
blandly named column caught by value evidence. One sentence on NER assist: "when the
heuristics aren't sure, the AI model looks at the actual values."

**Chapter 3 (1:45–3:00) — Subsetting with a size goal.** Enter target size goal
(e.g. 1,000,000 rows). Run preflight. Dwell on:
- the recommended driving percentage ("select ~5% of driving rows"),
- a full-copy promotion warning with its row count,
- the typed warning chips.
Run it; show per-table progress and the transfer completing.

**Chapter 4 (3:00–4:15) — Masking.** Attach the masking profile from the scan findings.
Show the readiness assessment pass (green checks incl. pepper + encryption secret).
Run; show phase progress. Then the money shot: query the target — masked columns AND a
free-text note using the same masked name. Show the masking proof/evidence view.

**Chapter 5 (4:15–5:00) — Wrap.** Show the fidelity report on a generated table (score,
correlation table, privacy section). Close: "Discovered, subsetted, masked, and proven —
one platform, one audit trail. That's OwlTable."

---

## Video 3 — "The Preflight" (60-second social cut)

Rapid montage of real preflight messages appearing as typed text, one per second:
- "Table audit_log (40,000,000 rows) will be copied in full…"
- "These tables form a foreign-key cycle…"
- "Your ratio will generate ~48,000 rows, not 1,000 — the ratio wins."
- "Hash masking has no secret pepper — BLOCKED."
- "Generated rows sit 72% closer to real records than real records sit to each other."
VO at the end: "Every one of these is a disaster that didn't happen. OwlTable tells you
at minute zero what other tools let you discover at hour three."
