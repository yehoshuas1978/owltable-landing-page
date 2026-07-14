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
    videoDuration?: string; // ISO 8601 duration, e.g., 'PT2M42S'
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
        videoUrl: '/videos/data-masking-security-deepdive.mp4',
        videoTitle: 'How Data Masking Protects Your Business — Security Deep-Dive',
        videoThumbnail: '/videos/data-masking-security-deepdive.jpg',
        videoDuration: 'PT5M',
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
        videoUrl: '/videos/owlmask-masking-explainer.mp4',
        videoTitle: 'How Data Masking Works in OwlMask — Full Walkthrough',
        videoThumbnail: '/videos/owlmask-masking-explainer.jpg',
        videoDuration: 'PT2M42S',
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
        videoUrl: '/videos/postgresql-masking-tutorial.mp4',
        videoTitle: 'Mask a PostgreSQL Database with OwlMask — Step-by-Step Tutorial',
        videoThumbnail: '/videos/postgresql-masking-tutorial.jpg',
        videoDuration: 'PT5M',
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
        videoUrl: '/videos/owltable-feature-tour.mp4',
        videoTitle: 'OwlTable in Five Minutes — Platform Feature Tour',
        videoThumbnail: '/videos/owltable-feature-tour.jpg',
        videoDuration: 'PT5M',
        externalVideoUrl: 'https://www.youtube.com/embed/s7tHhyxuXg4',
        externalVideoTitle: 'Dynamic Data Masking & Encryption for MySQL/PostgreSQL',
        timeToRead: '12 min',
    }
];

export function getArticleBySlug(slug: string): ArticleMetadata | undefined {
    return articles.find((article) => article.slug === slug);
}
