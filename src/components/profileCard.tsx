'use client'

import React, { useState } from 'react';
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';
import Link from 'next/link';
import Button from './button';
import Badge from './badge';
import CheckboxIcon from './checkBox';
import Image from 'next/image';
import useDiscord from '@/hooks/useDiscord';

type WakaTimeData = {
    total_seconds?: number;
    human_readable_total?: string;
    languages?: { name: string; percent: number }[];
    [key: string]: any;
};

type Props = {
    data: WakaTimeData;
};

const PixelSeparator = () => (
    <div className="w-full h-0.5"
        style={{
            backgroundImage: `repeating-linear-gradient(
                        90deg,
                        currentColor 0px,
                        currentColor 2px,
                        transparent 2px,
                        transparent 4px
                        )`,
            imageRendering: 'pixelated'
        }}
    />
);

const FlipButton = ({ onClick, isFlipped }: { onClick: () => void, isFlipped: boolean }) => (
    <Button
        className='absolute top-2.5 right-2.5 w-8 h-8 flex items-center justify-center z-50'
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}
    >
        <i className="hn hn-refresh-solid"></i>
    </Button>
);

const InfoItem = ({ label, value }: { label: string, value: string }) => (
    <div className="flex gap-1">
        <span className="font-bold text-md tracking-widest">{label}</span>
        <span className="font-semibold text-md">{value}</span>
    </div>
);

const SectionHeader = ({ title }: { title: string }) => (
    <div className='flex gap-2 pt-3 items-center justify-center'>
        <h1 className="text-xl tracking-wide font-bold underline underline-offset-8">
            {title}
        </h1>
    </div>
);

