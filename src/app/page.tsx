'use client'
import ProfileCard from '@/components/profileCard'
import React, { useEffect, useState } from 'react'
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';
import Button from '@/components/button';

interface WakaTimeData {
  total_seconds?: number;
  human_readable_total?: string;
  languages?: { name: string; percent: number }[];
  [key: string]: any;
}

function Home() {
  const [stats, setStats] = useState<WakaTimeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [text, setText] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [loopNum, setLoopNum] = useState<number>(0);
  const [typingSpeed, setTypingSpeed] = useState<number>(150);

  const roles: string[] = ["developer", "builder", "solver", "learner"];

  useEffect(() => {
    const fetchWakaTimeStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/wakatime');
        if (!response.ok) throw new Error('Failed to fetch stats');

        const data: WakaTimeData = await response.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWakaTimeStats();
  }, []);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      if (isDeleting) {
        setTypingSpeed(50);
      } else {
        setTypingSpeed(100 + Math.random() * 50);
      }

      if (!isDeleting && text === fullText) {
        window.setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };

    const timer = window.setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, roles, typingSpeed]);

  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center pt-5 pb-20 px-4 sm:p-6 sm:pb-24'>

      <section className='flex flex-col lg:flex-row items-center justify-center max-w-5xl w-full gap-4 sm:gap-10'>

        <div className='flex-shrink-0 transform scale-90 sm:scale-100 origin-center transition-transform'>
          {stats && <ProfileCard data={stats} />}
        </div>
        <div className="
                    border-zinc-900 dark:border-zinc-500 border-dashed
                    w-full border-b-2 my-2 sm:my-0
                    lg:w-px lg:border-r-2 lg:border-b-0 lg:h-64 lg:mx-10
                " />

        <div className="flex-1 max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start gap-4 sm:gap-6">

          <h1 className="text-4xl sm:text-6xl font-medium leading-tight tracking-normal lowercase">
            just a{' '}
            <span className="inline-block">
              <span className="text-zinc-900 dark:text-zinc-100 font-bold tracking-wide">
                {text}
              </span>
              <span className="animate-pulse font-bold text-zinc-900 dark:text-zinc-100 ml-1">
                _
              </span>
            </span>
          </h1>

          <p className="text-md sm:text-xl text-zinc-800 dark:text-zinc-400 leading-relaxed font-normal lowercase">
            i build <span className="text-zinc-900 dark:text-zinc-100 font-bold px-1">solana</span> apps and build <span className="text-zinc-900 dark:text-zinc-100 font-bold px-1">native android</span> systems. living by the truth that <span className="italic opacity-80">i can love anything if i spend enough time with it</span>—i use that patience to bridge low-level logic with human experience.
          </p>

          <Button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              resume
            </a>
          </Button>

        </div>

      </section>
    </div>
  )
}

export default Home