'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';

const projects = [
  {
    type: 'project',
    title: 'printf',
    description: (
      <>
        a production-grade printing ecosystem deployed at my college. replaces public pc logins with a secure oauth-based workflow. comprises three components: a <span className="font-bold text-zinc-900 dark:text-zinc-100">react native</span> android app for ordering, a restful api gateway, and a high-performance <span className="font-bold text-zinc-900 dark:text-zinc-100">rust</span> daemon that interfaces directly with native <span className="font-bold text-zinc-900 dark:text-zinc-100">windows print apis</span> to execute jobs.
      </>
    ),
    tags: ['rust', 'react native', 'win32 api', 'systems'],
    links: { github: 'https://github.com/parthesh28/printf', live: null },
    status: 'jan 2025'
  },
  {
    type: 'project',
    title: 'pulp',
    description: (
      <>
        a developer-first text sharing platform available across three interfaces. the core restful api (<span className="font-bold text-zinc-900 dark:text-zinc-100">hono</span>/<span className="font-bold text-zinc-900 dark:text-zinc-100">sqlite</span>) powers a <span className="font-bold text-zinc-900 dark:text-zinc-100">next.js</span> web app, a native cli tool written in <span className="font-bold text-zinc-900 dark:text-zinc-100">go</span>, and a custom <span className="font-bold text-zinc-900 dark:text-zinc-100">vs code extension</span>—allowing developers to share code snippets directly from their editor environment.
      </>
    ),
    tags: ['next.js', 'go (cli)', 'vs code api', 'hono'],
    links: { github: 'https://github.com/parthesh28/pulp', live: 'https://pulpx.vercel.app' },
    status: 'june 2023'
  },
  {
    type: 'project',
    title: 'spliter',
    description: (
      <>
        a decentralized expense settlement dapp on <span className="font-bold text-zinc-900 dark:text-zinc-100">solana</span>. leverages <span className="font-bold text-zinc-900 dark:text-zinc-100">anchor</span> (<span className="font-bold text-zinc-900 dark:text-zinc-100">rust</span>) smart contracts to handle trustless fund routing and distinct splits. features a polished <span className="font-bold text-zinc-900 dark:text-zinc-100">next.js</span> frontend with real-time wallet integration, allowing users to create groups, track debts, and settle on-chain instantly.
      </>
    ),
    tags: ['solana', 'anchor (rust)', 'next.js', 'web3.js'],
    links: { github: 'https://github.com/parthesh28/spliter-sol', live: 'https://splitersol.vercel.app' },
    status: 'sept 2025'
  }
];

const experiences = [
  {
    type: 'experience',
    title: 'ackee blockchain',
    description: (
      <>
        <span className="block mb-2 font-bold text-zinc-900 dark:text-zinc-100">{`> school of solana certified`}</span>
        graduated from season 7 of the intensive blockchain security program. gained hands-on expertise in <span className="font-bold text-zinc-900 dark:text-zinc-100">solana architecture</span>, <span className="font-bold text-zinc-900 dark:text-zinc-100">rust</span> smart contracts, and the <span className="font-bold text-zinc-900 dark:text-zinc-100">anchor</span> framework. built and deployed full-stack dapps while studying security vulnerabilities and optimization patterns.
      </>
    ),
    tags: ['certification', 'solana', 'rust', 'security'],
    links: { github: undefined, live: 'https://ackee.xyz/school-of-solana' },
    status: '2025'
  },
  {
    type: 'experience',
    title: 'codex club',
    description: (
      <>
        <span className="block mb-2 font-bold text-zinc-900 dark:text-zinc-100">{`> webmaster & tech lead`}</span>
        led the technical division of the computer engineering department. revamped and maintained the club website, developed a native <span className="font-bold text-zinc-900 dark:text-zinc-100">android game</span> for the annual tech fest, and personally conducted an in-depth <span className="font-bold text-zinc-900 dark:text-zinc-100">git & github workshop</span> attended by 120+ students.
      </>
    ),
    tags: ['leadership', 'android', 'mentoring', 'web dev'],
    links: { github: undefined, live: undefined },
    status: '2024 - 2025'
  },
  {
    type: 'experience',
    title: 'text mercato',
    description: (
      <>
        <span className="block mb-2 font-bold text-zinc-900 dark:text-zinc-100">{`> freelance technical writer`}</span>
        worked as a freelance writer for 2 years, authoring technical blogs, product descriptions, and articles for third-party clients. developed strong <span className="font-bold text-zinc-900 dark:text-zinc-100">documentation</span> and communication skills essential for explaining complex technical concepts to broader audiences.
      </>
    ),
    tags: ['writing', 'communication', 'freelance', 'seo'],
    links: { github: undefined, live: 'https://textmercato.com' },
    status: '2020-2022'
  }
];

