import React from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, MinusCircle, ServerOff, DollarSign, UserRound } from 'lucide-react';
import type { Metadata } from 'next';
import CompareLinks from '@/components/CompareLinks';
import JsonLd from '@/components/JsonLd';
import { FALLBACK_CATALOG, formatCatalogTerms, getCatalogProduct } from '@/lib/catalog';

const owltable = getCatalogProduct(FALLBACK_CATALOG, 'owltable');
const complete = getCatalogProduct(FALLBACK_CATALOG, 'owlmask-complete');

export const metadata: Metadata = {
    title: 'OwlTable vs. Tonic.ai | The Self-Hosted Masking Alternative',
    description: 'Looking for a Tonic.ai alternative? OwlTable runs entirely on your infrastructure with flat public pricing, local LLM free-text masking, and auditor-ready evidence packs.',
    alternates: { canonical: '/compare/tonic-alternative' },
};

const rows = [
    {
        feature: 'Where it runs',
        owltable: { ok: true, text: 'Entirely on your infrastructure' },
        other: { ok: false, text: 'Cloud-first; self-hosting gated to top tiers' },
    },
    {
        feature: 'Free-text & JSON PII',
        owltable: { ok: true, text: 'Run the model locally, or send only masked text to a hosted one' },
        other: { ok: false, text: 'Typically cloud AI services' },
    },
    {
        feature: 'Pricing',
        owltable: { ok: true, text: formatCatalogTerms(owltable) },
        other: { ok: false, text: 'Quote-based sales process' },
    },
    {
        feature: 'Evaluation',
        owltable: { ok: true, text: 'Eval bundle on your laptop in ~15 minutes' },
        other: { ok: false, text: 'Sales-qualified demo first' },
    },
    {
        feature: 'Proof of masking',
        owltable: { ok: true, text: 'Validation re-scan + downloadable evidence pack' },
        other: { neutral: true, text: 'Varies by product and tier' },
    },
];

export default function CompareTonic() {
    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-16">
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                name: 'OwlTable vs. Tonic.ai',
                description: metadata.description,
                url: 'https://www.owltable.net/compare/tonic-alternative',
                about: [
                    { '@type': 'SoftwareApplication', name: owltable.name, url: 'https://www.owltable.net/#pricing' },
                    { '@type': 'SoftwareApplication', name: 'Tonic.ai' },
                ],
            }} />
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen opacity-50" />
                <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen opacity-40" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20 pt-12">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                        The Self-Hosted <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                            Tonic.ai Alternative
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                        SaaS masking platforms are polished — and they’re built around their cloud, their sales process, and their pricing call. OwlTable is built around your infrastructure and a price you can read right now.
                    </p>
                </div>

                <div className="mb-24">
                    <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl overflow-x-auto shadow-2xl">
                        <table className="w-full text-left border-collapse min-w-[720px]">
                            <thead>
                                <tr>
                                    <th className="p-6 border-b border-zinc-800 text-xl font-semibold text-gray-300 w-1/3">Feature</th>
                                    <th className="p-6 border-b border-zinc-800 bg-blue-900/20 w-1/3 border-l border-zinc-800">
                                        <div className="text-2xl font-bold text-blue-400">OwlTable</div>
                                    </th>
                                    <th className="p-6 border-b border-zinc-800 text-xl font-semibold text-gray-400 w-1/3 border-l border-zinc-800">Typical SaaS platforms</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {rows.map((row) => (
                                    <tr key={row.feature}>
                                        <td className="p-6 text-gray-300 font-medium">{row.feature}</td>
                                        <td className="p-6 bg-blue-900/10 border-l border-zinc-800">
                                            <span className="flex items-center gap-2 text-blue-300">
                                                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" /> {row.owltable.text}
                                            </span>
                                        </td>
                                        <td className="p-6 border-l border-zinc-800 text-gray-400">
                                            <span className="flex items-center gap-2">
                                                {'neutral' in row.other && row.other.neutral
                                                    ? <MinusCircle className="w-5 h-5 shrink-0 text-amber-400" />
                                                    : <XCircle className="w-5 h-5 shrink-0 text-red-400" />} {row.other.text}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 text-center text-sm text-gray-600">General comparison with cloud-first masking SaaS; verify specifics against any vendor’s current offering.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl hover:bg-zinc-900/60 transition-colors">
                        <ServerOff className="w-10 h-10 text-cyan-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-4">Data sovereignty by default</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Everything — the platform, the masking engine, even the LLM that handles free-text PII — runs inside your network. There is no vendor cloud in the data path, so there’s nothing to add to your sub-processor list.
                        </p>
                    </div>
                    <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl hover:bg-zinc-900/60 transition-colors">
                        <DollarSign className="w-10 h-10 text-blue-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-4">Pricing you can read</h3>
                        <p className="text-gray-400 leading-relaxed">
                            {owltable.name} is {formatCatalogTerms(owltable)}; {complete.name} is {formatCatalogTerms(complete)}. Both are on the pricing section of this site, not behind a discovery call. Budgeting shouldn’t require a sales cycle.
                        </p>
                    </div>
                    <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl hover:bg-zinc-900/60 transition-colors">
                        <UserRound className="w-10 h-10 text-violet-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-4">Try first, talk after</h3>
                        <p className="text-gray-400 leading-relaxed">
                            The <Link href="/get-started" className="text-blue-300 hover:text-blue-200">15-minute eval bundle</Link> runs the real product on your laptop with a seeded sample database — before any call, with a founder answering your questions instead of a sales team.
                        </p>
                    </div>
                </div>

                <div className="text-center bg-gradient-to-b from-blue-900/20 to-transparent border border-blue-500/20 rounded-3xl p-12 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold mb-6">See it mask a database before any sales call.</h2>
                        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                            Fifteen minutes on your own machine, ending with an auditor-ready evidence pack.
                        </p>
                        <Link href="/get-started" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                            Get started in 15 minutes
                        </Link>
                    </div>
                </div>

                <CompareLinks current="tonic-alternative" />
            </div>
        </main>
    );
}
