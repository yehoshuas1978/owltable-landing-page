export type ResourceMetadata = {
    slug: string;
    title: string;
    description: string;
    type: 'Whitepaper' | 'Case Study' | 'Guide';
    publishDate: string;
    pdfUrl: string;
    coverImage?: string;
};

export const resources: ResourceMetadata[] = [
    {
        slug: 'definitive-guide-data-masking',
        title: 'The Definitive Guide to Enterprise Data Masking',
        description: 'Learn the techniques, costs, and compliance strategies surrounding modern data masking and database security.',
        type: 'Whitepaper',
        publishDate: '2026-07-05T08:00:00Z',
        pdfUrl: '/documents/whitepaper-data-masking.pdf',
    },
    {
        slug: 'achieving-compliance-data-obfuscation',
        title: 'Achieving SOC2 and HIPAA Compliance with Data Obfuscation',
        description: 'A deep dive into building a continuous compliance pipeline by substituting sensitive production data with masked data.',
        type: 'Guide',
        publishDate: '2026-07-02T09:00:00Z',
        pdfUrl: '/documents/guide-to-compliance.pdf',
    }
];

export function getResourceBySlug(slug: string): ResourceMetadata | undefined {
    return resources.find((resource) => resource.slug === slug);
}
