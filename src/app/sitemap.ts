import { MetadataRoute } from 'next'
import { articles } from '@/lib/articles'

export default function sitemap(): MetadataRoute.Sitemap {
    const blogUrls: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `https://www.owltable.net/blog/${article.slug}`,
        lastModified: new Date(article.publishDate),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [
        {
            url: 'https://www.owltable.net',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://www.owltable.net/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: 'https://www.owltable.net/docs/intro',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...blogUrls,
    ]
}
