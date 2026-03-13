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

const STACKS = [
  { title: 'client', desc: 'designing web and native app UIs.', techs: ['next.js', 'react native'] },
  { title: 'server', desc: 'designing smart contracts and REST APIs.', techs: ['anchor', 'hono', 'sql'] }
];

const Profile = () => {
  const discordStatus = useDiscord();
  const isOffline = discordStatus === 'offline';

  return (
    <div className="relative w-24 h-24 shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <mask id="discord-cutout-square">
            <rect x="0" y="0" width="100" height="100" fill="white" />
            <rect x="78" y="78" width="30" height="30" fill="black" />
          </mask>
        </defs>

        <foreignObject x="0" y="0" width="100" height="100" mask="url(#discord-cutout-square)">
          <Image src="/pfp.jpg" alt="Profile" fill className="object-cover" />
        </foreignObject>

        <rect
          x="82"
          y="82"
          width="22"
          height="22"
          fill={isOffline ? undefined : statusColors[discordStatus as keyof typeof statusColors]}
          className={isOffline ? 'text-slate-500 dark:text-slate-400 fill-current' : ''}
        />
      </svg>
    </div>
  );
};

const WeekStats = ({ stats }: { stats: WakaTimeData | null }) => {
  const isInactive = !stats?.total_time || stats.total_time === '0 secs';

  return (
    <section className='flex flex-col gap-1 border-l-2 border-current pl-4'>
      <div className='flex items-center gap-2 font-bold text-base font-pixel-square'>
        <i className="hn hn-analytics text-xs" />
        <span>this week on keyboard</span>
      </div>

      {isInactive ? (
        <span className="italic text-sm font-pixel-square">
          was in pursuit of happyness...
        </span>
      ) : (
        <div className="flex sm:items-center gap-1 sm:gap-4 text-sm font-mono">
          <span className="font-medium text-base">{stats?.total_time}</span>
          <span className='font-black px-1'>|</span>
          <span className="text-base font-medium">
            {stats?.top_languages?.join(', ')}
          </span>
        </div>
      )}
    </section>
  );
};

export default function Home() {
  const [stats, setStats] = useState<WakaTimeData | null>(null);

  useEffect(() => {
    fetch('/api/wakatime')
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch stats'))
      .then(setStats)
      .catch(console.error);
  }, []);

  return (
    <main className="h-[100dvh] w-full relative overflow-hidden flex flex-col items-center justify-center p-6 sm:p-12 pt-10 sm:pt-28">
      <article className='max-w-2xl flex flex-col gap-4 sm:gap-10'>

        <header className='flex flex-col sm:flex-row gap-3 sm:gap-5 items-center text-center sm:text-left'>
          <Profile />
          <div>
            <p className='text-lg'>
              hey, this is <span className='font-bold underline'>parthesh purohit</span>.
            </p>
            <p className='text-base'>
              a cs undergrad, full stack dev and <span className='font-bold underline'>a human</span>.
            </p>
          </div>
        </header>

        <WeekStats stats={stats} />

        <section className='flex flex-col mt-5 gap-2 border-l-2 border-current pl-4'>
          <div className='flex items-center gap-2 font-bold text-base'>
            <i className="hn hn-heart" />
            <span>things i know:</span>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            {STACKS.map((stack) => (
              <div key={stack.title} className='brutalist p-3 flex flex-col justify-between gap-3'>
                <div>
                  <h3 className='font-bold text-sm mb-1'>{stack.title}</h3>
                  <p className='text-sm'>{stack.desc}</p>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {stack.techs.map(tech => (
                    <div key={tech} className="brutalist px-2 py-1 text-xs sm:text-sm font-bold">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className='text-base font-medium sm:col-span-2'>
              + thinking and solving on{' '}
              <a className='underline font-bold font-mono tracking-tight' href="https://codeforces.com/profile/parthesh28" target="_blank" rel="noreferrer">
                @codeforces
              </a>.
            </div>
          </div>
        </section>

      </article>
    </main>
  );
}