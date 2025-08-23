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
    total_time: string;
    top_languages: string[];
};

type Props = {
    data: WakaTimeData;
};


const ProfileCard = ({
    data
}: Props) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const discordStatus = useDiscord();

    const skills = {
        WEB: ['Next.js', 'Hono'],
        WEB3: ['Rust', 'Anchor'],
        MOBILE: ['React Native', 'Expo']
    };

    const socialLinks = [
        { href: 'https://github.com', icon: 'hn-github' },
        { href: 'https://linkedin.com', icon: 'hn-linkedin' },
        { href: 'mailto:contact@example.com', icon: 'hn-envelope' },
        { href: 'https://x.com', icon: 'hn-x' }
    ];



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

    const FlipButton = () => (
        <Button
            className='absolute top-2.5 right-2.5 w-8 h-8 flex items-center justify-center'
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <i className="hn hn-refresh-solid"></i>
        </Button>
    );

    const InfoItem = ({ label, value }) => (
        <div className="flex gap-1">
            <span className="font-bold text-md tracking-widest">{label}</span>
            <span className="font-semibold text-md">{value}</span>
        </div>
    );

    const WeekStats = () => (
        <>
            <div className='flex items-center gap-2'>
                <i className="hn hn-analytics"></i>
                <span className="font-bold text-lg tracking-widest">This week on keyboard:</span>
            </div>
            <div className="flex gap-10 mt-2 sm:flex-row sm:gap-4">
                <div className="flex items-center gap-2">
                    <i className='hn hn-clock' />
                    <span className="font-semibold text-md">{data?.total_time}</span>
                </div>
                <div className="flex items-center gap-2">
                    <i className="hn hn-code-block-solid"></i>
                    <span className="font-semibold text-md tracking-widest">{data?.top_languages.join(', ')}</span>
                </div>
            </div>
        </>
    );


    function calculateAge( birthDate :string) {
        const today = new Date();
        const birth = new Date(birthDate);

        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();

        // Adjust for negative months
        if (months < 0) {
            years--;
            months += 12;
        }
        if (today.getDate() < birth.getDate()) {
            months--;
            if (months < 0) {
                years--;
                months += 12;
            }
        }

        return { years, months };
    }

    const age = calculateAge("2003-10-23");
    console.log(age); // { years: 21, months: 8 } (example)

    const profileInfo = [
        { label: 'Status:', value: 'Online' },
        { label: 'Age:', value: `${age.years} Yrs ${age.months} Mon` },
        { label: 'Authenti-City:', value: 'Mumbai' },
        { label: 'Degree:', value: 'B.E. In Computers' }
    ];
    const FrontContent = () => (
        <div className="h-full flex flex-col">
            <div className='py-1.5 px-4'>
                <div className="flex items-center gap-3 mb-1">
                    <div className="logo w-8 h-8 p-1 border-2 flex items-center justify-center">
                        <CheckboxIcon />
                    </div>
                    <div className="text">
                        <p className="text-lg font-bold tracking-widest">
                            Parthesh Purohit
                        </p>
                        <p className="text-sm tracking-wide">
                            Professional Vibe Coder
                        </p>
                    </div>
                </div>
                <PixelSeparator />
            </div>

            <div className='flex gap-3 p-4'>
                <div className='flex flex-col items-center'>
                    <div className='w-25 h-32 sm:w-30 sm:h-30 border-[3px] border-stone-800 dark:border-zinc-500 overflow-hidden'>
                        <Image
                            width={50}
                            height={50}
                            quality={100}
                            src="/Profile_Picture.jpg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="flex items-center mt-2">
                        <span
                            className={`w-2 h-2 rounded-full mr-2 ${discordStatus === 'online' ? 'bg-green-500' :
                                discordStatus === 'idle' ? 'bg-yellow-500' :
                                    'bg-red-500'
                                }`}
                        />
                        <p className='font-bold tracking-widest'> {discordStatus.charAt(0).toUpperCase() + discordStatus.slice(1)}</p>
                    </span>
                </div>

                <div>
                    <div className='mb-4 mt-4 sm:mt-0 flex flex-col justify-start gap-2 flex-1'>
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

            <div className='px-4 block lg:hidden'>
                <PixelSeparator />
            </div>

            <div className='p-4 block lg:hidden'>
                <WeekStats />
            </div>

            <div className='flex flex-col items-center justify-center mt-auto'>
                <PixelSeparator />
                <p className="quote text-lg p-1 sm:p-1.5 font-bold justify-center tracking-widest">
                    ॥ तत्त्वमसि ॥
                </p>
            </div>
        </div>
    );

    const SectionHeader = ({ title }) => (
        <div className='flex gap-2 p-3 items-center justify-center'>
            <h1 className="text-xl tracking-wide font-bold underline underline-offset-8">
                {title}
            </h1>
        </div>
    );

    const BackContent = () => (
        <div className="h-full flex flex-col">
            <SectionHeader title="Expertise" />

            <div className='px-5 pt-1'>
                <div className="space-y-3">
                    {Object.entries(skills).map(([category, items]) => (
                        <div key={category} className="flex flex-col sm:flex-row gap-2 items-center">
                            <span className="text-md font-bold uppercase tracking-widest w-13 flex-shrink-0">
                                {category}:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {items.map(skill => (
                                    <Badge key={skill}>
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <SectionHeader title="Connect" />

            <div className='flex justify-center items-center gap-2'>
                {socialLinks.map((social, index) => (
                    <Link
                        key={index}
                        className='socials p-2 w-10 h-10 border-2 text-2xl text-white flex items-center justify-center'
                        href={social.href}
                    >
                        <i className={`hn ${social.icon}`}></i>
                    </Link>
                ))}
            </div>

            <div className='flex flex-col items-center justify-center mt-8 pt-2 sm:mt-5 border-black'>
                <PixelSeparator />
                <Link href={'https://buymecoffee.com/parthesh28'} className="underline text-md font-bold p-1 sm:p-1.5 tracking-widest">
                    Buy Me Coffee
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
                    className={`relative w-full h-full transition-transform duration-700 ease-in-out ${isFlipped ? 'rotate-y-180' : ''}`}
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                >
                    <div className={`absolute w-full h-full`} style={{ backfaceVisibility: 'hidden' }}>
                        <div className="card h-full border-2 relative overflow-hidden">
                            <FlipButton />
                            <FrontContent />
                        </div>
                    </div>

                    <div className={'absolute w-full h-full'} style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}>
                        <div className="card h-full card-shadow border-2 relative overflow-hidden">
                            <FlipButton />
                            <BackContent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;