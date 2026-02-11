'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { bits } from '@/utils/bits'
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';

const ITEMS_PER_PAGE = 3;

const Bitspage = () => {
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

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(p => p + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(p => p - 1);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(0);
  };

  return (
    <div className="h-[100dvh] w-full relative overflow-hidden flex flex-col items-center justify-center pt-24 pb-32 sm:pt-28">

      <div className="w-full max-w-2xl flex flex-col h-auto max-h-[75vh] px-4 sm:px-6">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 shrink-0">
          <h1 className="text-4xl font-bold tracking-tight lowercase">
            bits & logs
          </h1>

          <div className="card flex p-1 gap-1 border-2 bg-white dark:bg-zinc-900">
            {['all', 'tech', 'life'].map((type) => (
              <button
                key={type}
                onClick={() => handleFilterChange(type)}
                className={`
                    px-4 py-1 text-sm font-bold lowercase cursor-pointer
                    ${filter === type
                    ? 'bg-zinc-700 border-2 border-black text-white dark:bg-zinc-200 dark:text-black'
                    : 'text-zinc-700 dark:text-zinc-300'
                  }
                `}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-1 flex flex-col gap-3">
          {displayedBits.map((bit) => (
            <Link
              key={bit.id}
              href={`/bits/${bit.slug}`}
              className="card relative border-2 p-4 sm:p-5 cursor-pointer "
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 text-xs font-bold tracking-widest">
                    <span>{bit.date}</span>
                    <span className="w-1 h-1 bg-current rounded-full" />
                    <span className={` px-1.5 py-0.5 border border-current text-[10px]`}>
                      {bit.type}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold leading-tight lowercase underline-offset-4 decoration-2">
                    {bit.title}
                  </h2>
                </div>
                <i className="hn hn-chevron-right text-xl opacity-0 transition-opacity" />
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
            {currentPage > 0 ? (
              <button
                onClick={prevPage}
                className="cursor-pointer button w-10 h-10 border-2 flex items-center justify-center bg-white dark:bg-zinc-900 active:translate-y-1 transition-transform"
              >
                <i className="hn hn-arrow-left text-lg"></i>
              </button>
            ) : (
              <div className="w-10 h-10" />
            )}

            <span className="text-xs font-bold tracking-widest lowercase">
              page {currentPage + 1} of {totalPages}
            </span>

            {currentPage < totalPages - 1 ? (
              <button
                onClick={nextPage}
                className="cursor-pointer button w-10 h-10 border-2 flex items-center justify-center bg-white dark:bg-zinc-900 active:translate-y-1 transition-transform"
              >
                <i className="hn hn-arrow-right text-lg"></i>
              </button>
            ) : (
              <div className="w-10 h-10" />
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default Bitspage