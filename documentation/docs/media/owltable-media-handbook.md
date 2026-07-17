# OwlTable Media Strategy & Production Handbook

Welcome to the definitive guide for producing OwlTable media. This handbook is the authoritative reference for all future OwlTable media assets.

The objective of this handbook is not simply producing videos—it is **communicating the value of OwlTable**. Every video, screenshot, and demo should help move a potential customer further through the buying journey by demonstrating how OwlTable solves critical data provisioning, security, and testing problems.

This document serves Product Managers, Developers, Technical Writers, Solutions Engineers, Marketing, Sales, and Founders.

---

## 1. Core Philosophy

### Vision
To establish OwlTable as the premier, uncompromisingly secure, and developer-centric platform for data provisioning and database management. Our media must reflect a premium, reliable, and enterprise-ready tool.

### Communication Philosophy
Focus on customer problems. Never explain a feature before explaining the problem it solves. Our videos should tell stories, not simply demonstrate UI clicks. We show the "why" before the "how."

### Tone of Voice
- **Authoritative but Accessible:** We are experts in data management, but we speak plainly without hiding behind unnecessary jargon.
- **Direct & Honest:** We act as technical co-founders to our users. We present tradeoffs, facts, and capabilities plainly.
- **Empathetic:** We deeply understand the pain of broken test environments, PII leaks, and slow database operations.

### Brand Identity & Visual Identity
- **Palette:** Dark themes convey modern developer environments. Use OwlTable brand colors (deep blues/purples with high-contrast accent colors for callouts).
- **Style:** Clean, uncluttered, and precise. Avoid overly cartoonish graphics; prefer sleek, technical diagrams (e.g., ERDs, architectural flowcharts).

---

## 2. Audience & Journey

### Target Personas
1. **Database Administrators (DBAs):** Focused on reliability, scale, performance tuning, and schema control.
2. **Backend & DevOps Engineers:** Focused on CI/CD integration, synthetic data generation, and automation.
3. **Security & Compliance Teams:** Focused on PII discovery, local execution (data privacy), and audit logs.
4. **Data Analysts & QA:** Focused on getting realistic, sanitized test data quickly for reliable testing.

### Customer Journey
1. **Awareness:** Short LinkedIn clips, Architecture videos, Feature Announcements.
2. **Consideration:** Flagship Overview Video, OwlTable vs. Competitors, Product Webinars.
3. **Decision:** Deep-dive Technical Demos, Sales Demos, Proof of Concept (PoC) walkthroughs.
4. **Retention/Advocacy:** Tutorials, Release Videos, Continuous Education.

---

## 3. Demo Strategy & Environment

### Demo Philosophy
We design reusable demo scenarios based on real-world pain points. Every future video should be based on one or more of these reusable scenarios.

### The Demo Company: Acme Retail
All demos share a persistent, fictional universe: **Acme Retail**.
- **Context:** A mid-sized e-commerce company struggling with data privacy in QA.
- **Databases:** PostgreSQL (Primary), MySQL (Legacy), SQL Server (Warehouse).
- **Tables:** `Customers`, `Employees`, `Orders`, `Products`, `Invoices`, `Warehouses`.

### Demo Datasets
- Inject thousands of rows of realistic dummy data (names, emails, SSNs, credit cards).
- Maintain constraints, foreign keys, and statistical correlations (e.g., zip codes match states).

### Demo Scenarios
1. **Scenario 1:** Developer needs a QA database instantly without waiting for a DBA ticket.
2. **Scenario 2:** Security officer discovers unmasked PII in a staging environment.
3. **Scenario 3:** Nightly refresh of a staging database using the OwlTable Scheduler.
4. **Scenario 4:** Generating synthetic data for a brand-new application feature.
5. **Scenario 5:** Provisioning a localized development environment on a laptop.

### Environment Setup & Demo Reset Process
- **Setup:** Use a standardized `docker-compose.yml` to spin up the Acme Retail source, an empty target database, and the OwlTable control plane.
- **Reset:** Run a predefined `reset.sh` script to drop the target, restore the source from a snapshot, and load the baseline OwlTable configuration (Connections, Masks, Profiles) via API.

---

## 4. Video Categories

1. **Sales Demos:** High-level (5-7 mins), focused on ROI, security, and developer velocity. Tailored for decision-makers.
2. **Technical Demos:** Deep dives (5-10 mins) into specific architectures, LLM prompt generation, and synthetic data algorithms.
3. **Tutorials:** Tactical, step-by-step guides (2-4 mins) for end-users (e.g., "Creating your first masking profile").
4. **Conference Presentations:** High-energy, tightly rehearsed live-demo recordings with strong narrative hooks.
5. **Release Videos:** Fast-paced (1-2 mins) summaries of what's new in a specific version update.
6. **Architecture Videos:** Whiteboard-style or animated diagrams explaining OwlTable's client-server, local-execution model.
7. **Feature Announcements:** Highly polished, 60-second "sizzle" reels for social media.

---

## 5. Production Workflows

### Modular Content Strategy
Everything should be reusable. Design assets in chunks:
- 20-second clips of specific UI actions (e.g., running PII discovery).
- Standardized intros, outros, and logo animations.
- Reusable voiceovers for common transitions.
- A centralized library of cursor styles, callouts, and background music.

### OBS Workflow (Screen Recording)
- **Resolution:** 1440p or 4K capture.
- **Framerate:** 60 FPS.
- **Recording Standards:** Dark theme. No desktop notifications (Do Not Disturb). Hide dock/taskbar. Browser scale strictly at 100% for crisp Material UI rendering.
- **Strategy:** Record in short 30–60 second clips. Do not attempt one-take recordings.

