'use client'
import React, { useState } from 'react';
import Link from 'next/link';

type Tab = {
    label: string;
    content: React.ReactNode;
    id: string;
};

type TabsProps = {
    tabs: Tab[];
    className?: string;
    defaultActiveTab?: number;
};

const Tabs = ({
    tabs,
    className = '',
    defaultActiveTab = 0
}: TabsProps) => {
    const [activeTab, setActiveTab] = useState(defaultActiveTab);

    if (!tabs || tabs.length === 0) {
        return null;
    }

    const isLastTab = activeTab === tabs.length - 1;
    const currentTab = tabs[activeTab];

    return (
        <div className={`tab w-full max-w-md mx-auto ${className}`}>
            <div
                role="tablist"
                aria-label="Content navigation tabs"
                className="flex overflow-hidden border-2 border-zinc-900"
            >
                {tabs.map((tab, index) => (
                    <button
                        key={tab.label}
                        role="tab"
                        aria-selected={index === activeTab}
                        aria-controls={`tabpanel-${index}`}
                        id={`tab-${index}`}
                        onClick={() => setActiveTab(index)}
                        className={`flex-1 py-2 font-bold sm:py-3 px-1 sm:px-4 text-sm sm:text-md md:text-base lg:text-lg tracking-widest transition-colors duration-200 min-w-0
                ${index === activeTab
                                ? 'bg-neutral-100 dark:bg-neutral-500 border-b-4 border-x-2 border-zinc-900'
                                : 'bg-neutral-300 border-x dark:bg-zinc-600 border-zinc-900'}
                `}
                    >
                        <span className="truncate block">{tab.label}</span>
                    </button>
                ))}
            </div>
            <div
                role="tabpanel"
                id={`tabpanel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
                className="p-4 border-neutral-900 border-2"
            >
                <div className="p-4 sm:p-4 flex-1 min-h-[200px]">
                    {currentTab?.content}
                </div>

                <div className="">
                    <div className="flex justify-end gap-5">
                        <Link
                            href={`/work/${currentTab?.id}`}
                            className="button items-center border-2 px-4 py-2 font-semibold text-xl">
                            Details
                        </Link>
                        {isLastTab && (
                            <Link
                                href="/work"
                                className="items-center px-4 py-2 button border-2 font-semibold text-xl"
                            >
                                View All
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tabs;