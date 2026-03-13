'use client'
import { useState } from 'react'
import Link from 'next/link'

const projects = [
  {
    type: 'project',
    title: 'printf',
    description: (
      <>
        a printing utility which removes public pc logins with a secure oauth-based workflow. comprises three components: a android app for ordering, a restful api, and a rust daemon that interfaces directly with native print apis to execute jobs.
      </>
    ),
    tags: ['rust', 'react native', 'systems'],
    links: { github: 'https://github.com/parthesh28/printf', live: null },
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
    links: { github: 'https://github.com/parthesh28/pulp', live: 'https://pulpx.vercel.app' },
    status: 'june 2023',
  },
  {
    type: 'project',
    title: 'spliter',
    description: (
      <>
        a decentralized expense settlement app. use smart contracts to handle trustless fund routing and distinct splits. next.js frontend with real-time wallet integration, allowing users to create groups, track debts, and settle on-chain instantly.
      </>
    ),
    tags: ['solana', 'anchor', 'next.js', 'web3.js'],
    links: { github: 'https://github.com/parthesh28/spliter_sol', live: 'https://splitersol.vercel.app' },
    status: 'sept 2025',
  },
];

const experiences = [
  {
    type: 'experience',
    title: 'ackee blockchain',
    description: (
      <>
        <span className="block mb-2 font-bold">{`> school of solana 7`}</span>
        graduated from season 7 of school of solana. learned the basics of solana architecture, rust, and the anchor framework. built and deployed a full-stack dapp.
      </>
    ),
    tags: ['solana', 'rust'],
    links: { github: undefined, live: 'https://ackee.xyz/school-of-solana' },
    status: '2025',
  },
  {
    type: 'experience',
    title: 'turbin3',
    description: (
      <>
        <span className="block mb-2 font-bold">{`> async builders`}</span>
        part of the async builders program by turbin3 focused on smart contract techniques and project development. covers architecture design, optimization, and communication skills.
      </>
    ),
    tags: ['anchor', 'rust'],
    links: { github: undefined, live: 'https://turbin3.org' },
    status: '2026',
  },
  {
    type: 'experience',
    title: 'superteam india',
    description: (
      <>
        <span className="block mb-2 font-bold">{`> solana india fellowship`}</span>
        part of the solana india fellowship program by superteam india. deep diving into defi protocols, nft marketplaces, gaming infrastructure, dao governance systems, and emerging web3 primitives.
      </>
    ),
    tags: ['defi', 'rust', 'solana'],
    links: { github: undefined, live: 'https://fellowship.superteamin.fun/' },
    status: '2026',
  },
];

const Work = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'experience'>('projects');
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentList = activeTab === 'projects' ? projects : experiences;
  const currentItem = currentList[currentIndex];

  const handleTabChange = (tab: 'projects' | 'experience') => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const nextItem = () => setCurrentIndex((prev) => (prev + 1) % currentList.length);
  const prevItem = () => setCurrentIndex((prev) => (prev - 1 + currentList.length) % currentList.length);

  return (
    <main className="h-[100dvh] w-full relative overflow-hidden flex flex-col items-center justify-center px-4 pt-45 pb-32">
      <div className="w-full max-w-2xl lowercase">
        <h1 className="text-3xl sm:text-4xl font-bold pb-4 pl-1">proof of work</h1>
        <div className="flex items-end relative z-20 top-[2px]">
          {(['projects', 'experience'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-8 py-3 cursor-pointer font-bold text-sm ${activeTab === tab ? 'brutalist z-20 pb-[14px]' : 'tab z-0'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="w-full relative mb-4 sm:mb-8">
          <div className="brutalist relative p-5 sm:p-6 flex flex-col min-h-[23rem] z-10">
            <header className="flex justify-between items-center mb-4 border-b-2 border-dotted border-current pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-current" />
                <span className="text-sm font-bold">
                  {activeTab === 'projects' ? 'project' : 'record'}_0{currentIndex + 1}
                </span>
              </div>
              <span className="text-sm font-semibold px-2 py-1">
                {currentItem.status}
              </span>
            </header>

            <h2 className="text-3xl sm:text-4xl underline font-bold mb-3">{currentItem.title}</h2>

            <div className="text-sm sm:text-base leading-6 sm:leading-7 font-medium opacity-90 text-justify sm:text-left max-h-[150px] overflow-y-auto pr-2">
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
                  <Link href={currentItem.links.github} target="_blank" className="underline font-mono text-sm font-bold">
                    code
                  </Link>
                )}
                {currentItem.links?.live && (
                  <Link href={currentItem.links.live} target="_blank" className="underline font-mono text-sm font-bold">
                    {activeTab === 'projects' ? 'live' : 'visit org'}
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 inset-x-0 flex justify-center items-center gap-4 z-20">
            <button aria-label="previous item" onClick={prevItem} className="brutalist cursor-pointer w-10 h-10 flex items-center justify-center active:translate-y-1">
              <i className="hn hn-arrow-left text-lg" />
            </button>

            <div className="brutalist flex gap-2 px-3 py-2">
              {currentList.map((_, idx) => (
                <div key={idx} className={`w-2 h-2 ${idx === currentIndex ? 'bg-current' : 'bg-gray-400 dark:bg-zinc-500'}`} />
              ))}
            </div>

            <button aria-label="next item" onClick={nextItem} className="brutalist cursor-pointer w-10 h-10 flex items-center justify-center active:translate-y-1">
              <i className="hn hn-arrow-right text-lg" />
            </button>
          </div>
        </div>

        <Link
          href="https://github.com/parthesh28?tab=repositories"
          target="_blank"
          className="block text-center mt-10 sm:mt-4 text-sm font-bold tracking-widest"
        >
          [ view all projects ]
        </Link>
      </div>
    </main>
  );
};

export default Work;