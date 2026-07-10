import React from 'react';
import SeoVideo from '@/components/SeoVideo';
import Link from 'next/link';

export default function HowToConfigurePostgresqlMasking() {
    return (
        <div className="flex flex-col gap-6">
            <p className="text-xl leading-9 text-slate-300">
                This guide covers how to connect PostgreSQL databases to OwlMask and configure robust masking rules for sensitive columns.
            </p>

            <h2 className="mt-6 text-3xl font-bold tracking-normal text-white">Configuration Steps</h2>
            <ul className="flex list-disc flex-col gap-3 pl-6 text-slate-300">
                <li><strong>PostgreSQL overview:</strong> What OwlMask needs from a source database connection.</li>
                <li><strong>Database connection:</strong> Setting up the PostgreSQL connection string and credentials.</li>
                <li><strong>Schema discovery:</strong> Scanning your database for PII and sensitive fields.</li>
                <li><strong>Applying masking rules:</strong> Choosing the right masking algorithms for emails, names, and credit cards.</li>
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
