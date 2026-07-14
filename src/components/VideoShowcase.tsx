'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock3, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import JsonLd from './JsonLd';

const featuredVideo = {
  title: 'How Data Masking Works in OwlMask — Full Walkthrough',
  description: 'Connect a source database, discover PII, apply masking rules, preserve referential integrity, and validate the result — the entire OwlMask workflow in under three minutes.',
  src: '/videos/owlmask-masking-explainer.mp4',
  poster: '/videos/owlmask-masking-explainer.jpg',
  duration: 'PT2M42S',
  durationLabel: '2:42',
};

const deepDives = [
  {
    title: 'Security deep-dive',
    text: 'Why unmasked test environments are breach material — and the guardrails that fix it.',
    href: '/blog/how-data-masking-protects-your-business',
    duration: '5:00',
    thumbnail: '/videos/data-masking-security-deepdive.jpg',
  },
  {
    title: 'PostgreSQL tutorial',
    text: 'Eleven concrete steps from raw production copy to masked, verified staging.',
    href: '/blog/how-to-configure-postgresql-masking',
    duration: '5:00',
    thumbnail: '/videos/postgresql-masking-tutorial.jpg',
  },
  {
    title: 'Platform feature tour',
    text: 'Jobs, discovery, subsetting, synthetic data, scheduling, validation — all ten features.',
    href: '/blog/owlmask-feature-overview',
    duration: '5:00',
    thumbnail: '/videos/owltable-feature-tour.jpg',
  },
];

export default function VideoShowcase() {
  return (
    <section id="videos" className="relative py-24 sm:py-28">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: featuredVideo.title,
          description: featuredVideo.description,
          thumbnailUrl: `https://www.owltable.net${featuredVideo.poster}`,
          contentUrl: `https://www.owltable.net${featuredVideo.src}`,
          duration: featuredVideo.duration,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,.08),transparent_58%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} className="max-w-2xl">
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-bold tracking-[.14em] text-cyan-200">WATCH</div>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-.045em] text-white sm:text-5xl">See the whole workflow in minutes.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">Short, chaptered explainers — how masking is done, step by step, with the guardrails and proof included.</p>
        </motion.div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.25fr_.75fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }}>
            <video
              className="aspect-video w-full rounded-2xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/40"
              controls
              playsInline
              preload="metadata"
              poster={featuredVideo.poster}
              aria-label={featuredVideo.title}
            >
              <source src={featuredVideo.src} type="video/mp4" />
            </video>
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-200">{featuredVideo.title}</p>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300"><Clock3 className="h-3.5 w-3.5" /> {featuredVideo.durationLabel}</span>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {deepDives.map((video, index) => (
              <motion.div key={video.href} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ delay: index * 0.08 }}>
                <Link href={video.href} className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/[0.06]">
                  <div className="relative hidden w-28 shrink-0 overflow-hidden rounded-lg border border-white/10 sm:block">
                    {/* eslint-disable-next-line @next/next/no-img-element -- static poster thumbnails, no optimization needed */}
                    <img src={video.thumbnail} alt="" className="aspect-video w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition group-hover:bg-black/10">
                      <PlayCircle className="h-6 w-6 text-white/90" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">{video.title}</h3>
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-[11px] font-semibold text-slate-400"><Clock3 className="h-3 w-3" /> {video.duration}</span>
                    </div>
                    <p className="mt-1.5 text-sm leading-6 text-slate-400">{video.text}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-cyan-300">Watch the video <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