const WorkPage = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'experience'>('projects');
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentList = activeTab === 'projects' ? projects : experiences;
  const currentItem = currentList[currentIndex];

  const handleTabChange = (tab: 'projects' | 'experience') => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % currentList.length);
  };

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + currentList.length) % currentList.length);
  };

  return (
    // FIX 1: Main container uses h-[100dvh] and overflow-hidden to match the "no-scroll" app feel
    <main className="h-[100dvh] w-full relative overflow-hidden flex flex-col items-center justify-center">

      {/* FIX 2: Added scale transform. 
         - scale-[0.80] on mobile shrinks the big card so it fits without scrolling.
         - mt-20 ensures it pushes down below the fixed navbar visually.
      */}
      <div className="w-full max-w-2xl transform scale-[0.80] sm:scale-90 lg:scale-100 transition-transform mt-20 sm:mt-0">

        <div className="pb-4 pl-1">
          <h1 className="text-4xl font-bold tracking-wide lowercase">
            proof of work
          </h1>
        </div>

        <div className="flex items-end relative z-20 top-[2px]">
          <button
            onClick={() => handleTabChange('projects')}
            className={`
              px-8 py-3 font-bold text-sm tracking-widest transition-none border-2 border-zinc-900
              ${activeTab === 'projects'
                ? 'card z-20 pb-[14px]'
                : 'tab z-0 text-zinc-500'
              }
            `}
          >
            projects
          </button>

          <button
            onClick={() => handleTabChange('experience')}
            className={`
              px-8 py-3 font-bold text-sm tracking-widest transition-none border-2 border-zinc-900
              ${activeTab === 'experience'
                ? 'card z-20 pb-[14px]'
                : 'tab z-0 text-zinc-500 border-b-2'
              }
            `}
          >
            experience
          </button>
        </div>

        <div className="w-full relative mb-4 sm:mb-8">

          <div className="card relative border-2 p-5 sm:p-6 flex flex-col min-h-[22rem] sm:min-h-[24rem] z-10">

            <div className="flex justify-between items-center mb-4 border-b-2 border-dotted border-current pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-current block" />
                <span className="text-sm font-bold tracking-widest lowercase">
                  {activeTab === 'projects' ? 'project' : 'record'}_0{currentIndex + 1}
                </span>
              </div>
              <span className="text-xs font-mono border-2 border-current px-2 py-1 lowercase">
                {currentItem.status}
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-wide mb-3 lowercase">
                  {currentItem.title}
                </h2>
                {/* FIX 3: Added max-h constraint and custom scrollbar for the text description only. 
                   If text is super long, only the text scrolls, not the whole page.
                */}
                <div className="text-md sm:text-base leading-6 sm:leading-7 font-medium opacity-90 lowercase text-justify sm:text-left max-h-[150px] overflow-y-auto custom-scrollbar pr-2">
                  {currentItem.description}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentItem.tags.map(tag => (
                    <span key={tag} className="badge px-2 py-0.5 text-[10px] sm:text-xs font-bold border-2 lowercase">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-6 mb-2">
                  {currentItem.links?.github && (
                    <Link
                      href={currentItem.links.github}
                      target="_blank"
                      className="flex items-center gap-2 text-sm font-bold decoration-2 decoration-current lowercase hover:opacity-75 transition-opacity"
                    >
                      <i className="hn hn-github text-lg"></i>
                      code
                    </Link>
                  )}

                  {currentItem.links?.live && (
                    <Link
                      href={currentItem.links.live}
                      target="_blank"
                      className="flex items-center gap-2 text-sm font-bold decoration-2 decoration-current lowercase hover:opacity-75 transition-opacity"
                    >
                      <i className="hn hn-link text-lg"></i>
                      {activeTab === 'projects' ? 'live demo' : 'visit org'}
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 left-0 w-full flex justify-center items-center gap-4 z-20">
              <button onClick={prevItem} className="button w-10 h-10 border-2 flex items-center justify-center transition-none active:translate-y-1 active:shadow-none">
                <i className="hn hn-arrow-left text-lg"></i>
              </button>

              <div className="card flex gap-2 px-3 py-2 border-2">
                {currentList.map((_, idx) => (
                  <div key={idx} className={`w-2 h-2 ${idx === currentIndex ? 'bg-current' : 'bg-gray-400 dark:bg-zinc-600'}`} />
                ))}
              </div>

              <button onClick={nextItem} className="button w-10 h-10 border-2 flex items-center justify-center transition-none active:translate-y-1 active:shadow-none">
                <i className="hn hn-arrow-right text-lg"></i>
              </button>
            </div>

          </div>
        </div>

        <Link
          href="https://github.com/parthesh28?tab=repositories"
          target="_blank"
          className="flex flex-col items-center gap-1 group mt-20 sm:mt-4"
        >
          <span className="text-sm font-bold tracking-widest lowercase opacity-70">
            [ view full archive ]
          </span>
        </Link>
      </div>

    </main>
  )
}

export default WorkPage