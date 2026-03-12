import { useState, useEffect } from 'react';

type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline';

export default function useDiscord(): DiscordStatus {
    const [status, setStatus] = useState<DiscordStatus>('offline');

    useEffect(() => {
        const userId = process.env.NEXT_PUBLIC_DISCORD_ID;
        if (!userId) return;

        let mounted = true;

        const fetchStatus = async () => {
            try {
                const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
                const data = await response.json();
                if (mounted) setStatus(data.data.discord_status);
            } catch (error) {
                console.error('Error fetching Discord status:', error);
            }
        };

        fetchStatus();
        const interval = setInterval(fetchStatus, 60000);

        return () => {
            mounted = false;
            clearInterval(interval);
        };
    }, []);

    return status;
}