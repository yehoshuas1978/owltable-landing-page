'use client';

import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[140px]" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }}>
          <h2 className="text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">Stop copying production. Start provisioning safely.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Put OwlTable on your own infrastructure and take a real schema from raw copy to masked, validated, evidence-backed test data — inside your 30-day trial.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="mailto:founder@owlmask.com?subject=OwlTable%20guided%20trial" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-7 py-4 font-semibold text-white transition hover:bg-blue-400 hover:shadow-[0_0_34px_rgba(59,130,246,.4)]">
              Request a guided trial <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#videos" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-7 py-4 font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/[0.08]">
              <PlayCircle className="h-5 w-5 text-cyan-300" /> Watch it work first
            </a>
          </div>
          <p className="mt-7 text-sm text-slate-500">30-day trial · runs on your infrastructure · founder-led onboarding · no auto-renewal</p>
        </motion.div>
      </div>
    </section>
  );
}
