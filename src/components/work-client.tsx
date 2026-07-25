'use client'
import { useState, KeyboardEvent } from 'react'
import Link from 'next/link'

const projects = [
  {
    type: 'project',
    title: 'gibmoni',
    description: (
      <>
        a crowdfunding platform on solana. brings accountability through milestone-based fund releases, weighted community voting, and automated approvals. funds are released only when milestones pass voting.
      </>
    ),
    tags: ['solana', 'rust', 'next.js'],
    links: { github: 'https://github.com/parthesh28/gibmoni', live: 'https://gibmoni.vercel.app' },
    status: 'feb 2025',
  },
  {
    type: 'project',
    title: 'printf',
    description: (
      <>
        a printing utility which comprises three components: a android app for ordering, a restful api, and a rust daemon that interfaces directly with native print apis to execute jobs.
      </>
    ),
    tags: ['rust', 'react native', 'hono'],
    links: { github: 'https://github.com/thenarcode/printf-app', live: 'https://print-f.top' },
    status: 'jan 2025',
  },
  {
    type: 'project',
    title: 'pulp',
    description: (
      <>
        a text sharing platform available across three interfaces. the api powers a next.js web app, a cli tool , and a vs code extension allowing deves to share code directly from their editor.
      </>
    ),
    tags: ['next.js', 'go', 'hono'],
    links: { github: 'https://github.com/thenarcode/pulp_ui', live: 'https://pulpx.vercel.app' },
    status: 'jun 2023',
  },
];

const experiences = [
  {
    type: 'experience',
    title: 'rust security bootcamp',
    description: (
      <>
        graduated from the rust security bootcamp endorsed by the solana foundation. learned rust internals, memory safety vulnerabilities, and advanced solana smart contract security principles. completed a capstone audit project executing vulnerability analysis on live solana programs.
      </>
    ),
    tags: ['rust', 'security', 'solana'],
    links: { github: undefined, live: 'https://rektoff.xyz' },
    status: 'mar 2026 - jun 2026',
  },
  {
    type: 'experience',
    title: 'turbin3 builders program',
    description: (
      <>
        completed turbin3&apos;s async and accelerated builders program emphasizing highly scalable solana smart contract architecture and dao governance mechanisms. mastered compute cost optimization and secure on-chain program development best practices.
      </>
    ),
    tags: ['rust', 'anchor', 'solana'],
    links: { github: undefined, live: 'https://turbin3.org' },
    status: 'jan 2026 - mar 2026',
  },
  {
    type: 'experience',
    title: 'ackee school of solana',
    description: (
      <>
        graduated from an intensive 9-week advanced solana developer program. achieved placement among top 13% (197 of 1,515 participants); gained expertise in solana runtime, cross-program invocations (cpi), and secure full-stack dapp development.
      </>
    ),
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
      const nextTab = tab === 'projects' ? 'experience' : 'projects';
      handleTabChange(nextTab);
    }
  };

  const nextItem = () => setCurrentIndex((prev) => (prev + 1) % currentList.length);
  const prevItem = () => setCurrentIndex((prev) => (prev - 1 + currentList.length) % currentList.length);

  return (
    <main id="main-content" className="h-dvh w-full relative overflow-hidden flex flex-col items-center justify-center px-4 page-main-adaptive md:pt-24 md:pb-16">
      <div className="w-full max-w-2xl lowercase">
        <h1 className="page-title-adaptive md:text-sm pl-1">proof of work</h1>
        
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
                className={`tab-btn-adaptive md:px-8 md:py-3 cursor-pointer md:text-[10px] ${
                  isSelected ? 'brutalist z-20 pb-[10px] md:pb-[14px]' : 'tab z-0'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`} className="w-full relative mb-4 sm:mb-8">
          <div className="brutalist relative card-padding-adaptive md:p-6 flex flex-col work-card-min-h-adaptive md:min-h-[23rem] z-10">
            <header className="flex justify-between items-center mb-2.5 sm:mb-4 border-b-2 border-dotted border-current pb-2 sm:pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-current" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs">
                  {activeTab === 'projects' ? 'project' : 'record'}_0{currentIndex + 1}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs px-2 py-0.5 sm:py-1">
                {currentItem.status}
              </span>
            </header>

            <h2 className="card-title-adaptive md:text-sm">{currentItem.title}</h2>

            <div className="card-text-adaptive md:text-xs md:leading-5 opacity-90 text-left">
              {currentItem.description}
            </div>

            <div className="mt-auto pt-3 sm:pt-4">
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-4">
                {currentItem.tags.map((tag) => (
                  <span key={tag} className="brutalist px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 sm:gap-4 mb-1 sm:mb-2">
                {currentItem.links?.github && (
                  <Link href={currentItem.links.github} target="_blank" rel="noopener noreferrer" className="font-mono text-xs sm:text-sm">
                    code
                  </Link>
                )}
                {currentItem.links?.live && (
                  <Link href={currentItem.links.live} target="_blank" rel="noopener noreferrer" className="font-mono text-xs sm:text-sm">
                    {activeTab === 'projects' ? 'live' : 'visit org'}
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 sm:-bottom-5 inset-x-0 flex justify-center items-center gap-3 sm:gap-4 z-20">
            <button aria-label={`previous ${activeTab === 'projects' ? 'project' : 'experience'}`} onClick={prevItem} className="brutalist cursor-pointer control-btn-adaptive md:w-10 md:h-10 flex items-center justify-center font-mono">
              <span aria-hidden="true" className="leading-none inline-block text-xs sm:text-sm -translate-y-[1px] translate-x-[0.5px]">&lt;</span>
            </button>

            <div className="brutalist flex gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2" role="group" aria-label={`Item ${currentIndex + 1} of ${currentList.length}`}>
              {currentList.map((_, idx) => (
                <div key={idx} className={`w-2 h-2 sm:w-2.5 sm:h-2.5 ${idx === currentIndex ? 'bg-current' : 'bg-current opacity-25'}`} />
              ))}
            </div>

            <button aria-label={`next ${activeTab === 'projects' ? 'project' : 'experience'}`} onClick={nextItem} className="brutalist cursor-pointer control-btn-adaptive md:w-10 md:h-10 flex items-center justify-center font-mono">
              <span aria-hidden="true" className="leading-none inline-block text-xs sm:text-sm -translate-y-[2px] translate-x-[1.5px]">&gt;</span>
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
