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
    // Clean content for snippet: remove backticks, collapse whitespace, cut at word boundary
    const cleanContent = bit.content.replace(/`[^`]*`/g, '').replace(/\s+/g, ' ').trim();
    const maxLen = 155;
    const snippet = cleanContent.length <= maxLen
        ? cleanContent
        : cleanContent.slice(0, cleanContent.lastIndexOf(' ', maxLen)) + '...';
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
            publishedTime: bit.isoDate,
            authors: ['https://parthesh.in'],
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

    const cleanContent = bit.content.replace(/`[^`]*`/g, '').replace(/\s+/g, ' ').trim();
    const maxLen = 155;
    const snippet = cleanContent.length <= maxLen
        ? cleanContent
        : cleanContent.slice(0, cleanContent.lastIndexOf(' ', maxLen)) + '...';
    const pageUrl = `https://parthesh.in/bits/${bit.slug}`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': pageUrl,
        },
        headline: bit.title,
        description: snippet,
        datePublished: bit.isoDate,
        dateModified: bit.isoDate,
        articleBody: bit.content,
        url: pageUrl,
        author: {
            '@type': 'Person',
            name: 'Parthesh Purohit',
            url: 'https://parthesh.in',
        },
        publisher: {
            '@type': 'Person',
            name: 'Parthesh Purohit',
            url: 'https://parthesh.in',
        },
    };

    return (
        <main id="main-content" className="h-dvh w-full relative overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 page-main-adaptive md:pt-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <article className="w-full max-w-2xl flex flex-col gap-3 sm:gap-5 my-auto">

                <header className="flex items-center justify-between shrink-0">
                    <Link href="/bits" aria-label="back to bits list" className="text-xs sm:text-sm font-bold font-pixel-square">
                        &lt; back
                    </Link>

                    <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold font-pixel-square opacity-80">
                        <span>{bit.date}</span>
                        <span aria-hidden="true">•</span>
                        <span>{bit.type}</span>
                    </div>
                </header>

                <h1 className="page-title-adaptive md:text-4xl font-bold">
                    {bit.title}
                </h1>

                <p className="card-text-adaptive md:text-base leading-relaxed font-medium whitespace-pre-wrap text-left">
                    {bit.content}
                </p>

            </article>
        </main>
    );
};

export default BitDetail;