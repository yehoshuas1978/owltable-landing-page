import Link from 'next/link';
import { getAllDocs } from '@/lib/docUtils';
import Navbar from '@/components/Navbar';

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const docs = getAllDocs();

    return (
        <div className="min-h-screen bg-[#19191c]">
            <Navbar withMarginTop={false} />
            <div className="max-w-[1440px] mx-auto pt-16 flex">
                {/* Sidebar */}
                <aside className="w-64 fixed h-[calc(100vh-4rem)] overflow-y-auto border-r border-[#27272a] bg-[#080809] hidden md:block">
                    <div className="p-6">
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">
                            Documentation
                        </h2>
                        <nav className="space-y-1">
                            {docs.map((doc) => (
                                <Link
                                    key={doc.slug}
                                    href={`/docs/${doc.slug}`}
                                    className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded transition-all duration-200 border border-transparent hover:border-white/5"
                                >
                                    {doc.title}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 md:ml-64 p-8 md:p-12 max-w-4xl">
                    {children}
                </main>
            </div>
        </div>
    );
}
