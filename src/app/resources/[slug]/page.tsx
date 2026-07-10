import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getResourceBySlug, resources } from '@/lib/resources';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, CheckCircle2, Download, FileText, ShieldCheck } from 'lucide-react';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return resources.map((resource) => ({
        slug: resource.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const resource = getResourceBySlug(slug);
    if (!resource) return { title: 'Resource Not Found' };

    return {
        title: `${resource.title} | OwlTable Resources`,
        description: resource.description,
        openGraph: {
            title: resource.title,
            description: resource.description,
            type: 'website',
            url: `https://www.owltable.net/resources/${resource.slug}`,
        }
    };
}

export default async function ResourceLandingPage({ params }: Props) {
    const { slug } = await params;
    const resource = getResourceBySlug(slug);

    if (!resource) {
        notFound();
    }

    const publishedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(resource.publishDate));

    return (
        <main className="mx-auto w-full max-w-[1180px] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
            <nav className="mb-12">
                <Link
                    href="/resources"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-white"
                >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Back to Resources
                </Link>
            </nav>

            <article className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
                <section>
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-rose-300/30 bg-rose-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-rose-200">
                            {resource.type}
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm text-slate-400">
                            <CalendarDays size={16} aria-hidden="true" />
                            {publishedDate}
                        </span>
                        {resource.readTime ? (
                            <span className="inline-flex items-center gap-2 text-sm text-slate-400">
                                <FileText size={16} aria-hidden="true" />
                                {resource.readTime}
                            </span>
                        ) : null}
                    </div>

                    <header className="max-w-3xl">
                        <h1 className="text-4xl font-bold leading-tight tracking-normal text-white sm:text-5xl">
                            {resource.title}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-slate-300 sm:text-xl">
                            {resource.description}
                        </p>
                    </header>

                    {resource.highlights?.length ? (
                        <section className="mt-10 rounded-lg border border-white/10 bg-white/[0.03] p-6">
                            <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                                <ShieldCheck size={20} className="text-emerald-300" aria-hidden="true" />
                                What you will get
                            </h2>
                            <ul className="mt-5 grid gap-4 sm:grid-cols-3">
                                {resource.highlights.map((highlight) => (
                                    <li key={highlight} className="flex gap-3 text-sm leading-6 text-slate-300">
                                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-cyan-300" aria-hidden="true" />
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ) : null}
                </section>

                <aside className="rounded-lg border border-white/10 bg-slate-950/80 p-5 shadow-2xl shadow-black/30">
                    <div className="rounded-md border border-slate-700 bg-slate-100 p-5 text-slate-950 shadow-inner">
                        <div className="mb-8 flex items-center justify-between border-b border-slate-300 pb-4">
                            <span className="text-sm font-bold text-slate-900">OwlTable</span>
                            <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-cyan-800">
                                PDF
                            </span>
                        </div>
                        <div className="space-y-3">
                            <div className="h-3 w-3/4 rounded bg-slate-900" />
                            <div className="h-3 w-5/6 rounded bg-slate-700" />
                            <div className="h-3 w-2/3 rounded bg-slate-500" />
                        </div>
                        <div className="mt-8 grid grid-cols-3 gap-2">
                            <div className="h-16 rounded bg-cyan-200" />
                            <div className="h-16 rounded bg-emerald-200" />
                            <div className="h-16 rounded bg-rose-200" />
                        </div>
                        <div className="mt-8 space-y-2">
                            <div className="h-2 rounded bg-slate-300" />
                            <div className="h-2 rounded bg-slate-300" />
                            <div className="h-2 w-4/5 rounded bg-slate-300" />
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-white">Download the {resource.type}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Open the polished PDF in a new tab, or use your browser controls to save it.
                        </p>
                        <a
                            href={resource.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-300"
                        >
                            <Download size={18} aria-hidden="true" />
                            Download PDF
                        </a>
                    </div>
                </aside>
            </article>

            <footer className="mt-16 border-t border-white/10 pt-8 text-center">
                <p className="text-sm text-slate-400">
                    Build secure test environments with{' '}
                    <Link href="/" className="font-semibold text-cyan-300 transition-colors hover:text-white">
                        OwlTable
                    </Link>
                    .
                </p>
            </footer>
        </main>
    );
}
