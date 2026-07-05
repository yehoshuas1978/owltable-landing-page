import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getResourceBySlug, resources } from '@/lib/resources';
import Link from 'next/link';

type Props = {
    params: { slug: string };
};

export async function generateStaticParams() {
    return resources.map((resource) => ({
        slug: resource.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resource = getResourceBySlug(params.slug);
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

export default function ResourceLandingPage({ params }: Props) {
    const resource = getResourceBySlug(params.slug);

    if (!resource) {
        notFound();
    }

    return (
        <article style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <nav style={{ marginBottom: '2rem' }}>
                <Link href="/resources" style={{ color: '#3182ce', textDecoration: 'none', fontWeight: '500' }}>
                    &larr; Back to Resources
                </Link>
            </nav>

            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <span style={{ backgroundColor: '#fed7d7', color: '#c53030', fontSize: '0.875rem', padding: '0.25rem 1rem', borderRadius: '9999px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        {resource.type}
                    </span>
                </div>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1.2, color: '#1a202c', marginBottom: '1.5rem' }}>
                    {resource.title}
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#4a5568' }}>
                    {resource.description}
                </p>
            </header>

            <div style={{ backgroundColor: '#f7fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '2rem', textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#2d3748' }}>Download the {resource.type}</h2>
                <p style={{ color: '#718096', marginBottom: '2rem' }}>Click the button below to view or download the PDF document.</p>
                <a href={resource.pdfUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#3182ce', color: 'white', padding: '1rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.125rem', transition: 'background-color 0.2s ease' }}>
                    Download PDF
                </a>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#a0aec0' }}>Published: {new Date(resource.publishDate).toLocaleDateString()}</p>
            </div>
            
            <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                <p style={{ color: '#718096' }}>Thanks for reading. Build secure test environments with <Link href="/" style={{ color: '#3182ce', textDecoration: 'none', fontWeight: '600' }}>OwlTable</Link>.</p>
            </footer>
        </article>
    );
}
