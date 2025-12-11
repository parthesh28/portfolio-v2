'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';

const BitLoader = () => {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const [bits, setBits] = useState<boolean[]>(Array(16).fill(false));

    useEffect(() => {
        setLoading(true);
        setBits(Array(16).fill(false));

        let filledCount = 0;
        const totalBits = 16;

        const interval = setInterval(() => {
            setBits(prev => {
                const newBits = [...prev];
                const emptyIndices = newBits
                    .map((val, idx) => val ? -1 : idx)
                    .filter(idx => idx !== -1);

                if (emptyIndices.length === 0) return newBits;

                const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
                newBits[randomIndex] = true;

                filledCount++;
                return newBits;
            });

            if (filledCount >= totalBits) {
                clearInterval(interval);
                setTimeout(() => setLoading(false), 200);
            }
        }, 50);

        return () => {
            clearInterval(interval);
        }
    }, [pathname]);

    if (!loading) return null;

    return (
        // CHANGED: Added backdrop-blur-md and semi-transparent bg
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center backdrop-blur-md bg-white/30 dark:bg-black/30 cursor-wait transition-all duration-300">

            <div className="flex flex-col items-center gap-6">

                {/* THE BIT BUCKET CONTAINER */}
                {/* Added bg-white/black inside the box to make the bits pop against the blur */}
                <div className="relative w-16 h-16 border-4 border-zinc-900 dark:border-zinc-100 p-1">

                    {/* 4x4 GRID */}
                    <div className="grid grid-cols-4 grid-rows-4 gap-1 w-full h-full">
                        {bits.map((active, i) => (
                            <div
                                key={i}
                                className={`
                                    w-full h-full transition-colors duration-0
                                    ${active
                                        ? 'bg-zinc-900 dark:bg-zinc-100'
                                        : 'bg-transparent'
                                    }
                                `}
                            />
                        ))}
                    </div>

                    {/* DECORATIVE: Corner Pixels */}
                 
                </div>

                {/* TEXT - Added drop shadow for readability over blurred content */}
                <p className="text-xs font-bold tracking-[0.2em] lowercase text-zinc-900 dark:text-zinc-100 animate-pulse drop-shadow-md">
                    loading...
                </p>

            </div>
        </div>
    )
}

export default BitLoader;