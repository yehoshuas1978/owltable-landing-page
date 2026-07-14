import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CheckCircle2, Container, Database, FileCheck2, Mail, MonitorPlay, PlayCircle, ShieldCheck, Terminal } from 'lucide-react';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'Get Started — Evaluate OwlTable in 15 Minutes',
    description: 'Request the OwlTable eval bundle, run one docker compose command, and walk a guided golden path: PII discovery, masking job, data compare, and an evidence pack — all on your own machine.',
    alternates: { canonical: '/get-started' },
};

const steps = [
    {
        icon: Mail,
        title: 'Request the eval bundle',
        time: '~1 min',
        body: 'Email us and we reply with the evaluation bundle and a 30-day key. It’s a founder-led process — you get a person, not a drip campaign.',
        detail: null,
    },
    {
        icon: Terminal,
        title: 'One command',
        time: '~5 min',
        body: 'Bring the stack up with Docker. Zero configuration: OwlTable arrives pre-configured with a demo admin account — no setup wizard.',
        detail: 'docker compose -f docker-compose.eval.yml up',
    },
    {
        icon: MonitorPlay,
        title: 'Log in to the guided dashboard',
        time: '~1 min',
        body: 'Open the UI and sign in with the demo admin account. A realistic fintech sample database is already registered as a read-only source, next to an empty eval target.',
        detail: 'http://localhost:9070/owltable-ui  ·  admin / owltable-eval',
    },
    {
        icon: ShieldCheck,
        title: 'Walk the golden path',
        time: '~8 min',
        body: 'Run PII Discovery on the sample source, launch a masking job, compare source vs target — then download the Evidence Pack from the job detail page. That pack is the artifact to hand to your security team.',
        detail: null,
    },
];

const included = [
    'OwlTable pre-configured with a demo admin account — no setup wizard',
    'A realistic, seeded fintech sample database as the read-only source',
    'An empty target database, pre-registered for the masking job',
    'The masking API for PII detection and anonymisation',
    'The same readiness enforcement and safety rails as production',
];

export default function GetStarted() {
    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-16">
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'HowTo',
                    name: 'Evaluate OwlTable in 15 minutes',
                    description: 'Run the OwlTable evaluation bundle with one docker compose command and walk a guided golden path from PII discovery to an auditor-ready evidence pack.',
                    totalTime: 'PT15M',
                    step: steps.map((step, index) => ({
                        '@type': 'HowToStep',
                        position: index + 1,
                        name: step.title,
                        text: step.body,
                    })),
                }}
            />
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen opacity-50" />
                <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] mix-blend-screen opacity-40" />
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 pt-12">
                    <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-bold tracking-[.14em] text-cyan-200 mb-6">GET STARTED</div>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Prove it masks correctly —{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">in 15 minutes</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        The eval bundle runs entirely on your machine: one command, a seeded sample database, and a guided path that ends with an auditor-ready evidence pack. Nothing leaves your laptop.
                    </p>
                </div>

                <ol className="space-y-4 mb-16">
                    {steps.map((step, index) => (
                        <li key={step.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7">
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/15 text-lg font-bold text-cyan-300">{index + 1}</div>
                                <step.icon className="h-6 w-6 text-cyan-300" aria-hidden="true" />
                                <h2 className="text-xl font-bold text-white">{step.title}</h2>
                                <span className="ml-auto rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-400">{step.time}</span>
                            </div>
                            <p className="mt-4 leading-7 text-gray-400">{step.body}</p>
                            {step.detail ? (
                                <pre className="mt-4 overflow-x-auto rounded-lg border border-zinc-800 bg-black/60 px-5 py-4 font-mono text-sm text-cyan-200">{step.detail}</pre>
                            ) : null}
                        </li>
                    ))}
                </ol>

                <div className="grid gap-8 md:grid-cols-2 mb-16">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
                        <Container className="mb-5 h-8 w-8 text-cyan-300" />
                        <h3 className="text-xl font-bold mb-4">What’s in the box</h3>
                        <ul className="space-y-3">
                            {included.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-gray-300">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
                        <Database className="mb-5 h-8 w-8 text-blue-300" />
                        <h3 className="text-xl font-bold mb-4">Then point it at your own schema</h3>
                        <p className="text-sm leading-7 text-gray-400">
                            The eval stack is disposable, but it’s the real product — eval mode only pre-seeds and pre-configures, while readiness enforcement and safety rails behave exactly as in production. When the golden path checks out, register your own PostgreSQL, MySQL, or SQL Server source with a read-only account and run the same flow against a schema you actually care about.
                        </p>
                        <p className="mt-4 text-sm leading-7 text-gray-500">
                            Security note: the bundle ships eval-only default credentials so it works with a single command. Treat it as a disposable evaluation environment.
                        </p>
                    </div>
                </div>

                <div className="text-center bg-gradient-to-b from-cyan-900/20 to-transparent border border-cyan-500/20 rounded-3xl p-12 relative overflow-hidden">
                    <div className="relative z-10">
                        <FileCheck2 className="mx-auto mb-5 h-9 w-9 text-cyan-300" />
                        <h2 className="text-4xl font-bold mb-4">Fifteen minutes to an evidence pack.</h2>
                        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                            Request the bundle now — or watch the golden path on video first.
                        </p>
                        <div className="flex flex-col justify-center gap-3 sm:flex-row">
                            <a href="mailto:founder@owlmask.com?subject=Eval%20bundle%20request" className="inline-block bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-4 rounded-xl transition-transform hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.35)]">
                                Request the eval bundle
                            </a>
                            <Link href="/#videos" className="inline-flex items-center justify-center gap-2 border border-white/15 hover:bg-white/[0.06] text-white font-bold px-8 py-4 rounded-xl transition-colors">
                                <PlayCircle className="h-5 w-5 text-cyan-300" /> Watch the videos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
