export type ArticleMetadata = {
    slug: string;
    title: string;
    description: string;
    author: string;
    publishDate: string; // ISO 8601 string, e.g., '2026-07-05T00:00:00Z'
    tags: string[];
    coverImage?: string;
    videoUrl?: string;
    videoTitle?: string;
    videoThumbnail?: string;
    externalVideoUrl?: string;
    externalVideoTitle?: string;
    timeToRead?: string;
};

export const articles: ArticleMetadata[] = [
    {
        slug: 'how-data-masking-protects-your-business',
        title: 'How Data Masking Protects Your Business from Breaches',
        description: 'Learn the fundamental concepts of data masking and why it is critical for compliance and security in modern enterprise applications.',
        author: 'OwlTable Security Team',
        publishDate: '2026-07-01T10:00:00Z',
        tags: ['Video', 'Security', 'Data Masking'],
        videoUrl: '/videos/data-masking-breaches.mp4',
        videoTitle: 'OwlTable Data Masking Security Overview',
        videoThumbnail: '/videos/data-masking-breaches.jpg',
        externalVideoUrl: 'https://www.youtube.com/embed/y9tPEzSZXmg',
        externalVideoTitle: 'Data Masking - Getting Started Tutorial | Enterprise Test Data',
        timeToRead: '5 min',
    },
    {
        slug: 'introducing-owlmask-video-guide',
        title: 'Introducing OwlMask: Product Walkthrough Guide',
        description: 'See how OwlMask simplifies database anonymization workflows from connection setup through validation.',
        author: 'OwlTable Product Team',
        publishDate: '2026-07-05T09:00:00Z',
        tags: ['Video', 'Tutorial', 'Product'],
        videoUrl: '/videos/owlmask-product-walkthrough.mp4',
        videoTitle: 'OwlMask Product Walkthrough',
        videoThumbnail: '/videos/owlmask-product-walkthrough.jpg',
        externalVideoUrl: 'https://www.youtube.com/embed/hn7m3ihiQwE',
        externalVideoTitle: 'Data Masking - Default Rules Tutorial | Enterprise Test Data',
        timeToRead: '10 min',
    },
    {
        slug: 'how-to-configure-postgresql-masking',
        title: 'How to Configure PostgreSQL Masking with OwlMask',
        description: 'Learn the steps to connect PostgreSQL to OwlMask and define masking rules to protect your PII.',
        author: 'OwlTable Engineering Team',
        publishDate: '2026-07-08T09:00:00Z',
        tags: ['Video', 'Tutorial', 'PostgreSQL'],
        videoUrl: '/videos/postgresql-masking.mp4',
        videoTitle: 'OwlTable PostgreSQL Masking Walkthrough',
        videoThumbnail: '/videos/postgresql-masking.jpg',
        externalVideoUrl: 'https://www.youtube.com/embed/niIIFL4s-L8',
        externalVideoTitle: 'Anonymization and Data Masking for PostgreSQL',
        timeToRead: '8 min',
    },
    {
        slug: 'owlmask-feature-overview',
        title: 'OwlMask 2.0 Feature Overview',
        description: 'Explore the new features in OwlMask 2.0 designed to streamline your data masking operations.',
        author: 'OwlTable Product Team',
        publishDate: '2026-07-09T10:00:00Z',
        tags: ['Video', 'Product', 'Release'],
        videoUrl: '/videos/owlmask-feature-overview.mp4',
        videoTitle: 'OwlMask 2.0 Feature Overview',
        videoThumbnail: '/videos/owlmask-feature-overview.jpg',
        externalVideoUrl: 'https://www.youtube.com/embed/s7tHhyxuXg4',
        externalVideoTitle: 'Dynamic Data Masking & Encryption for MySQL/PostgreSQL',
        timeToRead: '12 min',
    }
];

export function getArticleBySlug(slug: string): ArticleMetadata | undefined {
    return articles.find((article) => article.slug === slug);
}
