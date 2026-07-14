import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, articles } from '@/lib/articles';
import JsonLd from '@/components/JsonLd';
import SeoVideo from '@/components/SeoVideo';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Clock, UserRound } from 'lucide-react';

type Props = {
    params: Promise<{ slug: string }>;
};

function MissingArticleContent({ missingComponentPath }: { missingComponentPath: string }) {
    return (
        <div className="rounded-lg border border-amber-300/30 bg-amber-400/10 p-6 text-amber-100">
            Article content component not found. Please create{' '}
            <code>{missingComponentPath}</code>
        </div>
    );
}

export async function generateStaticParams() {
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const article = getArticleBySlug(slug);

    if (!article) {
        return {
            title: 'Article Not Found',
        };
    }

    const url = `https://www.owltable.net/blog/${article.slug}`;
    const previewImage = article.coverImage || article.videoThumbnail;

    return {
        title: `${article.title} | OwlTable Blog`,
        description: article.description,
        authors: [{ name: article.author }],
        openGraph: {
            title: article.title,
            description: article.description,
            type: 'article',
            url: url,
            publishedTime: article.publishDate,
            authors: [article.author],
            tags: article.tags,
            images: previewImage ? [
                {
                    url: previewImage,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                }
            ] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.description,
            images: previewImage ? [previewImage] : [],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    const articleSlug = article.slug;
    const missingComponentPath = `src/components/articles/${articleSlug}.tsx`;
    let ContentComponent;
    try {
        ContentComponent = (await import(`@/components/articles/${articleSlug}`)).default;
    } catch {
        ContentComponent = MissingArticleContent;
    }

    const publishedDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(article.publishDate));

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.description,
        image: article.coverImage || article.videoThumbnail ? [`https://www.owltable.net${article.coverImage || article.videoThumbnail}`] : [],
        datePublished: article.publishDate,
        dateModified: article.publishDate,
        author: {
            '@type': 'Person',
            name: article.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'OwlTable',
            logo: {
                '@type': 'ImageObject',
                url: 'https://www.owltable.net/icon.jpg',
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.owltable.net/blog/${article.slug}`,
        }
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
            {
                '@type': 'ListItem',
                position: 3,
                name: article.title,
                item: `https://www.owltable.net/blog/${article.slug}`,
            }
        ],
    };

    return (
        <main className="mx-auto w-full max-w-[940px] px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
            <JsonLd data={articleJsonLd} />
            <JsonLd data={breadcrumbData} />

            <nav className="mb-12">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-white"
                >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Back to Blog
                </Link>
            </nav>

            <article>
                <header className="mb-12">
                    <div className="mb-6 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl font-bold leading-tight tracking-normal text-white sm:text-5xl">
                        {article.title}
                    </h1>

                    <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-400">
                        <span className="inline-flex items-center gap-2 font-semibold text-slate-300">
                            <UserRound size={16} aria-hidden="true" />
                            {article.author}
                        </span>
                        <time dateTime={article.publishDate} className="inline-flex items-center gap-2">
                            <CalendarDays size={16} aria-hidden="true" />
                            {publishedDate}
                        </time>
                        {article.timeToRead ? (
                            <span className="inline-flex items-center gap-2">
                                <Clock size={16} aria-hidden="true" />
                                {article.timeToRead} read
                            </span>
                        ) : null}
                    </div>
                </header>

                {article.videoUrl ? (
                    <SeoVideo
                        title={article.videoTitle || article.title}
                        description={article.description}
                        uploadDate={article.publishDate}
                        videoUrl={article.videoUrl}
                        thumbnailUrl={article.videoThumbnail}
                        duration={article.videoDuration}
                    />
                ) : article.coverImage ? (
                    <div
                        className="mb-12 aspect-video rounded-lg border border-white/10 bg-slate-900 bg-cover bg-center shadow-2xl shadow-black/30"
                        style={{ backgroundImage: `url(${article.coverImage})` }}
                        aria-label={article.title}
                    />
                ) : null}

                <div className="article-content text-lg leading-8 text-slate-300">
                    <ContentComponent missingComponentPath={missingComponentPath} />
                </div>

                <footer className="mt-16 border-t border-white/10 pt-8 text-center">
                    <p className="text-sm text-slate-400">
                        Build secure test environments with{' '}
                        <Link href="/" className="font-semibold text-cyan-300 transition-colors hover:text-white">
                            OwlTable
                        </Link>
                        .
                    </p>
                </footer>
            </article>
        </main>
    );
}
