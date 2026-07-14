'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Container, Handshake, UserRound } from 'lucide-react';
import Link from 'next/link';

const offers = [
  {
    icon: Container,
    title: 'Evaluate in minutes, on your machine',
    text: 'Request the eval bundle and docker compose up brings OwlTable to life with a guided golden-path dashboard — connect, discover, mask, validate on sample data. No production access, nothing leaves your laptop.',
    href: '/get-started',
    linkLabel: 'See the 15-minute walkthrough',
  },
  {
    icon: Handshake,
    title: 'Design-partner terms',
    text: 'Early adopters lock in early pricing and get real influence on the roadmap — the next engine features are prioritized with our first users. In exchange we ask for honest feedback, and a reference only if the product earns it.',
  },
  {
    icon: UserRound,
    title: 'Founder-led onboarding',
    text: 'Every trial is hands-on with the person who built the product. First session: your schema connected, your first masking profile built, your first validated output — together.',
  },
];

export default function EarlyAccess() {
  return (
    <section id="early-access" className="relative py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(167,139,250,.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} className="max-w-3xl">
          <div className="inline-flex rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-1 text-xs font-bold tracking-[.14em] text-violet-200">EARLY ACCESS</div>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">You won’t find customer logos here — yet.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            OwlMask is early, and we’d rather say so than fake it. What we can show you is the product itself — in the videos above, and running on your own machine within the hour. Being early is the advantage: the terms below don’t survive a logo wall.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <motion.article
              key={offer.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-7 transition hover:border-violet-300/30 hover:bg-white/[0.06]"
            >
              <div className="inline-flex rounded-xl bg-violet-400/10 p-3 text-violet-300"><offer.icon className="h-6 w-6" /></div>
              <h3 className="mt-6 text-xl font-semibold text-white">{offer.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{offer.text}</p>
              {'href' in offer && offer.href ? (
                <Link href={offer.href} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-300 transition hover:text-violet-200">
                  {offer.linkLabel} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : null}
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          className="mt-10 flex flex-col gap-6 rounded-2xl border border-white/10 bg-gradient-to-r from-violet-500/[0.08] via-blue-500/[0.06] to-transparent p-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <blockquote className="max-w-2xl">
            <p className="text-lg leading-8 text-slate-200">
              “I built OwlTable because copying production into staging is how breaches happen, and the existing tools were either enterprise theatre or shell scripts. If you try it, you’ll work directly with me — and if it isn’t a fit for your stack, I’ll tell you that too.”
            </p>
            <footer className="mt-3 text-sm font-semibold text-violet-300">— Founder, OwlMask</footer>
          </blockquote>
          <a
            href="mailto:founder@owlmask.com?subject=Design%20partner%20%2B%20eval%20bundle"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-500 px-6 py-3.5 font-semibold text-white transition hover:bg-violet-400 hover:shadow-[0_0_34px_rgba(139,92,246,.4)]"
          >
            Become a design partner <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
