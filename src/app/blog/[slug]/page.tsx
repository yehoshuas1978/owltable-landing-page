import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, articles } from '@/lib/articles';
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';

type Props = {
    params: { slug: string };
};

// Next.js static params generation
export async function generateStaticParams() {
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

// Next.js dynamic metadata generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const article = getArticleBySlug(params.slug);

    if (!article) {
        return {
            title: 'Article Not Found',
        };
    }

    const url = `https://www.owltable.net/blog/${article.slug}`;

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
            images: article.coverImage ? [
                {
                    url: article.coverImage,
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
            images: article.coverImage ? [article.coverImage] : [],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const article = getArticleBySlug(params.slug);

    if (!article) {
        notFound();
    }

    // Dynamic import of the article content component
    let ContentComponent;
    try {
        // Because of Next.js App Router rules, we use React.lazy or direct require. 
        // For server components, direct import via await is possible if we had separate files, 
        // but dynamic imports with string concatenation can be tricky in some Next setups.
        // A safer approach for SEO is mapping or just a simple switch, but for now we will 
        // use dynamic import.
        ContentComponent = (await import(`@/components/articles/${article.slug}`)).default;
    } catch (e) {
        ContentComponent = () => (
            <div style={{ padding: '2rem', backgroundColor: '#fff3cd', color: '#856404', borderRadius: '8px' }}>
                Article content component not found. Please create <code>src/components/articles/{article.slug}.tsx</code>
            </div>
        );
    }

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.description,
        image: article.coverImage ? [`https://www.owltable.net${article.coverImage}`] : [],
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
        <article style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <JsonLd data={articleJsonLd} />
            <JsonLd data={breadcrumbData} />

            <nav style={{ marginBottom: '2rem' }}>
                <Link href="/blog" style={{ color: '#3182ce', textDecoration: 'none', fontWeight: '500' }}>
                    &larr; Back to Blog
                </Link>
            </nav>

            <header style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    {article.tags.map((tag) => (
                        <span key={tag} style={{ backgroundColor: '#edf2f7', color: '#4a5568', fontSize: '0.875rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontWeight: '500' }}>
                            {tag}
                        </span>
                    ))}
                </div>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1.2, color: '#1a202c', marginBottom: '1.5rem' }}>
                    {article.title}
                </h1>
                
                <div style={{ display: 'flex', alignItems: 'center', color: '#718096', fontSize: '1rem' }}>
                    <div style={{ fontWeight: '600', color: '#2d3748', marginRight: '1rem' }}>{article.author}</div>
                    <time dateTime={article.publishDate}>
                        {new Date(article.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </time>
                    {article.timeToRead && (
                        <>
                            <span style={{ margin: '0 0.5rem' }}>&middot;</span>
                            <span>{article.timeToRead} read</span>
                        </>
                    )}
                </div>
            </header>

            {article.coverImage && (
                <div style={{ marginBottom: '3rem', borderRadius: '12px', overflow: 'hidden' }}>
                    <img src={article.coverImage} alt={article.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
            )}

            <div className="article-content" style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#2d3748' }}>
                <ContentComponent />
            </div>
            
            <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                <p style={{ color: '#718096' }}>Thanks for reading. Build secure test environments with <Link href="/" style={{ color: '#3182ce', textDecoration: 'none', fontWeight: '600' }}>OwlTable</Link>.</p>
            </footer>
        </article>
    );
}
