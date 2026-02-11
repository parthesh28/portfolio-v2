'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import useDiscord from '@/hooks/useDiscord';
import Badge from '@/components/badge';
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';
import { ActivityCalendar } from 'react-activity-calendar';
import StatusProfile from '@/components/profileAvatar';
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

  const [contribs, setContribs] = useState<any[]>([]);
  const [loadingGithub, setLoadingGithub] = useState(true);

  const [calendarDays, setCalendarDays] = useState(100);

  const stack = ['solana', 'ui/ux', 'systems', 'data structures'];

  useEffect(() => {
    const handleResize = () => {
      setCalendarDays(window.innerWidth > 640 ? 250 : 151);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const username = 'parthesh28';
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        const json = await res.json();
        setContribs(json.contributions);
      } catch (error) {
        console.error("Failed to fetch github stats", error);
      } finally {
        setLoadingGithub(false);
      }
    };
    fetchGithub();
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
          <span className="italic opacity-50 text-sm">
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
    <main className='min-h-[100dvh] w-full flex items-center justify-center p-6 sm:p-12 pt-20 sm:pt-28'>
      <div className='max-w-2xl w-full flex flex-col gap-8 sm:gap-10'>

        <div className='w-full flex flex-col sm:flex-row gap-3 sm:gap-8 items-center'>
          <ProfileAvatar
            src="/profile.jpg"
          />
          <div className= 'flex-1'>
            <p className='text-xl leading-relaxed'>
              hey, this is <span className='font-medium underline'>parthesh purohit,</span> a human.
            </p>
            <p className='text-base sm:text-lg leading-relaxed'>  
                currently learning distributed systems and solana.
            </p>
          </div>
        </div>

        <div className='w-full border-l-2 border-zinc-600 dark:border-zinc pl-4'>
          <div className='flex items-center gap-2 mb-2'>
            <i className="hn hn-github text-md"></i>
            <span className="font-bold text-md tracking-widest">contributions</span>
          </div>

          {!loadingGithub && contribs.length > 0 && (
            <div className='w-full overflow-x-auto'>
              <ActivityCalendar
                data={contribs.slice(-calendarDays)}
                theme={{
                  light: ['#f5f5f5', '#bfbfbf', '#8c8c8c', '#525252', '#1a1a1a'],
                  dark: ['#535357', '#71717a', '#a1a1aa', '#d4d4d8', '#f4f4f5'],
                }}
                blockSize={10}
                blockMargin={3}
                fontSize={13}
                showWeekdayLabels
                renderBlock={(block, activity) => (
                  React.cloneElement(block, {
                    style: {
                      ...block.props.style,
                      borderRadius: '2px',
                    },
                  })
                )}
                labels={{
                  totalCount: `{{count}} commits in last ${calendarDays} days`
                }}
              />
            </div>
          )}
        </div>
        <WeekStats />

        <div className='pb-5 border-l-2 border-zinc-600 dark:border-zinc pl-4'>
          <div className='flex items-center gap-2'>
            <i className="hn hn-heart-solid text-md"></i>
            <span className="font-bold text-md tracking-widest">things i am in love with</span>
          </div>
          <div className='flex flex-wrap gap-2'>
            {stack.map((tech) => (
              <Badge key={tech} className='text-sm px-3 py-1.5 border-zinc-300 dark:border-zinc-700'>
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home