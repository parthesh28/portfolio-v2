'use client'
import { useState } from 'react'
import Link from 'next/link'
import { bits } from '@/utils/bits'

const ITEMS_PER_PAGE = 3;
const FILTERS = ['tech', 'life'] as const;

export default function BitsClient() {
  const [filter, setFilter] = useState<'tech' | 'life'>('tech');
  const [currentPage, setCurrentPage] = useState(0);

  const filteredBits = bits.filter((bit) => bit.type === filter);
  const totalPages = Math.max(1, Math.ceil(filteredBits.length / ITEMS_PER_PAGE));
  const displayedBits = filteredBits.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  const handleFilterChange = (next: 'tech' | 'life') => {
    if (filter === next) return;
    setFilter(next);
    setCurrentPage(0);
  };

  return (
    <main
      id="main-content"
      className="flex-1 min-h-0 w-full flex flex-col items-center justify-center px-4 py-2 overflow-hidden"
    >
      {/* SEO: crawler-accessible full link list */}
      <nav aria-label="all bits archive" className="sr-only">
        <ul>
          {bits.map((bit) => (
            <li key={bit.id}>
              <Link href={`/bits/${bit.slug}`}>{bit.title} - {bit.type} ({bit.date})</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="w-full max-w-[92vw] md:max-w-3xl max-h-full flex flex-col">

        <header className="flex items-center justify-between gap-4 mb-4 shrink-0">
          <h1 className="text-[clamp(24px,calc(14.94px_+_1.36dvh),27.6px)] md:text-4xl font-bold whitespace-nowrap">bits &amp; logs</h1>

          <nav aria-label="content filter" className="brutalist flex p-1 gap-1 shrink-0">
            {FILTERS.map((type) => (
              <button
                key={type}
                onClick={() => handleFilterChange(type)}
                aria-pressed={filter === type}
                className={`px-3 py-1 text-[clamp(12px,calc(6.97px_+_0.75dvh),14px)] md:text-sm font-bold cursor-pointer font-pixel-square ${filter === type ? 'bg-neutral-950 text-neutral-100' : 'opacity-60'
                  }`}
              >
                {type}
              </button>
            ))}
          </nav>
        </header>

        <section aria-label="bits list" className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col gap-2.5 pr-1 pb-1">
          {displayedBits.length > 0 ? (
            displayedBits.map((bit) => (
              <Link
                key={bit.id}
                href={`/bits/${bit.slug}`}
                aria-label={`read bit: ${bit.title}`}
                className="brutalist block p-3 md:p-5"
              >
                <div className="flex items-center gap-2 mb-1.5 text-[clamp(12px,calc(6.97px_+_0.75dvh),14px)] font-bold">
                  <span>{bit.date}</span>
                  <span className="px-1.5 py-0.5 border border-current text-[clamp(10px,calc(7.48px_+_0.38dvh),11px)]">{bit.type}</span>
                </div>
                <h2 className="text-[clamp(16px,calc(9.96px_+_0.91dvh),18.4px)] md:text-xl font-bold leading-snug">{bit.title}</h2>
              </Link>
            ))
          ) : (
            <div className="py-10 flex items-center justify-center opacity-50 font-pixel-square text-[clamp(12px,calc(6.97px_+_0.75dvh),14px)]">
              [ nothing here ]
            </div>
          )}
        </section>

        <footer className="mt-4 flex justify-center items-center gap-3 shrink-0 pt-2">
          <button
            aria-label="previous page"
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 0}
            className="brutalist cursor-pointer w-9 h-9 md:w-10 md:h-10 flex items-center justify-center disabled:invisible font-bold font-pixel-square text-sm"
          >
            <span aria-hidden="true">&lt;</span>
          </button>

          <span className="text-[clamp(12px,calc(6.97px_+_0.75dvh),14px)] font-bold">
            page {currentPage + 1} of {totalPages}
          </span>

          <button
            aria-label="next page"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage >= totalPages - 1}
            className="brutalist cursor-pointer w-9 h-9 md:w-10 md:h-10 flex items-center justify-center disabled:invisible font-bold text-sm"
          >
            <span aria-hidden="true">&gt;</span>
          </button>
        </footer>

      </div>
    </main>
  );
}