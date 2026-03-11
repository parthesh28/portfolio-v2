'use client'

import useDiscord from "@/hooks/useDiscord";

type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline';

interface Props {
    src: string;
}

const ProfileAvatar = ({ src }: Props) => {
    const discordStatus = useDiscord() as DiscordStatus;

    const statusColors: Record<Exclude<DiscordStatus, 'offline'>, string> = {
        online: '#22c55e',
        idle: '#eab308',
        dnd: '#ef4444',
    };

    return (
        <div className="relative w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <mask id="discord-cutout-square">
                        <rect x="0" y="0" width="100" height="100" fill="white" />
                        <rect x="78" y="78" width="30" height="30" fill="black" />
                    </mask>
                </defs>

                <foreignObject x="0" y="0" width="100" height="100" mask="url(#discord-cutout-square)">
                    <img
                        src={src}
                        alt="Profile"
                        className="w-full h-full object-cover "
                    />
                </foreignObject>

                <g transform="translate(82, 82)">
                    <rect
                        width="22"
                        height="22"
                        fill={discordStatus === 'offline' ? 'currentColor' : statusColors[discordStatus as keyof typeof statusColors]}
                        className={`${discordStatus === 'offline' ? 'text-slate-500 dark:text-slate-400' : ''}`}
                    />
                </g>
            </svg>
        </div>
    );
};

export default ProfileAvatar;