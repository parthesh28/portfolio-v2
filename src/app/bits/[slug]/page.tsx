import Link from 'next/link'
import { notFound } from 'next/navigation'
import { bits } from '@/utils/bits'

function getReadingTime(text: string) {
    const wpm = 200;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return `${time} min read`;
}

export async function generateStaticParams() {
    return bits.map((bit) => ({ slug: bit.slug }));
}

const BitDetail = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const bit = bits.find((b) => b.slug === slug);

    if (!bit) notFound();

    const readTime = getReadingTime(bit.content);

    return (
        <div className="page-container pt-45 pb-24 px-6">
            <div className="w-full max-w-2xl flex flex-col gap-6 h-full">
                <div className="flex items-center justify-between w-full shrink-0">
                    <Link href="/bits" aria-label="go back to bits" className="flex items-center gap-2 text-lg font-bold lowercase">
                        <i className="hn hn-arrow-left text-lg"></i>
                        <span>back</span>
                    </Link>
                    <div className="card px-3 py-1.5 flex items-center gap-3 text-[10px] sm:text-xs font-bold lowercase">
                        <span>{bit.date}</span>
                        <span className="w-1 h-1 bg-current rounded-full opacity-50"></span>
                        <span>{bit.type}</span>
                        <span className="w-1 h-1 bg-current rounded-full opacity-50"></span>
                        <span>{readTime}</span>
                    </div>
                </div>

                <h1 className="page-title text-zinc-900 dark:text-zinc-100">
                    {bit.title}
                </h1>

                <div className="overflow-y-auto flex-1 pr-1">
                    <p className="text-base sm:text-lg leading-relaxed font-medium text-zinc-800 dark:text-zinc-300 lowercase whitespace-pre-wrap text-justify sm:text-left">
                        {bit.content}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default BitDetail;