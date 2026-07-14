import React from 'react';
import SeoVideo from '@/components/SeoVideo';
import Link from 'next/link';

export default function IntroducingOwlMaskVideoGuide() {
    return (
        <div className="flex flex-col gap-6">
            <p className="text-xl leading-9 text-slate-300">
                This walkthrough introduces the core OwlMask workflow: connecting a source database, defining masking rules, running a job, and validating that lower environments receive safe test data.
            </p>

            <h2 className="mt-6 text-3xl font-bold tracking-normal text-white">Video Chapters</h2>
            <ul className="flex list-disc flex-col gap-3 pl-6 text-slate-300">
                <li><strong>00:00 — Why safe test data matters:</strong> The operational and compliance reasons to mask before data reaches lower environments.</li>
                <li><strong>00:24 — Connecting your database:</strong> How OwlMask connects to PostgreSQL, MySQL, or SQL Server and maps the schema read-only.</li>
                <li><strong>00:42 — Discovering PII:</strong> Automatic classification of sensitive columns with confidence scores and a human review queue.</li>
                <li><strong>01:06 — Masking rules:</strong> A practical look at synthetic values, format-preserving transformations, and deterministic masking.</li>
                <li><strong>01:36 — Referential integrity:</strong> How keys are remapped consistently so foreign keys still join after masking.</li>
                <li><strong>01:56 — Readiness and execution:</strong> The pre-run readiness assessment, followed by the masking job itself.</li>
                <li><strong>02:20 — Validation:</strong> Re-scanning the masked output to prove no PII remains.</li>
            </ul>

            <section className="mt-8 border-t border-white/10 pt-8">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Related external video</p>
                <h2 className="text-3xl font-bold tracking-normal text-white">Default Masking Rules Tutorial</h2>
                <SeoVideo
                    title="Data Masking - Default Rules Tutorial | Enterprise Test Data"
                    description="A related external tutorial showing how default masking rules can be applied as part of a repeatable anonymization workflow."
                    videoUrl="https://www.youtube.com/embed/hn7m3ihiQwE"
                />
            </section>

            <h2 className="mt-6 text-3xl font-bold tracking-normal text-white">Next Steps</h2>
            <p className="text-slate-300">
                Use the documentation to start setting up your first masking project. The recommended path is to configure connections, classify sensitive fields, then run validation before provisioning data.
            </p>
            
            <div className="mt-8 text-center">
                <Link href="/docs/intro" className="inline-flex rounded-md bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition-colors hover:bg-cyan-300">
                    Read the Documentation
                </Link>
            </div>
        </div>
    );
}
