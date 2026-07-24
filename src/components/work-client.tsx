'use client'
import { useState, KeyboardEvent } from 'react'
import Link from 'next/link'

const projects = [
  {
    type: 'project',
    title: 'gibmoni',
    description: (
      <>
        milestone-based crowdfunding platform on solana. brings accountability through milestone-based fund releases, weighted community voting, and automated approvals. funds are locked in an anchor vault and released only when milestones pass voting.
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
        a printing utility which removes public pc logins with a secure oauth-based workflow. comprises three components: a android app for ordering, a restful api, and a rust daemon that interfaces directly with native print apis to execute jobs.
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
        a text sharing platform available across three interfaces. the core rest api (hono,sqlite) powers a next.js web app, a native cli tool written in go, and a vs code extension — allowing developers to share code snippets directly from their editor.
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
    <main id="main-content" className="h-dvh w-full relative overflow-hidden flex flex-col items-center justify-center px-4 pt-24 pb-16">
      <div className="w-full max-w-2xl lowercase">
        <h1 className="text-3xl sm:text-4xl font-bold pb-4 pl-1">proof of work</h1>
        
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
                className={`px-8 py-3 cursor-pointer font-bold text-sm ${
                  isSelected ? 'brutalist z-20 pb-[14px]' : 'tab z-0'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`} className="w-full relative mb-4 sm:mb-8">
          <div className="brutalist relative p-5 sm:p-6 flex flex-col min-h-[21rem] sm:min-h-[23rem] z-10">
            <header className="flex justify-between items-center mb-4 border-b-2 border-dotted border-current pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-current" aria-hidden="true" />
                <span className="text-sm font-bold">
                  {activeTab === 'projects' ? 'project' : 'record'}_0{currentIndex + 1}
                </span>
              </div>
              <span className="text-sm font-semibold px-2 py-1">
                {currentItem.status}
              </span>
            </header>

            <h2 className="text-3xl sm:text-4xl font-bold mb-3">{currentItem.title}</h2>

            <div className="text-sm sm:text-base leading-6 sm:leading-7 font-medium opacity-90 text-justify sm:text-left">
              {currentItem.description}
            </div>

            <div className="mt-auto pt-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {currentItem.tags.map((tag) => (
                  <span key={tag} className="brutalist px-2 py-0.5 text-[10px] sm:text-xs font-bold">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mb-2">
                {currentItem.links?.github && (
                  <Link href={currentItem.links.github} target="_blank" rel="noopener noreferrer" className="font-mono text-sm font-bold">
                    code
                  </Link>
                )}
                {currentItem.links?.live && (
                  <Link href={currentItem.links.live} target="_blank" rel="noopener noreferrer" className="font-mono text-sm font-bold">
                    {activeTab === 'projects' ? 'live' : 'visit org'}
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 inset-x-0 flex justify-center items-center gap-4 z-20">
            <button aria-label={`previous ${activeTab === 'projects' ? 'project' : 'experience'}`} onClick={prevItem} className="brutalist cursor-pointer w-10 h-10 flex items-center justify-center text-base font-bold font-mono">
              <span aria-hidden="true">&lt;</span>
            </button>

            <div className="brutalist flex gap-2 px-3 py-2" role="group" aria-label={`Item ${currentIndex + 1} of ${currentList.length}`}>
              {currentList.map((_, idx) => (
                <div key={idx} className={`w-2.5 h-2.5 ${idx === currentIndex ? 'bg-current' : 'bg-current opacity-25'}`} />
              ))}
            </div>

            <button aria-label={`next ${activeTab === 'projects' ? 'project' : 'experience'}`} onClick={nextItem} className="brutalist cursor-pointer w-10 h-10 flex items-center justify-center text-base font-bold font-mono">
              <span aria-hidden="true">&gt;</span>
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
