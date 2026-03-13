'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LINKS = [
  { name: 'home', href: '/', icon: 'hn-home' },
  { name: 'bits', href: '/bits', icon: 'hn-tech-stories' },
  { name: 'work', href: '/work', icon: 'hn-business' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && systemDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const willBeDark = !root.classList.contains('dark');

    root.classList.toggle('dark', willBeDark);
    localStorage.setItem('theme', willBeDark ? 'dark' : 'light');
    setIsDark(willBeDark);
  };

  const filteredLinks = LINKS.filter(link =>
    link.href !== '/' ? !pathname?.startsWith(link.href) : pathname !== '/'
  );

  return (
    <nav className="fixed inset-x-0 mx-auto z-50 brutalist px-4 py-2 w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[55rem] flex items-center justify-between mt-6">
      <p className="text-2xl sm:text-3xl font-bold px-2 sm:px-3 py-1 sm:py-2 tracking-wide">
        parthesh
      </p>

      <div className="flex gap-3">
        {filteredLinks.map(({ name, href, icon }) => (
          <Link
            key={name}
            href={href}
            className="brutalist tracking-widest text-lg font-bold p-2 flex items-center justify-center min-w-[40px] sm:min-w-[80px] active:translate-y-1"
          >
            <i className={`hn ${icon} sm:hidden pl-1`} />
            <span className="hidden sm:inline pl-1">{name}</span>
          </Link>
        ))}

        <button
          onClick={toggleTheme}
          className="pl-2 sm:pl-0 py-2 flex items-center justify-center w-8 cursor-pointer"
          aria-label="toggle theme"
        >
          {mounted && <i className={`hn ${isDark ? 'hn-sun' : 'hn-moon'} text-xl`} />}
        </button>
      </div>

    </nav>
  );
}