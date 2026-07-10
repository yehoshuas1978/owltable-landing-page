import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { articles, type ArticleMetadata } from '@/lib/articles';
import JsonLd from '@/components/JsonLd';
import { ArrowRight, CalendarDays, Clock, Database, FileCheck2, Play, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Blog & Resources | OwlTable',
    description: 'Explore our latest articles, guides, and tutorials on data masking, security, and the OwlTable platform.',
    openGraph: {
        title: 'Blog & Resources | OwlTable',
        description: 'Explore our latest articles, guides, and tutorials on data masking, security, and the OwlTable platform.',
        url: 'https://www.owltable.net/blog',
        type: 'website',
    },
};

function ArticlePreview({ article }: { article: ArticleMetadata }) {
    const previewImage = article.videoThumbnail || article.coverImage;
    const tag = article.tags.find((item) => item !== 'Video') || article.tags[0] || 'OwlTable';

    if (previewImage) {
        return (
            <div className="relative h-48 overflow-hidden border-b border-white/10 bg-slate-950">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${previewImage})` }}
                    aria-label={article.videoTitle || article.title}
                />
                <div className="absolute inset-0 bg-slate-950/35" />
                <span className="absolute left-5 top-5 rounded-full bg-cyan-100 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-cyan-800">
                    {tag}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400 text-lg font-black text-slate-950 shadow-xl shadow-black/40">
                        <Play size={24} fill="currentColor" aria-hidden="true" />
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="grid h-48 grid-cols-[1fr_1.1fr] border-b border-white/10 bg-slate-950">
            <div className="flex flex-col justify-between bg-slate-100 p-5 text-slate-950">
                <span className="w-fit rounded-full bg-cyan-100 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-cyan-800">
                    {tag}
                </span>
                <div>
                    <div className="mb-3 h-2.5 w-3/4 rounded bg-slate-900" />
                    <div className="h-2.5 w-1/2 rounded bg-slate-500" />
                </div>
            </div>
            <div className="flex items-center justify-center bg-slate-900 p-5">
                <div className="grid w-full max-w-[180px] gap-3 rounded-lg border border-cyan-300/20 bg-slate-800 p-4">
                    <div className="flex items-center gap-3">
                        <Database size={18} className="text-cyan-300" aria-hidden="true" />
                        <span className="h-2 flex-1 rounded bg-slate-500" />
                    </div>
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={18} className="text-emerald-300" aria-hidden="true" />
                        <span className="h-2 flex-1 rounded bg-slate-500" />
                    </div>
                    <div className="flex items-center gap-3">
                        <FileCheck2 size={18} className="text-rose-300" aria-hidden="true" />
                        <span className="h-2 flex-1 rounded bg-slate-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BlogIndex() {
    const collectionPageData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Blog & Resources | OwlTable',
        description: 'Explore our latest articles, guides, and tutorials on data masking, security, and the OwlTable platform.',
        url: 'https://www.owltable.net/blog',
    };

    const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.owltable.net/',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: 'https://www.owltable.net/blog',
            },
        ],
    };

    return (
        <main className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
            <JsonLd data={collectionPageData} />
            <JsonLd data={breadcrumbData} />

            <header className="mx-auto mb-12 max-w-3xl text-center">
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-cyan-300">
                    Blog
                </p>
                <h1 className="text-4xl font-bold tracking-normal text-white sm:text-5xl">OwlTable Resources</h1>
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                    Insights, tutorials, and updates on enterprise data masking and security.
                </p>
            </header>

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {articles.map((article) => (
                    <article
                        key={article.slug}
                        className="flex min-h-[360px] flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] shadow-xl shadow-black/20 transition-colors hover:border-cyan-300/40"
                    >
                        <Link href={`/blog/${article.slug}`} className="flex h-full flex-col text-inherit no-underline">
                            <ArticlePreview article={article} />

                            <div className="flex flex-grow flex-col p-6">
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {article.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h2 className="text-2xl font-semibold leading-snug tracking-normal text-white">{article.title}</h2>
                                <p className="mt-4 flex-grow leading-7 text-slate-300">{article.description}</p>
                                <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                                    <div className="flex flex-col gap-2 text-sm text-slate-400">
                                        <span className="inline-flex items-center gap-2">
                                            <CalendarDays size={16} aria-hidden="true" />
                                            {new Intl.DateTimeFormat('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            }).format(new Date(article.publishDate))}
                                        </span>
                                        {article.timeToRead ? (
                                            <span className="inline-flex items-center gap-2">
                                                <Clock size={16} aria-hidden="true" />
                                                {article.timeToRead} read
                                            </span>
                                        ) : null}
                                    </div>
                                    <span className="inline-flex items-center gap-2 rounded-md bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition-colors">
                                        Read
                                        <ArrowRight size={16} aria-hidden="true" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </section>
        </main>
    );
}
