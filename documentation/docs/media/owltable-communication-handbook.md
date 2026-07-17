# OwlTable Communication Handbook

This handbook is the definitive internal operations manual for all OwlTable product communication. It dictates how OwlTable presents itself across YouTube, landing pages, documentation, tutorials, conference presentations, sales demos, product launches, social media, and customer onboarding.

This document serves Product Managers, Developers, Technical Writers, Solutions Engineers, Marketing, Sales, and Founders. It is the single source of truth for communicating our value.

---

## 1. Communication Principles

Our objective is **not producing videos or writing documentation; our objective is communicating the value of OwlTable.** 

To achieve this, every asset must adhere to these core principles:
- **Solve a Problem:** Every video, doc, and demo exists to solve a specific customer problem.
- **Value Before Feature:** Never explain a feature before explaining the problem it solves. 
- **Show Evidence:** Show evidence instead of making marketing claims. We prove our claims through live demonstrations.
- **Complete Workflows:** Demonstrate complete workflows (source to target) instead of isolated features.
- **Consistent Terminology:** Keep terminology identical across videos, documentation, and the UI.
- **Measurable Objectives:** Every communication asset must have a measurable objective (e.g., reduce support tickets, drive demo requests).

---

## 2. Customer Journey Matrix

We map our content to a distinct learning journey. Use this matrix to understand what content belongs at each stage.

| Customer Stage | Primary Question | Recommended Content | Desired Outcome |
|---|---|---|---|
| **Visitor** | "What is OwlTable?" | Overview video, LinkedIn clips | Request demo or trial |
| **Prospect** | "Does it work with my stack?" | Competitor comparisons, Architecture guide | Schedule technical deep-dive |
| **Developer** | "How do I provision my first database?" | Tactical tutorial | Successful first job execution |
| **Security Engineer** | "Is my data actually safe?" | PII discovery demo, Local-execution whitepaper | Security approval for PoC |
| **Administrator** | "How do I automate refreshes?" | Scheduler tutorial, CLI docs | Production deployment |
| **Decision Maker** | "What is the ROI?" | Sales demo, Case studies | Enterprise contract signed |
| **Power User** | "How do I extend this?" | API guides, Architecture deep-dives | Customer advocacy / Conference talk |

---

## 3. The Product Narrative

We emphasize storytelling over feature lists. Every OwlTable demo—whether a 60-second social clip or a 10-minute webinar—must follow this narrative arc:

1. **Problem:** "Developers wait weeks for database copies."
2. **Risk:** "If they use production data, PII is leaked. If they use fake data, bugs slip through."
3. **Solution:** "OwlTable automates safe, realistic database provisioning."
4. **Proof:** (Execute a Masking Profile and run a Provisioning Job live on screen).
5. **Business Value:** "Developers get data instantly; Security maintains compliance."
6. **Next Step:** "Install the Docker container to try it yourself."

---

## 4. Product Terminology Glossary

Every important OwlTable term has one official definition. Use these consistently everywhere. Do not invent product terminology.

- **Provisioning Job:** The automated execution of copying, masking, and subsetting data from a source to a target.
- **Masking Profile:** A reusable configuration defining which columns receive which masking algorithms.
- **Readiness Check:** The pre-flight verification step ensuring the target database is safe to overwrite.
- **Workspace:** A logically isolated environment within OwlTable for a specific team or project.
- **Discovery:** The automated scanning process that identifies PII and sensitive data.
- **Validation:** Post-provisioning checks to ensure masking was successful and data remains structurally sound.
- **Synthetic Data:** Artificially generated data that mimics the statistical properties of production data without containing real PII.
- **Scheduler:** The OwlTable cron-based engine for automating recurring Provisioning Jobs.
- **Compare:** The tool used to diff schemas or data between a source and a target.

---

## 5. Expanded Customer Personas

Tailor the narrative to the specific audience.

### 1. Database Administrator (DBA)
- **Goals:** Reliability, scale, uptime.
- **Pain Points:** Developers constantly asking for database copies; manual, risky masking scripts.
- **Preferred Content:** Technical documentation, Architecture diagrams.
- **Core Question:** "Will this break my production server?"
- **CTA:** "Read the Architecture Guide."

### 2. Security Engineer / Compliance Officer
- **Goals:** Prevent data leaks, ensure GDPR compliance.
- **Pain Points:** PII leaking into staging environments.
- **Preferred Content:** Security whitepapers, PII Discovery demos.
- **Core Question:** "Does data ever leave our network?"
- **CTA:** "Review the Local-Execution Security Model."

