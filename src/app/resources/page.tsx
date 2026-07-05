import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { resources } from '@/lib/resources';

export const metadata: Metadata = {
    title: 'Resources & Whitepapers | OwlTable',
    description: 'Download our latest whitepapers, guides, and case studies on data masking and security.',
};

export default function ResourcesIndex() {
    return (
        <main className="container mx-auto px-4 py-16" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1a202c' }}>Whitepapers & Guides</h1>
                <p style={{ fontSize: '1.25rem', color: '#4a5568', maxWidth: '600px', margin: '0 auto' }}>
                    In-depth resources to help you secure your databases and achieve compliance.
                </p>
            </header>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {resources.map((resource) => (
                    <article key={resource.slug} style={{ 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '12px', 
                        padding: '1.5rem',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <span style={{ backgroundColor: '#fed7d7', color: '#c53030', fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                {resource.type}
                            </span>
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#2d3748', lineHeight: 1.2 }}>{resource.title}</h2>
                        <p style={{ color: '#718096', marginBottom: '1.5rem', flexGrow: 1 }}>{resource.description}</p>
                        <Link href={`/resources/${resource.slug}`} style={{ display: 'block', textAlign: 'center', backgroundColor: '#3182ce', color: 'white', padding: '0.75rem 1rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', marginTop: 'auto' }}>
                            View Resource
                        </Link>
                    </article>
                ))}
            </section>
        </main>
    );
}
