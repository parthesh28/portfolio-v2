import Link from 'next/link'
import { notFound } from 'next/navigation'
import { bits } from '@/utils/bits'
import type { Metadata } from 'next'

export const generateStaticParams = async () =>
  bits.map((bit) => ({ slug: bit.slug }));

/** Extract a clean description snippet from a bit's content. */
function getSnippet(content: string, maxLen = 155): string {
  const clean = content.replace(/`[^`]*`/g, '').replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, clean.lastIndexOf(' ', maxLen)) + '...';
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bit = bits.find((b) => b.slug === slug);
  if (!bit) return { title: 'bit not found' };

  const title = `${bit.title} - parthesh purohit`;
  const description = getSnippet(bit.content);
  const url = `https://parthesh.in/bits/${bit.slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'article', publishedTime: bit.isoDate, authors: ['https://parthesh.in'] },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function BitDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bit = bits.find((b) => b.slug === slug);
  if (!bit) notFound();

  const pageUrl = `https://parthesh.in/bits/${bit.slug}`;
  const snippet = getSnippet(bit.content);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    headline: bit.title,
    description: snippet,
    datePublished: bit.isoDate,
    dateModified: bit.isoDate,
    articleBody: bit.content,
    url: pageUrl,
    author: { '@type': 'Person', name: 'Parthesh Purohit', url: 'https://parthesh.in' },
    publisher: { '@type': 'Person', name: 'Parthesh Purohit', url: 'https://parthesh.in' },
  };

  return (
    <main
      id="main-content"
      className="flex-1 min-h-0 w-full flex flex-col items-center justify-center px-4 py-2 overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="w-full max-w-[92vw] md:max-w-3xl max-h-full flex flex-col gap-4 md:gap-5 overflow-y-auto">

        <header className="flex items-center justify-between shrink-0">
          <Link href="/bits" aria-label="back to bits list" className="text-[clamp(12px,calc(6.97px_+_0.75dvh),14px)] md:text-sm font-bold font-pixel-square">
            &lt; back
          </Link>
          <div className="flex items-center gap-2 text-[clamp(12px,calc(6.97px_+_0.75dvh),14px)] font-bold font-pixel-square opacity-70">
            <span>{bit.date}</span>
          </div>
        </header>

        <h1 className="text-[clamp(24px,calc(14.94px_+_1.36dvh),27.6px)] md:text-4xl font-bold">{bit.title}</h1>

        <p className="text-[clamp(14px,calc(8.97px_+_0.75dvh),16px)] md:text-base leading-relaxed font-medium whitespace-pre-wrap">
          {bit.content}
        </p>

      </article>
    </main>
  );
}