### 3. Developer / QA Engineer
- **Goals:** Ship features faster, reproduce bugs reliably.
- **Pain Points:** Waiting weeks for DBA tickets.
- **Preferred Content:** 2-minute tactical tutorials.
- **Core Question:** "How fast can I get a database that looks like production?"
- **CTA:** "Run your first provisioning job."

### 4. Data Engineer / Architect
- **Goals:** Automate data pipelines.
- **Pain Points:** Broken foreign keys when subsetting.
- **Preferred Content:** Subsetting algorithm deep-dives.
- **Core Question:** "Does this maintain referential integrity?"
- **CTA:** "Explore the Algorithm Playground."

### 5. Decision Maker (VP of Eng / CTO)
- **Goals:** Reduce costs, increase developer velocity.
- **Pain Points:** Expensive data breaches.
- **Preferred Content:** High-level sales demos, ROI calculators.
- **Core Question:** "What is the ROI on replacing our homegrown scripts?"
- **CTA:** "Schedule a Sales Demo."

---

## 6. Demo Environment Governance

To ensure consistency across all documentation, videos, and sales demos, we use a single, reusable fictional organization: **Acme Retail**.

### The Acme Retail Lore
- **Industry:** Mid-sized B2C E-commerce.
- **Geography:** Headquarters in NY, Warehouses in Europe (GDPR concerns).
- **Databases:** `acme_prod` (PostgreSQL), `acme_staging` (MySQL).
- **Tables:** `Customers`, `Orders`, `Invoices`, `Warehouses`.
- **The Problem:** Legacy system stores US SSNs and European phone numbers in plain text.

### Governance Rules
- **Version Control:** The entire Acme Retail schema and initial dataset must be checked into the `owltable-demo-env` repository.
- **Reset Scripts:** Use `reset.sh` before every demo to tear down the environment, rebuild containers, and restore the exact baseline snapshot.
- **Naming Conventions:** Never use "test_db", "foo", or "bar". Always use `acme_prod` and `acme_dev_1`.
- **Data Ownership:** Marketing owns the Acme Retail dataset. Engineering must submit PRs to update it.
- **Test Accounts & Passwords:** Standardized dummy credentials (`admin@acmeretail.com` / `OwlTableDemo123!`). Never use personal emails in recordings.
- **Expected Execution Time:** Ensure the dataset is sized so that a full Provisioning Job completes within 45 seconds during a live demo.
- **Health Checks & Backups:** The demo environment must have automated health checks in CI to ensure the reset script functions flawlessly before major conferences.

---

## 7. Demo Scenario Catalog

Replace feature-driven walkthroughs with this catalog of reusable business scenarios.

### Scenario 1: Developer needs a QA database
- **Goal:** Show how fast a developer can self-serve data.
- **Audience:** Developers, DBAs.
- **Required Datasets:** `acme_prod` (Source), empty `acme_dev` (Target).
- **Required Features:** Add Connection, Run Job.
- **Expected Duration:** 2 minutes.
- **Reusable Recordings:** `conn-postgres.mp4`, `job-success.mp4`.
- **References:** `owltable-overview.md`

### Scenario 2: Finding PII before copying production
- **Goal:** Demonstrate compliance scanning.
- **Audience:** Security Engineers, Compliance Officers.
- **Required Datasets:** `acme_prod` with hidden SSNs.
- **Required Features:** Discovery, Masking Profiles.
- **Expected Duration:** 4 minutes.
- **Reusable Recordings:** `discovery-scan.mp4`.
- **References:** `owltable-masking.md`

### Scenario 3: Nightly refresh
- **Goal:** Prove enterprise automation.
- **Audience:** Administrators, DevOps.
- **Required Datasets:** `acme_staging`.
- **Required Features:** Scheduler, Audit Logs.
- **Expected Duration:** 3 minutes.
- **Reusable Recordings:** `scheduler-setup.mp4`.
- **References:** `automation.md`

---

## 8. Script Writing Rules

When writing a script for a video or a tutorial, adhere strictly to these rules:

1. **Avoid Passive Voice:** Say "OwlTable masks the data" not "The data is masked by OwlTable".
2. **Avoid Filler & Buzzwords:** Cut words like "synergy", "seamlessly", and "robust". Show, don't tell.
3. **Prefer Short Sentences:** Short sentences are easier to narrate and read on a screen.
4. **Never Narrate Obvious UI Actions:** Explain intent, not the mouse.
   - *Bad:* "Click the blue Add Profile button in the top right corner."
   - *Better:* "Create a reusable masking profile so every future provisioning job applies the same protection."

