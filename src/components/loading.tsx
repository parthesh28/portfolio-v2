'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const Loading = () => {
    const pathname = usePathname();
    const [order, setOrder] = useState<number[]>([]);
    const [progress, setProgress] = useState(-1); 

    useEffect(() => {
        const shuffledIndices = Array.from({ length: 16 }, (_, i) => i)
            .sort(() => Math.random() - 0.5);

        setOrder(shuffledIndices);
        setProgress(0);
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 15) {
                    clearInterval(interval);
                    setTimeout(() => setProgress(-1), 200); 
                    return 16;
                }
                return prev + 1;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [pathname]);

    if (progress === -1) return null;

    const activeIndices = new Set(order.slice(0, progress));

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-lg bg-white/30 dark:bg-black/30 cursor-wait">
            <div className="flex flex-col items-center gap-6">
                <div className="w-16 h-16 border-4 border-current p-1 grid grid-cols-4 gap-1">
                    {Array.from({ length: 16 }).map((_, i) => (
                        <div
                            key={i}
                            className={`w-full h-full ${activeIndices.has(i) ? 'bg-current' : 'bg-transparent'}`}
                        />
                    ))}
                </div>
                <p className="text-xs font-mono font-bold">
                    loading...
                </p>

            </div>
        </div>
    )
}

export default Loading;