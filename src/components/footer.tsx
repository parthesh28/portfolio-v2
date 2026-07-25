import Link from 'next/link'

const socialLinks = [
    { href: 'https://github.com/parthesh28', label: 'github' },
    { href: 'https://x.com/parthesh28', label: 'twitter' },
    { href: 'https://linkedin.com/in/parthesh28', label: 'linkedin' },
    { href: 'https://t.me/parthesh28', label: 'telegram' },
];

const Footer = () => {
    return (
        <footer className="fixed bottom-2 inset-x-0 mx-auto z-40 max-w-[95vw] sm:max-w-4xl flex flex-col gap-3 px-4 sm:px-6 pb-1">
            <hr className="border-t-2 border-neutral-900/80" />
            <div className="flex items-center justify-center w-full">
                <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
                    {socialLinks.map(({ href, label }) => (
                        <Link
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-pixel-square text-xs sm:text-sm font-bold"
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer;