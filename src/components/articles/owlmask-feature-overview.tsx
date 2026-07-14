import React from 'react';
import SeoVideo from '@/components/SeoVideo';
import Link from 'next/link';

export default function OwlmaskFeatureOverview() {
    return (
        <div className="flex flex-col gap-6">
            <p className="text-xl leading-9 text-slate-300">
                The whole OwlTable platform in a single five-minute tour: ten features, one workflow — from provisioning jobs and PII discovery through subsetting, synthetic data, scheduling, and auditor-ready proof.
            </p>

            <h2 className="mt-6 text-3xl font-bold tracking-normal text-white">Video Chapters — Ten Features</h2>
            <ul className="flex list-disc flex-col gap-3 pl-6 text-slate-300">
                <li><strong>00:30 — Jobs:</strong> The primary workflow — repeatable, readiness-gated, fully attributed.</li>
                <li><strong>00:56 — PII discovery:</strong> Column classification with confidence scores and a review queue.</li>
                <li><strong>01:18 — Masking profiles:</strong> Named, versioned rule sets reusable across jobs.</li>
                <li><strong>01:44 — Algorithm playground:</strong> Try any algorithm on sample values, instantly.</li>
                <li><strong>02:04 — Subsetting:</strong> A referentially complete slice of production that fits on a laptop.</li>
                <li><strong>02:30 — In-place masking:</strong> Clean an existing copy where it stands, behind a strict readiness gate.</li>
                <li><strong>02:50 — Synthetic data:</strong> Realistic rows generated from scratch for empty schemas.</li>
                <li><strong>03:12 — Scheduler &amp; monitoring:</strong> Nightly refreshes with full run history and alerts.</li>
                <li><strong>03:36 — Validation suite:</strong> PII re-discovery, masking validation, and profile checks.</li>
                <li><strong>03:56 — Compare, audit &amp; SSO:</strong> Source-vs-target diffs, evidence packs, and role-based access.</li>
            </ul>

            <section className="mt-8 border-t border-white/10 pt-8">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Related external video</p>
                <h2 className="text-3xl font-bold tracking-normal text-white">Dynamic Masking and Encryption Patterns</h2>
                <SeoVideo
                    title="Dynamic Data Masking & Encryption for MySQL/PostgreSQL"
                    description="A related external session on dynamic data masking and encryption patterns for relational databases."
                    videoUrl="https://www.youtube.com/embed/s7tHhyxuXg4"
                />
            </section>

            <h2 className="mt-6 text-3xl font-bold tracking-normal text-white">Next Steps</h2>
            <p className="text-slate-300">
                Upgrade to OwlMask 2.0 today to take advantage of these new features, or contact our sales team to get a personalized demo for your enterprise.
            </p>
            
            <div className="mt-8 text-center">
                <Link href="/contact" className="inline-flex rounded-md bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition-colors hover:bg-cyan-300">
                    Request a Demo
                </Link>
            </div>
        </div>
    );
}
