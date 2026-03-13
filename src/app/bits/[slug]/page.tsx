import Link from 'next/link'
import { notFound } from 'next/navigation'
import { bits } from '@/utils/bits'

const getReadingTime = (text: string) =>
    `${Math.ceil(text.trim().split(/\s+/).length / 200)} min read`;

export const generateStaticParams = async () =>
    bits.map((bit) => ({ slug: bit.slug }));

const BitDetail = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const bit = bits.find((b) => b.slug === slug);

    if (!bit) notFound();

    return (
        <main className="h-[100dvh] w-full relative overflow-hidden flex flex-col items-center justify-center pt-45 pb-24 px-6">
            <article className="w-full max-w-2xl flex flex-col gap-6 h-full">

                <header className="flex items-center justify-between shrink-0">
                    <Link href="/bits" aria-label="back to bits" className="flex items-center gap-2 text-lg font-bold">
                        <i className="hn hn-arrow-left text-lg" />
                        back
                    </Link>

                    <div className="brutalist px-3 py-1.5 flex items-center gap-3 text-[10px] sm:text-xs font-bold">
                        <span>{bit.date}</span>
                        <span className="w-1 h-1 bg-current rounded-full opacity-50" />
                        <span>{bit.type}</span>
                        <span className="w-1 h-1 bg-current rounded-full opacity-50" />
                        <span>{getReadingTime(bit.content)}</span>
                    </div>
                </header>

                <h1 className="text-3xl sm:text-4xl font-bold">
                    {bit.title}
                </h1>

                <p className="flex-1 overflow-y-auto pr-1 text-base leading-relaxed font-medium whitespace-pre-wrap text-justify sm:text-left">
                    {bit.content}
                </p>

            </article>
        </main>
    );
};

export default BitDetail;