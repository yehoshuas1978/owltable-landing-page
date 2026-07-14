import React from 'react';
import SeoVideo from '@/components/SeoVideo';
import Link from 'next/link';

export default function HowToConfigurePostgresqlMasking() {
    return (
        <div className="flex flex-col gap-6">
            <p className="text-xl leading-9 text-slate-300">
                This guide covers how to connect PostgreSQL databases to OwlMask and configure robust masking rules for sensitive columns.
            </p>

            <h2 className="mt-6 text-3xl font-bold tracking-normal text-white">Video Chapters — the 11 Steps</h2>
            <ul className="flex list-disc flex-col gap-3 pl-6 text-slate-300">
                <li><strong>00:14 — Prerequisites:</strong> A read-only role is the only PostgreSQL setup you need.</li>
                <li><strong>00:32 — Step 1, Connect:</strong> Host, port, database, user, and SSL mode for source and target.</li>
                <li><strong>00:56 — Step 2, Scan the schema:</strong> Tables, row estimates, foreign keys, sequences, constraints.</li>
                <li><strong>01:18 — Steps 3–4, Discover and review PII:</strong> Classification with confidence scores, including jsonb columns.</li>
                <li><strong>02:02 — Step 5, Build the masking profile:</strong> Synthetic, format-preserving, and deterministic rules per column.</li>
                <li><strong>02:30 — Steps 6–7, Integrity and constraints:</strong> FK remapping, uniqueness, NOT NULL, and sequences preserved.</li>
                <li><strong>03:08 — Steps 8–9, Readiness and run:</strong> The gated job streaming three million rows to the target.</li>
                <li><strong>03:54 — Steps 10–11, Verify and validate:</strong> psql spot-checks, then a full PII re-scan with zero findings.</li>
            </ul>

            <section className="mt-8 border-t border-white/10 pt-8">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Related external video</p>
                <h2 className="text-3xl font-bold tracking-normal text-white">PostgreSQL Anonymization Concepts</h2>
                <SeoVideo
                    title="Anonymization and Data Masking for PostgreSQL"
                    description="A related external PostgreSQL tutorial covering anonymization and masking concepts for sensitive database fields."
                    videoUrl="https://www.youtube.com/embed/niIIFL4s-L8"
                />
            </section>

            <h2 className="mt-6 text-3xl font-bold tracking-normal text-white">Next Steps</h2>
            <p className="text-slate-300">
                Ready to try it out? Start by configuring your first PostgreSQL connection in the OwlTable Manager or read more about PostgreSQL specifics in our documentation.
            </p>
            
            <div className="mt-8 text-center">
                <Link href="/docs/databases/postgresql" className="inline-flex rounded-md bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition-colors hover:bg-cyan-300">
                    PostgreSQL Docs
                </Link>
            </div>
        </div>
    );
}