### Voiceover Workflow
- Record audio separately from the screen capture to ensure high quality and reduce cognitive load.
- Speak deliberately, leaving pauses between sentences.
- Match narration to the action ("Click Add Connection" just before the cursor clicks).

### AI Workflow
- Use ChatGPT or Claude to draft initial scripts, structure storyboards, and generate SEO-optimized titles/descriptions based on documentation.
- **TODO:** Evaluate AI voice generation tools (e.g., ElevenLabs) for standardized tutorial voices to ensure consistency across the team.

### Google Vids Editing Workflow
- Import modular clips and audio tracks.
- Trim dead space and loading times.
- Overlay text callouts, standard transitions, and background music (at -25db or lower).

---

## 6. Visual & Motion Guidelines

### Cursor Guidelines
- Use a large, high-contrast cursor.
- Apply a subtle highlight ring to the cursor in post-production.
- **No erratic movements:** Move deliberately to the target, pause, click.

### Motion & Animation Guidelines
- Smooth, eased transitions (ease-in/ease-out).
- In post-production, smoothly zoom in (125%-150%) on critical UI elements (like code blocks or SQL output) for mobile viewers.
- Darken the background slightly when focusing attention on a specific modal.

### Thumbnail Guidelines
- Use GIMP or Inkscape with established templates.
- **Consistency:** OwlTable brand colors, typography, and logo.
- **Layout:** Face/Avatar (optional) on right, bold text (under 5 words) on left.
- **Background:** Blurred screenshot of the relevant UI.

---

## 7. Script & Storyboard Templates

### Storyboard Template
1. **The Hook (0:00 - 0:15):** The Customer Problem.
2. **The Context (0:15 - 0:45):** Conceptual explanation.
3. **The Execution (0:45 - X:XX):** Step-by-step UI walkthrough.
4. **The Result (X:XX - Y:YY):** Proof of success.
5. **The Call to Action (Y:YY - End):** Next steps.

### Script Template Example (Tutorial)
**Title:** Masking PII in PostgreSQL
- **[Audio]** "Manually masking database dumps is slow and risky. Let's look at how OwlTable automates this in minutes."
- **[Visual]** Show complex Acme Retail DB with clear text SSNs.
- **[Audio]** "First, we run PII Discovery to find sensitive columns..."
- **[Visual]** Zoom on PII Discovery button click and scan results.
- **[Audio]** "Next, we apply a Masking Profile and run the Provisioning Job."
- **[Visual]** Fast-forward transition of job execution. Show Target DB with masked SSNs.

---

## 8. Channel & Content Strategy

### YouTube Strategy & SEO
- **Titles:** Action-oriented, searchable terms (e.g., "Automate PostgreSQL Data Masking | OwlTable Tutorial").
- **Descriptions:** Include chapter timestamps, links to specific docs, and a call to action.
- **Tags:** Data masking, PostgreSQL, SQL Server, Synthetic Data, DevSecOps.
- **Playlists:** Organize by persona ("For DBAs", "For Developers") and product ("OwlTable Basics").

### LinkedIn Strategy
- Extract 30-60 second "micro-demos" from longer videos.
- Focus the post text on the business value or a controversial take on database management.
- Always include captions (SRT files) since most users watch on mute.

### Conference Strategy
- Videos used at conferences must be pre-recorded to avoid live-demo failures.
- Highly visual, fast-paced, with enlarged text for readability on large screens.

### Documentation, Landing Page, & Blog Synchronization
- **Landing Page:** Embed the Flagship Overview video directly in the hero section.
- **Documentation:** Embed tactical tutorials directly into the relevant `docs/` pages (e.g., embed the Masking video inside `owltable-masking.md`).
- **Blogs:** Every major feature launch article should include an embedded demonstration video.

---

## 9. Asset Management

### Media Library Organization
Store all assets in a centralized, backed-up cloud drive or LFS repository, structured as:
```text
/media
  /raw-captures
  /voiceovers
  /project-files
  /exports
  /brand-assets (logos, intros, overlays, cursor-icons)
```

### Content Reuse Strategy
Never recreate an asset if it already exists. Before recording a new "Add Connection" sequence, check the `/raw-captures` library for an existing, up-to-date clip. 

---

## 10. Operations & Governance

### Quarterly Content Roadmap
- Marketing and Product teams will align quarterly on upcoming feature releases and prioritize video production accordingly.
- Ensure a mix of Top-of-Funnel (Awareness) and Bottom-of-Funnel (Tutorial) content is produced each quarter.

### Release Checklist
- [ ] Scenario defined based on customer problem.
- [ ] Script and Storyboard reviewed.
- [ ] Demo environment (Acme Retail) primed.
- [ ] Video captured (1440p, 60fps, Dark Theme, 100% scale).
- [ ] Voiceover recorded and cleaned.
- [ ] Video assembled (zooms, callouts, intro/outro).
- [ ] Thumbnail created.
- [ ] Uploaded to YouTube (SEO, Timestamps).
- [ ] Embedded in Docs/Landing Page.
- [ ] Social media clips exported.

### Analytics & Continuous Improvement
- **Metrics:** Track YouTube Audience Retention graphs to identify drop-off points. Monitor Thumbnail Click-Through Rates (CTR).
- **Feedback Loop:** Solicit feedback from Sales Engineers on which videos close deals, and from DevRel on which tutorials reduce support tickets.
- **Iteration:** Regularly review this handbook. Update guidelines as UI paradigms shift or new tools emerge.

### Future Roadmap
- **TODO:** Implement automated video generation pipelines using CLI scripts for basic tutorials as the UI stabilizes.
- **TODO:** Translate core tutorials into multiple languages (Spanish, German, Japanese) to support global expansion.
