'use client'
import Image from "next/image"
import { useEffect, useState } from 'react'
import useDiscord from "@/hooks/useDiscord";

type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline';

const statusColors: Record<Exclude<DiscordStatus, 'offline'>, string> = {
  online: '#22c55e',
  idle: '#eab308',
  dnd: '#ef4444',
};

interface WakaTimeData {
  total_time?: string;
  top_languages?: string[];
}

const Profile = () => {
  const discordStatus = useDiscord() as DiscordStatus;
  const isOffline = discordStatus === 'offline';

  return (
    <div className="relative w-24 h-24">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <mask id="discord-cutout-square">
            <rect x="0" y="0" width="100" height="100" fill="white" />
            <rect x="78" y="78" width="30" height="30" fill="black" />
          </mask>
        </defs>

        <foreignObject x="0" y="0" width="100" height="100" mask="url(#discord-cutout-square)">
          <div className="relative w-full h-full">
            <Image src="/pfp.jpg" alt="Profile" fill className="object-cover" />
          </div>
        </foreignObject>

        <g transform="translate(82, 82)">
          <rect
            width="22"
            height="22"
            fill={isOffline ? undefined : statusColors[discordStatus as keyof typeof statusColors]}
            className={isOffline ? 'text-slate-500 dark:text-slate-400 fill-current' : ''}
          />
        </g>
      </svg>
    </div>
  );
};

const WeekStats = ({ stats }: { stats: WakaTimeData | null }) => {
  const isInactive = !stats?.total_time || stats.total_time === '0 secs';

  return (
    <div className='flex flex-col gap-1 border-l-2 border-current pl-4'>
      <div className='flex items-center gap-2'>
        <i className="hn hn-analytics text-xs"></i>
        <span className="font-bold text-md font-pixel-square">this week on keyboard</span>
      </div>
      {isInactive ? (
        <span className="italic text-sm font-pixel-square">
          was in pursuit of happyness...
        </span>
      ) : (
        <div className="flex flex-row sm:items-center gap-1 sm:gap-4 text-sm">
          <span className="font-medium text-md font-mono">{stats?.total_time}</span>
          <span className='font-black px-1'>|</span>
          <span className="text-md font-medium lowercase font-mono">
            {stats?.top_languages?.join(', ')}
          </span>
        </div>
      )}
    </div>
  );
};

const frontendStack = ['next.js', 'react native'];
const backendStack = ['anchor', 'Hono', 'SQL'];

function Home() {
  const [stats, setStats] = useState<WakaTimeData | null>(null);

  useEffect(() => {
    const fetchWakaTimeStats = async () => {
      try {
        const response = await fetch('/api/wakatime');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWakaTimeStats();
  }, []);

  return (
    <main className="page-container p-6 sm:p-12 pt-10 sm:pt-28">
      <div className='max-w-2xl w-full flex flex-col gap-4 sm:gap-10'>
        <div className='w-full flex flex-col sm:flex-row gap-3 sm:gap-5 items-center'>
          <Profile />
          <div className='flex-1 text-center sm:text-left'>
            <p className='text-lg font-pixel-square'>
              hey, this is <span className='font-bold underline'>parthesh purohit</span>.
            </p>
            <p className='text-md leading-relaxed font-pixel-square'>
              a cs undergrad, full stack dev and <span className='font-bold underline underline-offset-1'>a human</span>.
            </p>
          </div>
        </div>

        <WeekStats stats={stats} />

        <div className='flex flex-col mt-5 gap-2 border-l-2 border-current pl-4'>
          <div className='flex items-center gap-2'>
            <i className="hn hn-heart text-md"></i>
            <span className="font-bold text-md">things i know:</span>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 font-pixel-square'>
            <div className='card p-3 flex flex-col justify-between gap-3'>
              <div>
                <h3 className='font-bold text-sm mb-1'>client</h3>
                <p className='text-sm leading-relaxed'>designing web and native app UIs.</p>
              </div>
              <div className='flex flex-wrap gap-2'>
                {frontendStack.map(tech => (
                  <div
                    key={tech}
                    className={`badge relative inline-flex items-center justify-center px-2 py-0.5`}>
                    <span className="text-xs sm:text-sm font-bold lowercase">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className='card p-3 flex flex-col justify-between gap-3'>
              <div>
                <h3 className='font-bold text-sm mb-1'>server</h3>
                <p className='text-sm leading-relaxed'>designing smart contracts and REST APIs.</p>
              </div>
              <div className='flex flex-wrap gap-2'>
                {backendStack.map(tech => (
                  <div
                    key={tech}
                    className={`badge relative inline-flex items-center justify-center px-2 py-0.5`}>
                    <span className="text-xs sm:text-sm font-bold lowercase">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className='text-md font-medium'>
              + thinking and solving on{' '}
              <a className='underline cursor-pointer font-bold font-mono tracking-tight underline-offset-1' href="https://codeforces.com/profile/parthesh28">
                @codeforces
              </a>.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;