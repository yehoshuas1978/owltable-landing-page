import { getDocContent, getDocSlugs } from '@/lib/docUtils';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const slugs = getDocSlugs();
    return slugs.map((slug) => ({
        slug: slug === 'index' ? 'intro' : slug,
    }));
}

export default async function DocPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const doc = getDocContent(slug);

    if (!doc) {
        notFound();
    }

    return (
        <article className="prose prose-invert prose-blue max-w-none">
            <ReactMarkdown>{doc.content}</ReactMarkdown>
        </article>
    );
}
