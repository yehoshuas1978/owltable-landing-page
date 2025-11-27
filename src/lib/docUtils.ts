import fs from 'fs';
import path from 'path';

const DOCS_DIR = path.join(process.cwd(), 'documentation/docs');

export interface DocFile {
    slug: string;
    title: string;
    content: string;
}

export function getDocSlugs(): string[] {
    const files = fs.readdirSync(DOCS_DIR);
    return files
        .filter((file) => file.endsWith('.md') && file !== 'business_plan.md')
        .map((file) => file.replace(/\.md$/, ''));
}

export function getDocContent(slug: string): DocFile | null {
    const realSlug = slug === 'intro' ? 'index' : slug;
    const fullPath = path.join(DOCS_DIR, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const content = fs.readFileSync(fullPath, 'utf8');

    // Simple title extraction (first h1 or filename)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : slug.charAt(0).toUpperCase() + slug.slice(1);

    return {
        slug,
        title,
        content,
    };
}

export function getAllDocs(): { slug: string; title: string }[] {
    const slugs = getDocSlugs();
    return slugs.map((slug) => {
        const realSlug = slug === 'index' ? 'intro' : slug;
        return {
            slug: realSlug,
            title: realSlug.charAt(0).toUpperCase() + realSlug.slice(1).replace(/-/g, ' '),
        };
    });
}
