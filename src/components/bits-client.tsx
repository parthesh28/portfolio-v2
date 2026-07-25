'use client'
import { useState } from 'react'
import Link from 'next/link'
import { bits } from '@/utils/bits'

const ITEMS_PER_PAGE = 3;
const FILTERS = ['tech', 'life'];

export default function BitsClient() {
  const [filter, setFilter] = useState('tech');
  const [currentPage, setCurrentPage] = useState(0);

  const filteredBits = bits.filter(bit => bit.type === filter);

  const totalPages = Math.ceil(filteredBits.length / ITEMS_PER_PAGE);
  const displayedBits = filteredBits.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handleFilterChange = (newFilter: string) => {
    if (filter === newFilter) return;
    setFilter(newFilter);
    setCurrentPage(0);
  };

  return (
    <main id="main-content" className="h-dvh w-full relative overflow-hidden flex flex-col items-center justify-center px-4 page-main-adaptive md:pt-28 md:pb-20">
      {/* Crawler-accessible link list so search engine crawlers index ALL bits (tech and life) */}
      <nav aria-label="all bits archive" className="sr-only">
        <ul>
          {bits.map((bit) => (
            <li key={bit.id}>
              <Link href={`/bits/${bit.slug}`}>
                {bit.title} - {bit.type} ({bit.date})
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="w-full max-w-2xl flex flex-col h-auto bits-container-adaptive md:max-h-[75vh]">

        <header className="flex items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4 shrink-0">
          <h1 className="bits-header-title-adaptive md:text-sm whitespace-nowrap">bits & logs</h1>

          <nav aria-label="content filter" className="brutalist flex p-0.5 sm:p-1 gap-1 shrink-0">
            {FILTERS.map((type) => (
              <button
                key={type}
                onClick={() => handleFilterChange(type)}
                aria-pressed={filter === type}
                className={`px-3 py-1 text-[9px] sm:px-4 sm:py-1 sm:text-[10px] cursor-pointer font-mono ${filter === type
                  ? 'bg-neutral-950 text-neutral-100'
                  : 'text-neutral-900 opacity-60'
                  }`}
              >
                {type}
              </button>
            ))}
          </nav>
        </header>

        <section aria-label="bits list" className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-1.5 sm:p-3 flex flex-col gap-2.5 sm:gap-3">
          {displayedBits.length > 0 ? (
            displayedBits.map((bit) => (
              <Link
                key={bit.id}
                href={`/bits/${bit.slug}`}
                aria-label={`read bit: ${bit.title}`}
                className="brutalist block bits-card-padding-adaptive md:p-5"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-1.5 text-[9px] sm:text-[10px]">
                  <span>{bit.date}</span>
                  <span className="w-1 h-1 bg-current rounded-full" aria-hidden="true" />
                  <span className="px-1.5 py-0.5 border border-current text-[9px]">{bit.type}</span>
                </div>
                <h2 className="bits-card-title-adaptive md:text-xs leading-snug sm:leading-tight">
                  {bit.title}
                </h2>
              </Link>
            ))
          ) : (
            <div className="py-6 sm:py-10 flex items-center justify-center opacity-50 font-mono text-xs sm:text-sm">
              [ nothing here ]
            </div>
          )}
        </section>

        <footer className="mt-3 sm:mt-4 flex justify-center items-center gap-3 sm:gap-4 shrink-0 pt-1 sm:pt-2">
          <button
            aria-label="previous page"
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 0}
            className="brutalist cursor-pointer w-8 h-8 md:w-10 md:h-10 flex items-center justify-center disabled:invisible font-mono"
          >
            <span aria-hidden="true" className="leading-none inline-block text-xs sm:text-sm -translate-y-[1px] translate-x-[0.5px]">&lt;</span>
          </button>

          <span className="text-[10px] sm:text-xs">
            page {currentPage + 1} of {Math.max(1, totalPages)}
          </span>

          <button
            aria-label="next page"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage >= Math.max(1, totalPages) - 1}
            className="brutalist cursor-pointer w-8 h-8 md:w-10 md:h-10 flex items-center justify-center disabled:invisible font-mono"
          >
            <span aria-hidden="true" className="leading-none inline-block text-xs sm:text-sm -translate-y-[2px] translate-x-[1.5px]">&gt;</span>          </button>
        </footer>

      </div>
    </main>
  );
}
