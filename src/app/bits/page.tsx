'use client'
import { useState } from 'react'
import Link from 'next/link'
import { bits } from '@/utils/bits'

const ITEMS_PER_PAGE = 3;

const Bits = () => {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);

  const filteredBits = filter === 'all'
    ? bits
    : bits.filter(bit => bit.type === filter);

  const totalPages = Math.ceil(filteredBits.length / ITEMS_PER_PAGE);
  const displayedBits = filteredBits.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const nextPage = () => { if (currentPage < totalPages - 1) setCurrentPage(p => p + 1); };
  const prevPage = () => { if (currentPage > 0) setCurrentPage(p => p - 1); };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(0);
  };

  return (
    <div className="page-container pt-45 pb-32">
      <div className="w-full max-w-2xl flex flex-col h-auto max-h-[75vh] px-4 sm:px-6">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 shrink-0">
          <h1 className="page-title">bits & logs</h1>
          <div className="card flex p-1 gap-1 bg-zinc-100 dark:bg-zinc-900">
            {['all', 'tech', 'life'].map((type) => (
              <button
                key={type}
                onClick={() => handleFilterChange(type)}
                className={`px-4 py-1 text-sm font-bold lowercase cursor-pointer ${filter === type
                    ? 'bg-zinc-700 border-2 border-current text-zinc-100 dark:bg-zinc-200 dark:text-zinc-900'
                    : 'text-zinc-700 dark:text-zinc-300'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-1 flex flex-col gap-3">
          {displayedBits.map((bit) => (
            <Link
              key={bit.id}
              href={`/bits/${bit.slug}`}
              className="card relative p-4 sm:p-5 cursor-pointer"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 text-xs font-bold">
                    <span>{bit.date}</span>
                    <span className="w-1 h-1 bg-current rounded-full" />
                    <span className="px-1.5 py-0.5 border border-current text-[10px]">{bit.type}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold leading-tight lowercase underline-offset-4 decoration-2">
                    {bit.title}
                  </h2>
                </div>
                <i className="hn hn-chevron-right text-xl opacity-0" />
              </div>
            </Link>
          ))}

          {displayedBits.length === 0 && (
            <div className="py-10 flex items-center justify-center opacity-50 lowercase font-mono">
              [ nothing found in this sector ]
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-4 flex justify-center items-center gap-4 shrink-0 pt-2">
            <button
              aria-label="previous page"
              onClick={prevPage}
              disabled={currentPage === 0}
              className="cursor-pointer button w-10 h-10 flex items-center justify-center active:translate-y-1 active:shadow-none disabled:invisible"
            >
              <i className="hn hn-arrow-left text-lg"></i>  
            </button>

            <span className="text-xs font-bold lowercase">
              page {currentPage + 1} of {totalPages}
            </span>

            <button
              aria-label="next page"
              onClick={nextPage}
              disabled={currentPage >= totalPages - 1}
              className="cursor-pointer button w-10 h-10 flex items-center justify-center active:translate-y-1 active:shadow-none disabled:invisible"
            >
              <i className="hn hn-arrow-right text-lg"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bits;