---

## 9. Visual Identity & Modular Asset Strategy

### Visual Identity
- **Intro/Outro:** Standardized 3-second animated OwlTable logo reveal.
- **Transitions:** Fast cross-dissolves. No wipes.
- **Colors & Typography:** OwlTable dark blues/purples. Inter font. Monospace for SQL.
- **Cursor Style:** Oversized white cursor with a subtle 30% opacity yellow highlight ring.
- **Zoom & Mouse:** Smooth, eased zooms (125%-150%). Move the mouse deliberately.

### AI Usage Policy
- **Encouraged AI Use:** Drafting scripts, generating SEO titles, creating thumbnail concepts, cleaning up voiceover audio, generating captions/translations.
- **Authenticity Required (No AI):** The actual product UI, performance demonstrations, benchmark results, and customer workflows must be 100% authentic and manually captured.

---

## 10. Repository Structure & Asset Organization

Keep media assets strictly organized within the repository architecture to avoid asset rot.

```text
/documentation
  /docs/               # Official markdown files
  /media/              # Official handbooks and style guides
/assets
  /thumbnails/         # GIMP/Figma template exports
  /animations/         # Standard intros, outros, logo loops
  /voiceovers/         # Cleaned .wav files
  /scripts/            # Approved markdown scripts
  /storyboards/        # Scene outlines
  /obs/                # Exported OBS Scene Collections (.json)
  /google-vids/        # Project manifests
  /youtube/            # Final MP4 exports ready for upload
  /social/             # 30-second trimmed cuts for LinkedIn/X
```

---

## 11. Media Asset Lifecycle

How a media asset moves from idea to archive.

1. **Draft:** Script and storyboard proposed by Marketing.
2. **Review:** Engineering verifies the technical accuracy of the script.
3. **Approved:** Ready for recording.
4. **Published:** Uploaded to YouTube and embedded in Docs/Landing pages.
5. **Archived:** UI changes significantly; asset is removed from public channels.
6. **Re-recorded:** A new asset is generated using the updated UI to replace the archived version.

---

## 12. Documentation Governance

To prevent documentation drift, ownership and review cadences must be strictly enforced.

- **Who Updates:**
  - *Videos & Landing Pages:* Marketing/DevRel team.
  - *Tutorials & Feature Pages:* Technical Writing team.
  - *Release Notes:* Product Management.
- **Review Cadence:** All documentation must undergo a full audit every 6 months.
- **Update Triggers:** A major UI overhaul, a feature rename, or a change in database connection flow automatically triggers an immediate re-recording of the associated modular assets.

---

## 13. Future-proofing

The handbook must remain useful as OwlTable evolves.
- **UI Redesigns:** Because we use a modular strategy (20-second clips), a UI redesign only requires re-recording the specific clips affected, not entire 10-minute videos.
- **Feature Renames:** Update the Glossary immediately. Do an exact-string replace across the `docs/` repository.
- **New Deployment Models:** If SaaS is introduced alongside self-hosted Docker, branch the Demo Scenarios catalog into "SaaS Scenarios" and "Self-Hosted Scenarios".

---

## 14. Success Metrics

Expand analytics beyond YouTube. We measure:
- **Average Watch Time:** Are viewers dropping off before the "Proof" stage?
- **Feature Adoption:** Does usage of the Scheduler spike after publishing the Scheduler tutorial?
- **Documentation Traffic:** Which tutorials generate the most organic search traffic?
- **Pipeline Metrics:** How many Demo Requests or Trial Signups originate from the landing page video?
- **Sales Enablement Usage:** How often do Account Executives send the Flagship video to prospects?
- **Customer Onboarding Time:** Does the time-to-first-provisioning-job decrease?
- **Support Ticket Reduction:** Do "How-To" tickets drop after a tutorial release?

---

## 15. Continuous Improvement

To ensure the handbook evolves alongside OwlTable, the following recurring review process happens **every quarter**:

- [ ] **Review Videos:** Watch the top 5 most trafficked videos. Does the UI still match?
- [ ] **Review Analytics:** Analyze drop-off rates. Are intros too long?
- [ ] **Identify Outdated Recordings:** Flag any 20-second clips in the repository that show deprecated features.
- [ ] **Update Scripts:** Rewrite weak scripts that failed to drive engagement.
- [ ] **Archive Obsolete Material:** Move old videos to the unlisted YouTube archive playlist and remove from docs.
- [ ] **Review Customer Feedback:** Add new scenarios based on common Sales Engineering hurdles.
