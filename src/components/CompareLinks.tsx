import Link from 'next/link';

const comparisons = [
    { slug: 'delphix-alternative', label: 'OwlTable vs. Delphix' },
    { slug: 'tonic-alternative', label: 'OwlTable vs. SaaS masking platforms' },
    { slug: 'diy-masking-scripts', label: 'OwlTable vs. DIY masking scripts' },
];

export default function CompareLinks({ current }: { current: string }) {
    const others = comparisons.filter((comparison) => comparison.slug !== current);
    return (
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <span className="text-gray-500 font-medium">Other comparisons:</span>
            {others.map((comparison) => (
                <Link key={comparison.slug} href={`/compare/${comparison.slug}`} className="text-blue-300 hover:text-blue-200 font-medium transition-colors">
                    {comparison.label} →
                </Link>
            ))}
        </div>
    );
}
