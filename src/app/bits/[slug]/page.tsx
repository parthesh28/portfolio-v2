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
        <div className="h-[100dvh] w-full relative overflow-hidden flex flex-col items-center justify-center pt-24 pb-24 px-6">

            <div className="w-full max-w-2xl flex flex-col gap-6">

                <div className="flex items-center justify-between w-full">

                    <Link
                        href="/bits"
                        className="group flex items-center gap-2 text-sm font-bold tracking-widest lowercase "
                    >
                        <i className="hn hn-arrow-left text-lg transition-transform"></i>
                        <span>back</span>
                    </Link>

                    <div className="card border-2 px-3 py-1.5 flex items-center gap-3 text-[10px] sm:text-xs font-bold tracking-widest lowercase">
                        <span>{bit.date}</span>
                        <span className="w-1 h-1 bg-current rounded-full opacity-50"></span>
                        <span>{bit.type}</span>
                        <span className="w-1 h-1 bg-current rounded-full opacity-50"></span>
                        <span>{readTime}</span>
                    </div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold lowercase leading-tight tracking-wide text-zinc-900 dark:text-zinc-100">
                    {bit.title}
                </h1>

                <div className="text-base sm:text-lg leading-relaxed font-medium text-zinc-800 dark:text-zinc-300 lowercase whitespace-pre-wrap text-justify sm:text-left">
                    {bit.content}
                </div>

            </div>
        </div>
    )
}

export default BitDetailPage