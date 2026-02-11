'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DoubleSquareIcon from './doubleBox';
import React, { useEffect, useState } from 'react';
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';

interface NavLinkProps {
  href: string;
  icon: string;
  children: React.ReactNode;
}

const NavLink = ({ href, icon, children }: NavLinkProps) => (
  <Link
    href={href}
    className="navlink border-2 tracking-widest text-lg font-bold px-2 sm:px-3 py-2 sm:py-1.5 flex items-center justify-center min-w-[40px] sm:min-w-[80px] transition-none active:translate-y-1 active:shadow-none"
  >
    <i className={`hn ${icon} sm:hidden`}></i>
    <span className="hidden sm:inline">
      {children}
    </span>
  </Link>
);

const Navbar = () => {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
      document.body.classList.add('dark');
      setIsDark(true);
    } else {
      document.body.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const body = document.body;
    if (body.classList.contains('dark')) {
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const links = [
    { name: 'home', href: '/', icon: 'hn-home' },
    { name: 'bits', href: '/bits', icon: 'hn-tech-stories' },
    { name: 'work', href: '/work', icon: 'hn-business' }
  ];

  const filteredLinks = links.filter(link =>
    link.href !== '/' ? !pathname?.startsWith(link.href) : pathname !== '/'
  );

  return (
    <nav className="fixed left-1/2 -translate-x-1/2 z-50 navbar card-shadow border-2 px-4 py-2 w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[55rem] flex items-center justify-between mt-4 sm:mt-6">

      <div className='flex items-center'>
        <div className="p-1 logo border-2">
          <DoubleSquareIcon />
        </div>
        <p className="text-2xl sm:text-3xl font-bold px-2 sm:px-3 py-1 sm:py-2 tracking-wide">
          parthesh
        </p>
      </div>
      <div className="flex gap-2 sm:gap-4">
        {filteredLinks.map((link) => (
          <NavLink key={link.name} href={link.href} icon={link.icon}>
            {link.name.toLowerCase()}
          </NavLink>
        ))}

        <button
          onClick={toggleTheme}
          className="pl-2 sm:pl-0 py-2 sm:py-1.5 flex items-center justify-center cursor-pointer min-w-[30px]"
          aria-label="Toggle Theme"
        >
          {!mounted ? (
            <div className="w-5 h-5" />
          ) : isDark ? (
            <i className="hn hn-sun text-xl"></i>
          ) : (
            <i className="hn hn-moon text-xl"></i>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;