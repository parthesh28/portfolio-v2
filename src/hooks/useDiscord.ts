import { useState, useEffect } from 'react';

type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline';

const USER_ID = process.env.NEXT_PUBLIC_DISCORD_ID;

export default function useDiscord(): DiscordStatus {
    const [status, setStatus] = useState<DiscordStatus>('offline');

    useEffect(() => {
        if (!USER_ID) return;

        const fetchStatus = async () => {
            try {
                const res = await fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`);
                const { data } = await res.json();
                setStatus(data.discord_status);
            } catch {
                setStatus('offline');
            }
        };

        fetchStatus();
        const interval = setInterval(fetchStatus, 60000);

        return () => clearInterval(interval);
    }, []);

    return status;
}