import Button from '@/components/button'
import ProfileCard from '@/components/profileCard'
import Tabs from '@/components/tabs';
import React, { useEffect, useState } from 'react'

function Home() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWakaTimeStats = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/wakatime');

                if (!response.ok) {
                    throw new Error('Failed to fetch WakaTime stats');
                }

                const data = await response.json();
                setStats(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWakaTimeStats();
    }, []);

    const scrollToNextSection = () => {
        const nextSection = document.getElementById('profile-section');
        nextSection?.scrollIntoView({ behavior: 'smooth' });
    };


    const ProjectContent = ({ title, description }) => (
        <div>
            <h3 className="text-3xl font-semibold mb-3">{title}</h3>
            <p className="text-lg font-semibold tracking-wide">
                {description}
            </p>
        </div>
    );
    
    const projects = [
        {
            id: "pulp",
            label: "Pulp",
            content: (
                <ProjectContent
                    title="Text sharing platform"
                    description="A comprehensive dashboard for tracking sales, inventory, and customer analytics with real-time updates and interactive charts."
                />
            )
        },
        {
            id: "blockmart",
            label: "BlockMart",
            content: (
                <ProjectContent
                    title="Shopping on Blockchain"
                    description="A modern e-commerce platform built on blockchain with direct wallet integration."
                />
            )
        },
        {
            id: "symphnony",
            label: "Symphony Ledger",
            content: (
                <ProjectContent
                    title="Copyright music on Blockchain"
                    description="A beautiful ledger app for music built to prevent copyright infringement through blockchain."
                />
            )
        }
    ];



    const Divider = ({ vertical = false }) => (
        <div className={`
            ${vertical
                ? 'hidden lg:block w-px min-h-[50vh] border-r-2'
                : 'block lg:hidden w-full h-px my-8 border-b-2'}
            border-dashed border-zinc-900 dark:border-zinc-400
        `} />
    );

    const SectionTitle = ({ children }) => (
        <p className='text-4xl text-center uppercase font-bold tracking-widest underline underline-offset-8 mb-4'>
            {children}
        </p>
    );

    return (
        <div className='flex flex-col items-center justify-center'>
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center w-full px-4 relative">
                <div className="max-w-6xl mx-auto text-center flex flex-col lg:flex-row justify-center items-center w-full">
                    <div className="flex-1 text-center lg:pr-8 mb-8 lg:mb-0">
                        <h1 className="text-7xl sm:text-8xl tracking-wide font-bold mb-4 leading-none">
                            Hey there,
                            <br />
                            Parthesh here,
                            <br />
                            a Human
                        </h1>
                    </div>

                    <Divider vertical />

                    <div className="flex-1 text-center lg:text-left lg:pl-8">
                        <p className="text-xl font-semibold sm:text-2xl tracking-wide leading-relaxed mb-8">
                            Minimalist by philosophy, builder by craft. I create simple, beautiful solutions that work—across Android, Web, and Blockchain.
                        </p>
                        <div className="flex justify-center">
                            <Button onClick={()=>{}} className='flex items-center gap-3 font-black tracking-widest'>
                                RESUME
                                <i className='hn hn-arrow-right' />
                            </Button>
                        </div>
                    </div>
                </div>

                <button
                    onClick={scrollToNextSection}
                    className="absolute bottom-8 text-4xl left-1/2 -translate-x-1/2 animate-bounce cursor-pointer duration-300"
                    aria-label="Scroll down"
                >
                    <i className='hn hn-arrow-down' />
                </button>
            </section>

            {/* Profile & Work Section */}
            <section className='flex items-center sm:min-h-screen' id="profile-section">
                <div className='flex flex-col lg:flex-row items-center justify-center gap-5'>
                    <div className='mx-4'>
                        <ProfileCard data={stats}  />
                    </div>

                    <Divider vertical />

                    <div className='p-5'>
                        <Tabs tabs={projects} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home