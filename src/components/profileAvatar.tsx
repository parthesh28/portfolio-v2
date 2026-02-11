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
                    <mask id="discord-cutout">
                        <circle cx="50" cy="50" r="50" fill="white" />
                        <circle cx="85" cy="85" r="12" fill="black" />
                    </mask>
                </defs>

                <foreignObject x="0" y="0" width="100" height="100" mask="url(#discord-cutout)">
                    <img
                        src={src}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                    />
                </foreignObject>

                <g transform="translate(85, 85)">
                    <circle
                        r="8"
                        fill={discordStatus === 'offline' ? 'currentColor' : statusColors[discordStatus as keyof typeof statusColors]}
                        className={discordStatus === 'offline' ? 'text-slate-500 dark:text-slate-400' : ''}
                    />
                </g>
            </svg>
        </div>
    );
};

export default ProfileAvatar;