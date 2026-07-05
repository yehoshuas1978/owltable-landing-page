export type ArticleMetadata = {
    slug: string;
    title: string;
    description: string;
    author: string;
    publishDate: string; // ISO 8601 string, e.g., '2026-07-05T00:00:00Z'
    tags: string[];
    coverImage?: string;
    videoUrl?: string; // Optional YouTube or Vimeo URL
    timeToRead?: string;
};

export const articles: ArticleMetadata[] = [
    {
        slug: 'how-data-masking-protects-your-business',
        title: 'How Data Masking Protects Your Business from Breaches',
        description: 'Learn the fundamental concepts of data masking and why it is critical for compliance and security in modern enterprise applications.',
        author: 'OwlTable Security Team',
        publishDate: '2026-07-01T10:00:00Z',
        tags: ['Security', 'Data Masking', 'Compliance'],
        coverImage: '/blog/data-masking-cover.jpg',
        timeToRead: '5 min',
    },
    {
        slug: 'introducing-owlmask-video-guide',
        title: 'Introducing OwlMask: A Complete Video Guide',
        description: 'Watch this comprehensive video guide to see how OwlMask simplifies your database anonymization workflow.',
        author: 'OwlTable Product Team',
        publishDate: '2026-07-05T09:00:00Z',
        tags: ['Video', 'Tutorial', 'Product'],
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder, user should change this
        timeToRead: '10 min',
    }
];

export function getArticleBySlug(slug: string): ArticleMetadata | undefined {
    return articles.find((article) => article.slug === slug);
}
