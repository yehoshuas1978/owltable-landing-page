import React from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, AlertTriangle, Wrench, EyeOff, Scale } from 'lucide-react';
import type { Metadata } from 'next';
import CompareLinks from '@/components/CompareLinks';

export const metadata: Metadata = {
    title: 'OwlTable vs. DIY Masking Scripts | An Honest Comparison',
    description: 'In-house masking scripts are free and fully under your control — until schemas drift and auditors ask for proof. An honest comparison, including when scripts are the right call.',
    alternates: { canonical: '/compare/diy-masking-scripts' },
};

type Cell = { ok: boolean; text: string };

const rows: { feature: string; scripts: Cell; owltable: Cell }[] = [
    {
        feature: 'Upfront cost',
        scripts: { ok: true, text: 'Free — it’s your code' },
        owltable: { ok: false, text: '$299/month per installation' },
    },
    {
        feature: 'Control',
        scripts: { ok: true, text: 'Total — every line is yours' },
        owltable: { ok: true, text: 'Profiles + custom algorithms, versioned' },
    },
    {
        feature: 'Finding PII',
        scripts: { ok: false, text: 'A column list someone wrote last year' },
        owltable: { ok: true, text: 'Classifier with confidence scores + review queue' },
    },
    {
        feature: 'Schema drift',
        scripts: { ok: false, text: 'New columns ship unmasked, silently' },
        owltable: { ok: true, text: 'Re-discovery flags new columns before jobs run' },
    },
    {
        feature: 'Referential integrity',
        scripts: { ok: false, text: 'Hand-maintained mapping tables' },
        owltable: { ok: true, text: 'Deterministic key remapping across all tables' },
    },
    {
        feature: 'Safety rails',
        scripts: { ok: false, text: 'Nothing between the script and production' },
        owltable: { ok: true, text: 'Readiness gates block unsafe runs server-side' },
    },
    {
        feature: 'Proof for auditors',
        scripts: { ok: false, text: '“Trust us, we ran it”' },
        owltable: { ok: true, text: 'Validation re-scan + evidence pack per job' },
    },
];

export default function CompareDiyScripts() {
    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-16">
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] mix-blend-screen opacity-50" />
                <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen opacity-40" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20 pt-12">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                        Your Masking Scripts <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                            vs. OwlTable
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
                        The real competitor to a masking platform isn’t another vendor — it’s the SQL script your team already wrote. Here’s the honest comparison, including the rows where your script wins.
                    </p>
                </div>

                <div className="mb-24">
                    <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl overflow-x-auto shadow-2xl">
                        <table className="w-full text-left border-collapse min-w-[720px]">
                            <thead>
                                <tr>
                                    <th className="p-6 border-b border-zinc-800 text-xl font-semibold text-gray-300 w-1/3">Reality check</th>
                                    <th className="p-6 border-b border-zinc-800 text-xl font-semibold text-gray-400 w-1/3 border-l border-zinc-800">In-house scripts</th>
                                    <th className="p-6 border-b border-zinc-800 bg-blue-900/20 w-1/3 border-l border-zinc-800">
                                        <div className="text-2xl font-bold text-blue-400">OwlTable</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {rows.map((row) => (
                                    <tr key={row.feature}>
                                        <td className="p-6 text-gray-300 font-medium">{row.feature}</td>
                                        <td className="p-6 border-l border-zinc-800 text-gray-400">
                                            <span className="flex items-center gap-2">
                                                {row.scripts.ok
                                                    ? <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                                                    : <XCircle className="w-5 h-5 shrink-0 text-red-400" />} {row.scripts.text}
                                            </span>
                                        </td>
                                        <td className="p-6 bg-blue-900/10 border-l border-zinc-800">
                                            <span className="flex items-center gap-2 text-blue-300">
                                                {row.owltable.ok
                                                    ? <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                                                    : <XCircle className="w-5 h-5 shrink-0 text-amber-400" />} {row.owltable.text}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl hover:bg-zinc-900/60 transition-colors">
                        <Wrench className="w-10 h-10 text-amber-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-4">The hidden cost</h3>
                        <p className="text-gray-400 leading-relaxed">
                            The script was free. Maintaining it isn’t: every schema change, every new FK, every “can you re-run the staging refresh?” lands on the same senior engineer. That time has a price — usually higher than a platform’s.
                        </p>
                    </div>
                    <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl hover:bg-zinc-900/60 transition-colors">
                        <EyeOff className="w-10 h-10 text-rose-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-4">The silent failure mode</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Scripts mask the columns they know about. The `notes` field someone added in March ships to staging unmasked, and nothing tells you. Discovery-first masking exists precisely because this failure is invisible until it’s a breach.
                        </p>
                    </div>
                    <div className="bg-zinc-900/40 border border-emerald-800/40 p-8 rounded-2xl hover:bg-zinc-900/60 transition-colors">
                        <Scale className="w-10 h-10 text-emerald-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-4">When scripts are the right call</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Honestly: a ten-table schema that never changes, one environment, no auditors, no compliance scope — keep your script. It’s the correct engineering decision. OwlTable earns its fee when schemas drift, environments multiply, or someone has to prove the masking worked.
                        </p>
                    </div>
                </div>

                <div className="text-center bg-gradient-to-b from-emerald-900/20 to-transparent border border-emerald-500/20 rounded-3xl p-12 relative overflow-hidden">
                    <div className="relative z-10">
                        <AlertTriangle className="mx-auto mb-5 h-9 w-9 text-amber-400" />
                        <h2 className="text-4xl font-bold mb-6">Find out what your script is missing.</h2>
                        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                            Run the 15-minute eval, point PII discovery at a copy of your schema, and compare the findings with your script’s column list. If they match, you didn’t need us — and now you can prove it.
                        </p>
                        <Link href="/get-started" className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl transition-transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.35)]">
                            Get started in 15 minutes
                        </Link>
                    </div>
                </div>

                <CompareLinks current="diy-masking-scripts" />
            </div>
        </main>
    );
}
