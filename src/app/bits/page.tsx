'use client'
import { useState } from 'react'
import Link from 'next/link'
import { bits } from '@/utils/bits'

const ITEMS_PER_PAGE = 3;
const FILTERS = ['tech', 'life'];

const Bits = () => {
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
    <main className="h-[100dvh] w-full relative overflow-hidden flex flex-col items-center justify-center pt-40 pb-32">
      <div className="w-full max-w-2xl flex flex-col h-auto max-h-[75vh] px-4 sm:px-6">

        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 shrink-0">
          <h1 className="text-3xl sm:text-4xl font-bold">bits & logs</h1>

          <nav className="brutalist flex p-1 gap-1 bg-zinc-100 dark:bg-zinc-900">
            {FILTERS.map((type) => (
              <button
                key={type}
                onClick={() => handleFilterChange(type)}
                className={`px-4 py-1 text-sm font-bold cursor-pointer ${filter === type
                  ? 'bg-zinc-700 border-2 border-current text-zinc-300 dark:bg-zinc-200 dark:text-zinc-900'
                  : 'text-zinc-900 dark:text-zinc-300'
                  }`}
              >
                {type}
              </button>
            ))}
          </nav>
        </header>

        <section className="flex-1 min-h-0 overflow-y-auto p-1 flex flex-col gap-3">
          {displayedBits.length > 0 ? (
            displayedBits.map((bit) => (
              <Link
                key={bit.id}
                href={`/bits/${bit.slug}`}
                className="brutalist block p-4 sm:p-5"
              >
                <div className="flex items-center gap-3 mb-3 text-xs font-bold">
                  <span>{bit.date}</span>
                  <span className="w-1 h-1 bg-current rounded-full" />
                  <span className="px-1.5 py-0.5 border border-current text-[10px]">{bit.type}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold leading-tight underline-offset-4 decoration-2">
                  {bit.title}
                </h2>
              </Link>
            ))
          ) : (
            <div className="py-10 flex items-center justify-center opacity-50 font-mono text-sm">
              [ nothing found in this sector ]
            </div>
          )}
        </section>

        {totalPages > 1 && (
          <footer className="mt-4 flex justify-center items-center gap-4 shrink-0 pt-2">
            <button
              aria-label="previous page"
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 0}
              className="brutalist cursor-pointer w-10 h-10 flex items-center justify-center active:translate-y-1 disabled:invisible"
            >
              <i className="hn hn-arrow-left text-lg" />
            </button>

            <span className="text-xs font-bold">
              page {currentPage + 1} of {totalPages}
            </span>

            <button
              aria-label="next page"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage >= totalPages - 1}
              className="brutalist cursor-pointer w-10 h-10 flex items-center justify-center active:translate-y-1 disabled:invisible"
            >
              <i className="hn hn-arrow-right text-lg" />
            </button>
          </footer>
        )}
      </div>
    </main>
  );
};

export default Bits;