const ProfileCard = ({ data }: Props) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const discordStatus = useDiscord();

    const skills = {
        languages: ['rust', 'java', 'typescript'],
        frameworks: ['next.js', 'react-native'],
        backend: ['hono', 'sql', 'sqlite'],
        domains: ['solana', 'systems'],
    };

    const toggleFlip = () => setIsFlipped(prev => !prev);

    const WeekStats = () => {
        const isInactive = !data?.total_time || data.total_time === '0 secs';

        return (
            <>
                <div className='flex items-center gap-2'>
                    <i className="hn hn-analytics"></i>
                    <span className="font-bold text-lg tracking-widest">this week on keyboard:</span>
                </div>

                {isInactive ? (
                    <div className="mt-2">
                        <span className="font-semibold text-md tracking-widest italic opacity-80">
                            was in pursuit of happyness this week...
                        </span>
                    </div>
                ) : (
                    <div className="flex gap-10 mt-2 sm:flex-row sm:gap-4">
                        <div className="flex items-center gap-2">
                            <i className='hn hn-clock' />
                            <span className="font-semibold text-md">{data?.total_time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="hn hn-code-block-solid"></i>
                            <span className="font-semibold text-md tracking-widest lowercase">
                                {data?.top_languages?.join(', ')}
                            </span>
                        </div>
                    </div>
                )}
            </>
        );
    };

    function calculateAge(birthDate: string) {
        const today = new Date();
        const birth = new Date(birthDate);
        let years = today.getFullYear() - birth.getFullYear();
        return { years };
    }

    const age = calculateAge("2003-10-23");

    const profileInfo = [
        { label: 'status:', value: 'online' },
        { label: 'age:', value: `${age.years} years` },
        { label: 'authenti-city:', value: 'mumbai' },
        { label: 'studies:', value: 'b.e. in computers' }
    ];

    const FrontContent = () => (
        <div className="h-full flex flex-col">
            <div className='py-1.5 px-4'>
                <div className="flex items-center gap-3 mb-1">
                    <div className="logo w-8 h-8 p-1 border-2 flex items-center justify-center">
                        <CheckboxIcon />
                    </div>
                    <div className="text">
                        <p className="text-lg font-bold tracking-widest underline">
                            parthesh purohit
                        </p>
                        <p className="text-sm tracking-wide">
                            just a human
                        </p>
                    </div>
                </div>
                <PixelSeparator />
            </div>
            <div className='flex-1 flex flex-col'>

                <div className='flex gap-3 p-4'>
                    <div className='flex flex-col items-center'>
                        <div className='w-25 h-25 sm:w-30 sm:h-30 overflow-hidden'>
                            <Image
                                width={50}
                                height={50}
                                quality={100}
                                src="/pfp.jpg"
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <span className="flex items-center mt-2">
                            <span
                                className={`w-2 h-2 rounded-full mr-2 ${discordStatus === 'online' ? 'bg-green-500' :
                                    discordStatus === 'idle' ? 'bg-yellow-500' :
                                        'bg-red-500'
                                    }`}
                            />
                            <p className='font-bold tracking-widest'> {discordStatus.charAt(0).toLowerCase() + discordStatus.slice(1)}</p>
                        </span>
                    </div>

                    <div className='flex-1'>
                        <div className='mb-4 mt-4 sm:mt-0 flex flex-col justify-start gap-2'>
                            {profileInfo.slice(1).map((item, index) => (
                                <InfoItem key={index} label={item.label} value={item.value} />
                            ))}
                        </div>
                        
                        <div className='hidden lg:block'>
                            <PixelSeparator />
                        </div>
                        <div className='mt-4 hidden lg:block'>
                            <WeekStats />
                        </div>
                    </div>
                </div>

                <div className='block lg:hidden mt-5'>
                    <div className='px-4'>
                        <PixelSeparator />
                    </div>
                    <div className='p-4'>
                        <WeekStats />
                    </div>
                </div>
            </div>

            <div className='flex flex-col px-4 items-center justify-center pb-2'>
                <PixelSeparator />
                <p className="quote text-lg p-1 sm:p-1.5 font-bold justify-center tracking-widest">
                    ॥ तत्त्वमसि ॥
                </p>
            </div>
        </div>
    );

    const BackContent = () => (
        <div className="h-full flex flex-col">
            <SectionHeader title="things i love right now" />

            <div className='px-8 py-8 flex-1 flex flex-col'>
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-4 content-between">
                    {Object.entries(skills).map(([category, items]) => (
                        <div key={category} className="flex flex-col gap-1">
                            <span className="text-md font-bold tracking-widest lowercase border-b border-dashed border-gray-400/50 w-max mb-1">
                                {category}:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {items.map(skill => (
                                    <Badge key={skill}>
                                        {skill.toLowerCase()}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex flex-col items-center justify-center mt-auto border-black'>
                <PixelSeparator />
                <Link href={'https://buymeacoffee.com/parthesh28'} className="underline text-md font-bold p-1 sm:p-1.5 tracking-widest lowercase">
                    buy me coffee
                </Link>
            </div>
        </div>
    );

    return (
        <div className="flex items-center justify-center">
            <div
                className="perspective-1000 w-[20rem] h-[27rem] lg:w-[32rem] lg:h-[20rem]"
                style={{ perspective: '1000px' }}
            >
                <div
                    className="relative w-full h-full transition-transform duration-700 ease-in-out"
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                >
                    <div
                        className="absolute w-full h-full bg-card-color"
                        style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            pointerEvents: isFlipped ? 'none' : 'auto',
                            zIndex: isFlipped ? 0 : 10
                        }}
                    >
                        <div className="card h-full border-2 relative overflow-hidden">
                            <FlipButton onClick={toggleFlip} isFlipped={isFlipped} />
                            <FrontContent />
                        </div>
                    </div>

                    <div
                        className="absolute w-full h-full bg-card-color"
                        style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            pointerEvents: isFlipped ? 'auto' : 'none',
                            zIndex: isFlipped ? 10 : 0
                        }}
                    >
                        <div className="card h-full card-shadow border-2 relative overflow-hidden">
                            <FlipButton onClick={toggleFlip} isFlipped={isFlipped} />
                            <BackContent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;