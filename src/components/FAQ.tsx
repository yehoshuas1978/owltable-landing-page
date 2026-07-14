'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import JsonLd from './JsonLd';

const faqs = [
  {
    q: 'Where does OwlMask run — does my data leave my network?',
    a: 'Everything installs on your own servers. OwlTable connects to your databases from inside your network, and OwlMask LLM runs its models locally. No production data is sent to us or to any external AI API.',
  },
  {
    q: 'Which databases are supported?',
    a: 'OwlTable provisions, masks, and subsets PostgreSQL, MySQL, and SQL Server. The same jobs-first workflow — connect, discover PII, mask, validate — works across all three engines.',
  },
  {
    q: 'Will masked data still work for testing and analytics?',
    a: 'Yes — that is the point of the algorithm design. Format-preserving values pass application validation, deterministic masking maps the same input to the same output everywhere, and foreign keys are remapped consistently so joins, reports, and test suites keep working.',
  },
  {
    q: 'Can a masking job damage my production database?',
    a: 'Sources are read with a read-only account, and every operational job is gated by a readiness assessment covering permissions, prerequisites, backups, and destructive impact. Blocking failures stop the run in the backend before a single row changes.',
  },
  {
    q: 'How do I prove to an auditor that the data is clean?',
    a: 'After each job, the validation workflow re-scans the output with the same PII discovery engine that scanned the source, and OwlTable bundles the results — rule coverage, job history, validation reports — into a downloadable evidence pack.',
  },
  {
    q: 'How does the 30-day trial work?',
    a: 'Request a trial on any package and we email you a secure 30-day key — a founder-led process, not an automated funnel. You install on your own infrastructure, validate against your real schemas, and if it fits we invoice via Stripe. No auto-renewals.',
  },
  {
    q: 'Do I need the whole suite, or can I start small?',
    a: 'Start with OwlTable, the flagship provisioning platform — it covers discovery, masking, subsetting, and validation end to end. Add OwlMask SDK for in-app masking, OwlMask LLM for free-text PII, or OwlMask Code for automated policy configuration when you need them.',
  },
  {
    q: 'What about PII hiding in free-text and JSON columns?',
    a: 'Structured classifiers catch typed columns; OwlMask LLM handles the rest — notes, tickets, JSON blobs — with local generative masking, and anything uncertain lands in a human review queue instead of being silently skipped.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-28">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
          })),
        }}
      />
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} className="text-center">
          <div className="inline-flex rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1 text-xs font-bold tracking-[.14em] text-blue-200">FAQ</div>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">The questions every evaluation asks.</h2>
        </motion.div>

        <div className="mt-12 divide-y divide-white/[0.07] rounded-2xl border border-white/10 bg-white/[0.02]">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div key={faq.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-white/[0.03]"
                >
                  <span className="font-semibold text-white">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <p className="px-6 pb-6 leading-7 text-slate-300">{faq.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
