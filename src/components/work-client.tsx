'use client'
import { useState, KeyboardEvent } from 'react'
import Link from 'next/link'

const projects = [
  {
    type: 'project',
    title: 'gibmoni',
    description: 'a crowdfunding platform on solana. brings accountability through milestone-based fund releases, weighted community voting, and automated approvals. funds are released only when milestones pass voting.',
    tags: ['solana', 'rust', 'next.js'],
    links: { github: 'https://github.com/parthesh28/gibmoni', live: 'https://gibmoni.vercel.app' },
    status: 'feb 2025',
  },
  {
    type: 'project',
    title: 'printf',
    description: 'a printing utility which comprises three components: a android app for ordering, a restful api, and a rust daemon that interfaces directly with native print apis to execute jobs.',
    tags: ['rust', 'react native', 'hono'],
    links: { github: 'https://github.com/thenarcode/printf-app', live: 'https://print-f.top' },
    status: 'jan 2025',
  },
  {
    type: 'project',
    title: 'pulp',
    description: 'a text sharing platform available across three interfaces. the api powers a next.js web app, a cli tool, and a vs code extension allowing devs to share code directly from their editor.',
    tags: ['next.js', 'go', 'hono'],
    links: { github: 'https://github.com/thenarcode/pulp_ui', live: 'https://pulpx.vercel.app' },
    status: 'jun 2023',
  },
];

const experiences = [
  {
    type: 'experience',
    title: 'rust security bootcamp',
    description: 'graduated from the rust security bootcamp endorsed by the solana foundation. learned rust internals, memory safety vulnerabilities, and advanced solana smart contract security principles. completed a capstone audit project executing vulnerability analysis on live solana programs.',
    tags: ['rust', 'security', 'solana'],
    links: { github: undefined, live: 'https://rektoff.xyz' },
    status: 'mar 2026 - jun 2026',
  },
  {
    type: 'experience',
    title: 'turbin3 builders program',
    description: "completed turbin3's async and accelerated builders program emphasizing highly scalable solana smart contract architecture and dao governance mechanisms. mastered compute cost optimization and secure on-chain program development best practices.",
    tags: ['rust', 'anchor', 'solana'],
    links: { github: undefined, live: 'https://turbin3.org' },
    status: 'jan 2026 - mar 2026',
  },
  {
    type: 'experience',
    title: 'ackee school of solana',
    description: 'graduated from an intensive 9-week advanced solana developer program. achieved placement among top 13% (197 of 1,515 participants); gained expertise in solana runtime, cross-program invocations (cpi), and secure full-stack dapp development.',
    tags: ['rust', 'anchor', 'solana'],
    links: { github: undefined, live: 'https://ackee.xyz/school-of-solana' },
    status: 'sep 2025 - nov 2025',
  },
];

export default function WorkClient() {
  const [activeTab, setActiveTab] = useState<'projects' | 'experience'>('projects');
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentList = activeTab === 'projects' ? projects : experiences;
  const currentItem = currentList[currentIndex];

  const handleTabChange = (tab: 'projects' | 'experience') => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, tab: 'projects' | 'experience') => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      handleTabChange(tab === 'projects' ? 'experience' : 'projects');
    }
  };

  const next = () => setCurrentIndex((i) => (i + 1) % currentList.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + currentList.length) % currentList.length);

  return (
    <main
      id="main-content"
      className="flex-1 min-h-0 w-full flex flex-col items-center justify-center px-4 py-2 overflow-hidden"
    >
      <div className="w-full max-w-[92vw] md:max-w-3xl lowercase">

        <h1 className="text-[clamp(24px,calc(14.94px_+_1.36dvh),27.6px)] md:text-4xl font-bold pl-1 mb-3">proof of work</h1>

        {/* Tab row */}
        <div role="tablist" aria-label="work categories" className="flex items-end relative z-20 top-[2px]">
          {(['projects', 'experience'] as const).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                id={`tab-${tab}`}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`panel-${tab}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleTabChange(tab)}
                onKeyDown={(e) => handleKeyDown(e, tab)}
                className={`px-4 py-2 md:px-6 md:py-2.5 cursor-pointer font-bold text-[clamp(14px,calc(8.97px_+_0.75dvh),16px)] md:text-base ${isSelected ? 'brutalist z-20 pb-[12px] md:pb-[14px]' : 'tab z-0'
                  }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Card panel */}
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="w-full relative mb-8"
        >
          <div className="brutalist relative p-4 md:p-6 flex flex-col min-h-[13rem] md:min-h-[17rem] z-10">

            <header className="flex justify-between items-center mb-3 border-b-2 border-dotted border-current pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-current" aria-hidden="true" />
                <span className="text-[clamp(12px,calc(6.97px_+_0.75dvh),14px)] md:text-sm font-bold">
                  {activeTab === 'projects' ? 'project' : 'record'}_0{currentIndex + 1}
                </span>
              </div>
              <span className="text-[clamp(12px,calc(6.97px_+_0.75dvh),14px)] md:text-sm font-semibold">{currentItem.status}</span>
            </header>

            <h2 className="text-[clamp(24px,calc(14.94px_+_1.36dvh),27.6px)] md:text-4xl font-bold mb-2">{currentItem.title}</h2>

            <p className="text-[clamp(14px,calc(8.97px_+_0.75dvh),16px)] md:text-base leading-relaxed font-medium opacity-90">
              {currentItem.description}
            </p>

            <div className="mt-auto pt-4 pb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {currentItem.tags.map((tag) => (
                  <span key={tag} className="brutalist px-2 py-0.5 text-[clamp(12px,calc(6.97px_+_0.75dvh),14px)] font-bold">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 shrink-0">
                {currentItem.links?.github && (
                  <Link href={currentItem.links.github} target="_blank" rel="noopener noreferrer" className="brutalist px-3 py-1.5 text-[clamp(12px,calc(6.97px_+_0.75dvh),14px)] md:text-sm font-bold">
                    code
                  </Link>
                )}
                {currentItem.links?.live && (
                  <Link href={currentItem.links.live} target="_blank" rel="noopener noreferrer" className="brutalist px-3 py-1.5 text-[clamp(12px,calc(6.97px_+_0.75dvh),14px)] md:text-sm font-bold">
                    {activeTab === 'projects' ? 'live' : 'visit org'}
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="absolute -bottom-4 inset-x-0 flex justify-center items-center gap-3 z-20">
            <button
              aria-label={`previous ${activeTab === 'projects' ? 'project' : 'experience'}`}
              onClick={prev}
              className="brutalist cursor-pointer w-9 h-9 md:w-10 md:h-10 flex items-center justify-center font-bold text-sm"
            >
              <span aria-hidden="true">&lt;</span>
            </button>

            <div
              className="brutalist flex gap-2 px-3 py-2"
              role="group"
              aria-label={`Item ${currentIndex + 1} of ${currentList.length}`}
            >
              {currentList.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 bg-current ${idx === currentIndex ? 'opacity-100' : 'opacity-25'}`}
                />
              ))}
            </div>

            <button
              aria-label={`next ${activeTab === 'projects' ? 'project' : 'experience'}`}
              onClick={next}
              className="brutalist cursor-pointer w-9 h-9 md:w-10 md:h-10 flex items-center justify-center font-bold text-sm"
            >
              <span aria-hidden="true">&gt;</span>
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}