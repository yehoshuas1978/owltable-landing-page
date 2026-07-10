'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Braces, CheckCircle2, DatabaseBackup, FileCheck2, Network, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const capabilities = [
  { icon: DatabaseBackup, title: 'Provision realistic targets', text: 'Prepare managed test environments from production-shaped data with a deliberate, Jobs-first workflow.' },
  { icon: ShieldCheck, title: 'Mask without losing relationships', text: 'Apply privacy controls while preserving the integrity that applications and test suites depend on.' },
  { icon: FileCheck2, title: 'Finish with evidence', text: 'Review validation, proof samples, audit details, and integrity reporting after the job completes.' },
];

export default function OwlTableSpotlight() {
  return (
    <section id="owltable" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,.14),transparent_62%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <motion.div initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-90px' }}>
            <div className="inline-flex rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1 text-xs font-bold tracking-[.14em] text-blue-200">THE OWLMASK PLATFORM</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">Meet OwlTable—the place your safe data workflow lives.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">OwlTable is the center of the ecosystem: connection-aware planning, execution readiness, provisioning, masking, relational subsetting, and verification in one operational surface.</p>
            <div className="mt-8 space-y-4">
              {['Keep Jobs primary and validation visible beside the outcome.', 'Block unsafe execution in the backend—not merely with a UI warning.', 'Work across PostgreSQL, MySQL, and SQL Server environments.'].map((item) => (
                <div key={item} className="flex gap-3 text-slate-200"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />{item}</div>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#pricing" className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-blue-50">View OwlTable options <ArrowRight className="h-4 w-4" /></a>
              <Link href="/docs/intro" className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 font-semibold text-slate-100 transition hover:bg-white/[0.06]">Read the documentation</Link>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3 lg:pt-2">
            {capabilities.map((capability, index) => (
              <motion.article key={capability.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ delay: index * 0.1 }} className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-blue-300/30 hover:bg-white/[0.06]">
                <div className="inline-flex rounded-xl bg-blue-400/10 p-3 text-blue-300"><capability.icon className="h-6 w-6" /></div>
                <h3 className="mt-7 text-xl font-semibold text-white">{capability.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{capability.text}</p>
              </motion.article>
            ))}
            <div className="sm:col-span-3 rounded-2xl border border-violet-300/15 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-transparent p-6 sm:flex sm:items-center sm:justify-between">
              <div className="flex items-center gap-4"><div className="rounded-xl bg-violet-400/10 p-3 text-violet-200"><Network className="h-6 w-6" /></div><div><p className="font-semibold text-white">Designed for the full delivery path</p><p className="mt-1 text-sm text-slate-400">From connection setup to validated target data.</p></div></div>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-violet-200 sm:mt-0"><Braces className="h-4 w-4" /> UI + APIs + SDKs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
