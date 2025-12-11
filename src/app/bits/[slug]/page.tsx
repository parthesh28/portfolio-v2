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
        <div className="min-h-screen w-full flex justify-center pt-50 pb-10 px-6">

            <div className="w-full max-w-2xl flex flex-col">

                <div className="flex items-center justify-between mb-4 border-b-2 border-dashed border-zinc-600 dark:border-zinc-500 pb-3">

                    <Link
                        href="/bits"
                        className="p-1.5 -ml-1.5 opacity-60 hover:opacity-100 transition-opacity"
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

                <h1 className="text-3xl sm:text-4xl font-bold lowercase leading-tight tracking-wide text-zinc-900 dark:text-zinc-100 mb-6">
                    {bit.title}
                </h1>

                <div className="text-base sm:text-lg leading-relaxed font-medium text-zinc-800 dark:text-zinc-300 lowercase whitespace-pre-wrap mb-8 text-justify sm:text-left">
                    {bit.content}
                </div>

            </div>
        </div>
    )
}

export default BitDetailPage