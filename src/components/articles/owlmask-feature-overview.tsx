import React from 'react';
import SeoVideo from '@/components/SeoVideo';
import Link from 'next/link';

export default function OwlmaskFeatureOverview() {
    return (
        <div className="flex flex-col gap-6">
            <p className="text-xl leading-9 text-slate-300">
                Join our product team as they walk through the latest capabilities introduced in OwlMask 2.0, including advanced AI-driven data discovery and improved compliance reporting.
            </p>

            <h2 className="mt-6 text-3xl font-bold tracking-normal text-white">Feature Areas</h2>
            <ul className="flex list-disc flex-col gap-3 pl-6 text-slate-300">
                <li><strong>Product vision:</strong> The workflow improvements behind OwlMask 2.0.</li>
                <li><strong>AI-driven discovery:</strong> Automatically finding sensitive data fields using machine learning.</li>
                <li><strong>Custom masking plugins:</strong> How to extend OwlMask with your own masking logic.</li>
                <li><strong>Compliance reporting:</strong> Generating auditor-ready PDF reports directly from the dashboard.</li>
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
