'use client'

import { useEffect, useState } from 'react'
import Badge from '@/components/badge';
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';
import ProfileAvatar from '@/components/profileAvatar';

interface WakaTimeData {
  total_seconds?: number;
  human_readable_total?: string;
  languages?: { name: string; percent: number }[];
  total_time?: string;
  top_languages?: string[];
  [key: string]: any;
}

function Home() {
  const [stats, setStats] = useState<WakaTimeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const frontendStack = ['Next.js', 'React Native'];
  const backendStack = ['anchor', 'Hono'];

  useEffect(() => {
    const fetchWakaTimeStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/wakatime');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWakaTimeStats();
  }, []);

  const WeekStats = () => {
    const isInactive = !stats?.total_time || stats.total_time === '0 secs';

    return (
      <div className='flex flex-col gap-1 border-l-2 border-zinc-600 dark:border-zinc-600 pl-4'>
        <div className='flex items-center gap-2'>
          <i className="hn hn-analytics text-xs"></i>
          <span className="font-bold text-md tracking-widest ">this week on keyboard</span>
        </div>

        {isInactive ? (
          <span className="italic text-sm">
            was in pursuit of happyness...
          </span>
        ) : (
          <div className="flex flex-row sm:items-center gap-1 sm:gap-4 text-sm">
            <span className="font-medium text-md">{stats?.total_time}</span>
            <span className='font-black px-1' >|</span>
            <span className="text-md font-medium lowercase">
              {stats?.top_languages?.join(', ')}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <main className='min-h-[100dvh] w-full flex items-center justify-center p-6 sm:p-12 pt-10 sm:pt-28'>
      <div className='max-w-2xl w-full flex flex-col gap-4 sm:gap-10'>
        <div className='w-full flex flex-col sm:flex-row gap-3 sm:gap-5 items-center'>
          <ProfileAvatar src="/profile.jpg" />
          <div className='flex-1 text-center sm:text-left'>
            <p className='text-xl leading-relaxed'>
              hey, this is <span className='font-medium underline'>parthesh purohit,</span>.
            </p>
            <p className='text-md leading-relaxed'>
              a computer science undergrad, full-stack dev and <span className='font-bold tracking-wide underline underline-offset-1'>a human</span>.
            </p>
          </div>
        </div>

        <WeekStats />

        <div className='flex flex-col pt-2 gap-2 border-l-2 border-zinc-600 dark:border-zinc-600 pl-4'>
          <div className='flex items-center gap-2'>
            <i className="hn hn-heart text-md"></i>
            <span className="font-bold text-md tracking-widest">things i know:</span>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            <div className='card border-2 border-zinc-900 dark:border-zinc-200 p-3 flex flex-col justify-between gap-3'>
              <div>
                <h3 className='font-bold text-sm mb-1'>frontend</h3>
                <p className='text-sm leading-relaxed'>
                designing interfaces for the web and native platforms.
                </p>
              </div>
              <div className='flex flex-wrap gap-2'>
                {frontendStack.map(tech => (
                  <Badge key={tech} className='badge border-zinc-400 dark:border-zinc-600'>{tech}</Badge>
                ))}
              </div>
            </div>

            <div className='card border-2 border-zinc-900 dark:border-zinc-200 p-3 flex flex-col justify-between gap-3'>
              <div>
                <h3 className='font-bold text-sm mb-1'>backend</h3>
                <p className='text-sm leading-relaxed'>
                 writing contracts on solana and developing REST APIs.
                </p>
              </div>
              <div className='flex flex-wrap gap-2'>
                {backendStack.map(tech => (
                  <Badge key={tech} className='badge border-zinc-400 dark:border-zinc-600'>{tech}</Badge>
                ))}
              </div>
              
            </div>
            <div className='text-md font-medium'>
              + practicing critical thinking with <span className='not-italic font-bold tracking-wide'>java @ <a  className='underline cursor-pointer font-bold underline-offset-1' href="https://codeforces.com/profile/parthesh28">codeforces</a></span>.
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home