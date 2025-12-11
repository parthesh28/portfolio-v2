'use client'

import Link from 'next/link'
import React from 'react'
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';

const Footer = () => {

    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { href: 'https://github.com/parthesh28', icon: 'hn-github', label: 'github' },
        { href: 'https://x.com/parthesh28', icon: 'hn-twitter', label: 'x' },
        { href: 'https://linkedin.com/in/parthesh28', icon: 'hn-linkedin', label: 'linkedin' },
        { href: 'https://discord.com/users/parthesh28', icon: 'hn-discord', label: 'discord' },
        { href: 'mailto:partheshpurohit28@gmail.com', icon: 'hn-email', label: 'email' },
    ];

    return (
        <footer className="fixed bottom-1 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-3xl">

            <div className="flex flex-col items-center justify-center gap-2 px-6 py-3">

                <div className="w-full h-px border-t-2 border-dotted border-zinc-800/50 dark:border-zinc-600/50" />

                <div className="w-full flex flex-row items-center justify-between gap-2">

                    <div className="flex items-center gap-1 sm:gap-2 text-xs font-bold tracking-widest lowercase text-zinc-800 dark:text-zinc-300 text-center sm:text-left">
                        <p>
                            © {currentYear} parthesh purohit
                        </p>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-5 flex-wrap justify-center">
                        {socialLinks.map((social) => (
                            <Link
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                className="group relative flex items-center justify-center hover:-translate-y-0.5 transition-transform"
                                aria-label={social.label}
                            >
                                <i className={`hn ${social.icon} text-lg text-zinc-800 dark:text-zinc-300 transition-colors group-hover:text-black dark:group-hover:text-white`}></i>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer