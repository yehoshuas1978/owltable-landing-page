'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Database, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

const workflowSteps = [
  { label: 'Connect production safely', tone: 'bg-slate-400' },
  { label: 'Build a provisioning job', tone: 'bg-blue-400' },
  { label: 'Mask, subset, and validate', tone: 'bg-violet-400' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-52 left-[10%] h-[38rem] w-[38rem] rounded-full bg-blue-600/20 blur-[150px]" />
        <div className="absolute top-24 right-[4%] h-[30rem] w-[30rem] rounded-full bg-violet-600/20 blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.03fr_.97fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-sm font-medium text-blue-100 shadow-[0_0_36px_rgba(59,130,246,.12)]">
            <Sparkles className="h-4 w-4 text-blue-300" />
            OwlMask platform · led by OwlTable
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.03] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
            Safe data for every team that needs to build with it.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            <strong className="font-semibold text-white">OwlTable</strong> gives data teams a clear, governed way to provision realistic test databases—then OwlMask SDKs, local AI, and automation extend that control into engineering workflows.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#owltable" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-400 hover:shadow-[0_0_34px_rgba(59,130,246,.4)]">
              Explore OwlTable <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="mailto:founder@owlmask.com?subject=OwlTable%20guided%20trial" className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/[0.08]">
              Request a guided trial
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Jobs-first workflow</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Readiness before execution</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Evidence after completion</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.12, ease: 'easeOut' }}
          className="relative"
        >
          <div className="absolute -inset-5 rounded-[2rem] bg-blue-500/15 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1425]/90 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-3 text-sm font-medium text-slate-300">OwlTable · Provisioning job</span>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">READY</span>
            </div>
            <div className="grid gap-4 p-5 sm:p-6">
              <div className="rounded-xl border border-blue-300/15 bg-gradient-to-r from-blue-500/15 to-violet-500/10 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-400/15 p-2"><Database className="h-5 w-5 text-blue-300" /></div>
                    <div><p className="font-semibold text-white">Production → test environment</p><p className="mt-0.5 text-sm text-slate-400">customer-platform / nightly refresh</p></div>
                  </div>
                  <div className="hidden text-right sm:block"><p className="text-xs text-slate-500">Target</p><p className="text-sm font-medium text-slate-200">sandbox-eu-01</p></div>
                </div>
              </div>
              <div className="grid gap-2">
                {workflowSteps.map((step, index) => (
                  <div key={step.label} className="flex items-center gap-3 rounded-lg bg-white/[0.035] px-3 py-2.5">
                    <span className={`h-2 w-2 rounded-full ${step.tone}`} />
                    <span className="flex-1 text-sm text-slate-200">{step.label}</span>
                    <span className="text-xs text-slate-500">0{index + 1}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  ['Masked', '12 columns'],
                  ['Integrity', 'Verified'],
                  ['Evidence', 'Available'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-white/[0.07] bg-black/20 p-3">
                    <p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-sm font-semibold text-slate-100">{value}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Operational checks are assessed before the job starts.</div>
            </div>
          </div>
          <Link href="/compare/delphix-alternative" className="mt-4 inline-flex text-sm font-medium text-blue-300 hover:text-blue-200">See how OwlTable fits modern data provisioning →</Link>
        </motion.div>
      </div>
    </section>
  );
}
