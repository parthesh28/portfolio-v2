import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { bits } from '@/utils/bits'
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';

function getReadingTime(text: string) {
    const wpm = 200;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return `${time} min read`;
}

export async function generateStaticParams() {
    return bits.map((bit) => ({
        slug: bit.slug,
    }))
}

const BitDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const bit = bits.find((b) => b.slug === slug);

    if (!bit) {
        notFound();
    }
    const readTime = getReadingTime(bit.content);

    return (
        <div className="min-h-screen w-full flex justify-center pt-32 pb-32 px-6">

            <div className="w-full max-w-2xl flex flex-col">

                <div className="flex items-center justify-between mb-8 border-b-2 border-dashed border-zinc-300 dark:border-zinc-500 pb-4">

                    <Link
                        href="/bits"
                        className="p-2 -ml-2"
                        aria-label="return to logs"
                    >
                        <i className="hn hn-arrow-left text-xl"></i>
                    </Link>

                    <div className="flex items-center gap-3 text-xs font-bold tracking-widest opacity-60 lowercase font-mono">
                        <i className="hn hn-edit text-sm"></i>
                        <span>{bit.date}</span>
                        <span>//</span>
                        <span>{bit.type}</span>
                        <span>//</span>
                        <span>{readTime}</span>
                    </div>
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold lowercase leading-tight tracking-wide text-zinc-900 dark:text-zinc-100 mb-8">
                    {bit.title}
                </h1>
                <div className="text-lg sm:text-xl leading-relaxed font-medium text-zinc-800 dark:text-zinc-300 lowercase whitespace-pre-wrap mb-16 text-justify sm:text-left">
                    {bit.content}
                </div>
            </div>
        </div>
    )
}

export default BitDetailPage