import Link from 'next/link'

const socialLinks = [
    { href: 'https://github.com/parthesh28', icon: 'hn-github', label: 'github' },
    { href: 'https://x.com/parthesh28', icon: 'hn-x', label: 'x' },
    { href: 'https://linkedin.com/in/parthesh28', icon: 'hn-linkedin', label: 'linkedin' },
    { href: 'https://discord.com/users/parthesh28', icon: 'hn-discord', label: 'discord' },
];

const Footer = () => {
    return (
        <footer className="fixed bottom-2 inset-x-0 mx-auto z-40 max-w-3xl flex flex-col gap-3 px-6 pb-1">
            <hr className="border-t-2 border-dashed border-zinc-800/90 dark:border-zinc-600/90" />
            <div className="flex items-center justify-between w-full">
                <p className="font-mono tracking-wide text-sm font-bold leading-none">
                    made in bliss 
                </p>

                <div className="flex items-center gap-4 sm:gap-5 flex-wrap">
                    {socialLinks.map((social) => (
                        <Link
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            aria-label={social.label}
                            className="flex items-center justify-center text-lg"
                        >
                            <i className={`hn ${social.icon} leading-none`} />
                        </Link>
                    ))}
                </div>
            </div>

        </footer>
    )
}

export default Footer;