'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { name: 'home', href: '/' },
  { name: 'bits', href: '/bits' },
  { name: 'work', href: '/work' },
];

export default function Navbar() {
  const pathname = usePathname();

  const filteredLinks = LINKS.filter(link =>
    link.href !== '/' ? !pathname?.startsWith(link.href) : pathname !== '/'
  );

  return (
    <nav aria-label="main navigation" className="fixed inset-x-0 mx-auto z-50 brutalist px-3.5 sm:px-4 nav-container-adaptive md:py-2 md:mt-6 w-full max-w-[95vw] sm:max-w-4xl flex items-center justify-between">
      <p className="nav-logo-adaptive md:text-3xl font-bold tracking-wide flex items-center gap-1.5 sm:gap-2">
        <span className="nav-logo-adaptive md:text-3xl select-none inline-block translate-y-[2px] sm:translate-y-[3px] leading-none" aria-hidden="true">❐</span>
        <span className="leading-none">parthesh</span>
      </p>

      <div className="flex items-center gap-2 sm:gap-3">
        {filteredLinks.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            aria-label={`navigate to ${name}`}
            className="brutalist tracking-wider nav-btn-adaptive md:text-lg md:px-4 md:py-2 font-bold flex items-center justify-center"
          >
            <span>{name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}