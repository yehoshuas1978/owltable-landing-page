import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { articles } from '@/lib/articles';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'Blog & Resources | OwlTable',
    description: 'Explore our latest articles, guides, and videos on data masking, security, and the OwlTable platform.',
    openGraph: {
        title: 'Blog & Resources | OwlTable',
        description: 'Explore our latest articles, guides, and videos on data masking, security, and the OwlTable platform.',
        url: 'https://www.owltable.net/blog',
        type: 'website',
    },
};

export default function BlogIndex() {
    const collectionPageData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Blog & Resources | OwlTable',
        description: 'Explore our latest articles, guides, and videos on data masking, security, and the OwlTable platform.',
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
        <main className="container mx-auto px-4 py-16" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem' }}>
            <JsonLd data={collectionPageData} />
            <JsonLd data={breadcrumbData} />
            
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1a202c' }}>OwlTable Resources</h1>
                <p style={{ fontSize: '1.25rem', color: '#4a5568', maxWidth: '600px', margin: '0 auto' }}>
                    Insights, tutorials, and updates on enterprise data masking and security.
                </p>
            </header>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {articles.map((article) => (
                    <article key={article.slug} style={{ 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '12px', 
                        overflow: 'hidden', 
                        transition: 'box-shadow 0.3s ease',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Link href={`/blog/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                            {article.coverImage ? (
                                <div style={{ height: '200px', backgroundImage: `url(${article.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                            ) : (
                                <div style={{ height: '200px', backgroundColor: '#edf2f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ color: '#a0aec0', fontSize: '1.5rem', fontWeight: 'bold' }}>OwlTable</span>
                                </div>
                            )}
                            <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                    {article.tags.map((tag) => (
                                        <span key={tag} style={{ backgroundColor: '#ebf4ff', color: '#3182ce', fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontWeight: '600' }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#2d3748', lineHeight: 1.2 }}>{article.title}</h2>
                                <p style={{ color: '#718096', marginBottom: '1.5rem', flexGrow: 1 }}>{article.description}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid #e2e8f0', paddingTop: '1rem', color: '#a0aec0', fontSize: '0.875rem' }}>
                                    <span>{new Date(article.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    {article.timeToRead && <span>{article.timeToRead} read</span>}
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </section>
        </main>
    );
}
