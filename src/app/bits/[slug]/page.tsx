import Link from 'next/link'
import { notFound } from 'next/navigation'
import { bits } from '@/utils/bits'
import type { Metadata } from 'next'

export const generateStaticParams = async () =>
    bits.map((bit) => ({ slug: bit.slug }));

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const bit = bits.find((b) => b.slug === slug);

    if (!bit) return { title: 'bit not found' };

    const fullTitle = `${bit.title} - parthesh purohit`;
    const snippet = bit.content.slice(0, 155).replace(/\s+/g, ' ').trim() + '...';
    const pageUrl = `https://parthesh.in/bits/${bit.slug}`;

    return {
        title: {
            absolute: fullTitle,
        },
        description: snippet,
        alternates: {
            canonical: pageUrl,
        },
        openGraph: {
            title: fullTitle,
            description: snippet,
            url: pageUrl,
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description: snippet,
        },
    };
}

const BitDetail = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const bit = bits.find((b) => b.slug === slug);

    if (!bit) notFound();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: bit.title,
        datePublished: bit.date,
        articleBody: bit.content,
        author: {
            '@type': 'Person',
            name: 'Parthesh Purohit',
        },
    };

    return (
        <main id="main-content" className="h-dvh w-full relative overflow-hidden flex flex-col items-center justify-center px-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <article className="w-full max-w-2xl flex flex-col gap-5 my-auto">

                <header className="flex items-center justify-between shrink-0">
                    <Link href="/bits" aria-label="back to bits list" className="text-sm font-bold font-mono">
                        &lt; back
                    </Link>

                    <div className="flex items-center gap-2 text-xs font-bold font-mono opacity-80">
                        <span>{bit.date}</span>
                        <span aria-hidden="true">•</span>
                        <span>{bit.type}</span>
                    </div>
                </header>

                <h1 className="text-3xl sm:text-4xl font-bold">
                    {bit.title}
                </h1>

                <p className="text-base leading-relaxed font-medium whitespace-pre-wrap text-justify sm:text-left">
                    {bit.content}
                </p>

            </article>
        </main>
    );
};

export default BitDetail;