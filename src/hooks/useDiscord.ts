import { useState, useEffect } from 'react';

export default function useDiscord() {
    const [status, setStatus] = useState('offline');

    useEffect(() => {
        const userId = process.env.NEXT_PUBLIC_DISCORD_ID;
        if (!userId) {
            console.error('Discord User ID not configured');
            return;
        }

        const fetchStatus = async () => {
            try {
                const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
                const data = await response.json();
                setStatus(data.data.discord_status);
            } catch (error) {
                console.error('Error fetching status:', error);
            }
        };

        fetchStatus();
        const interval = setInterval(fetchStatus, 60000)

        return () => clearInterval(interval);
    }, []);

    return status;
}