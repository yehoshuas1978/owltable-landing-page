import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { resources } from '@/lib/resources';
import { ArrowRight, CalendarDays, FileText } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Resources & Whitepapers | OwlTable',
    description: 'Download our latest whitepapers, guides, and case studies on data masking and security.',
};

export default function ResourcesIndex() {
    return (
        <main className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
            <header className="mx-auto mb-12 max-w-3xl text-center">
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
                    Resource Library
                </p>
                <h1 className="text-4xl font-bold tracking-normal text-white sm:text-5xl">Whitepapers & Guides</h1>
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                    In-depth resources to help you secure your databases and achieve compliance.
                </p>
            </header>

            <section className="grid gap-6 md:grid-cols-2">
                {resources.map((resource) => (
                    <article
                        key={resource.slug}
                        className="flex min-h-[320px] flex-col rounded-lg border border-white/10 bg-white/[0.03] p-6 shadow-xl shadow-black/20 transition-colors hover:border-cyan-300/40"
                    >
                        <div className="mb-5 flex flex-wrap items-center gap-3">
                            <span className="rounded-full border border-rose-300/30 bg-rose-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-rose-200">
                                {resource.type}
                            </span>
                            {resource.readTime ? (
                                <span className="inline-flex items-center gap-2 text-sm text-slate-400">
                                    <FileText size={16} aria-hidden="true" />
                                    {resource.readTime}
                                </span>
                            ) : null}
                        </div>
                        <h2 className="text-2xl font-semibold leading-snug tracking-normal text-white">{resource.title}</h2>
                        <p className="mt-4 flex-grow leading-7 text-slate-300">{resource.description}</p>
                        <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                            <span className="inline-flex items-center gap-2 text-sm text-slate-400">
                                <CalendarDays size={16} aria-hidden="true" />
                                {new Intl.DateTimeFormat('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                }).format(new Date(resource.publishDate))}
                            </span>
                            <Link
                                href={`/resources/${resource.slug}`}
                                className="inline-flex items-center gap-2 rounded-md bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-300"
                            >
                                View
                                <ArrowRight size={16} aria-hidden="true" />
                            </Link>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}
