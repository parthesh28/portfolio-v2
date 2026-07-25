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
    <nav aria-label="main navigation" className="fixed inset-x-0 mx-auto z-50 brutalist px-4 sm:px-6 nav-container-adaptive py-2.5 sm:py-3.5 md:py-3.5 md:mt-6 w-full max-w-[90vw] sm:max-w-2xl md:max-w-3xl flex items-center justify-between">
      <p className="nav-logo-adaptive md:text-sm tracking-wide flex items-center gap-2 sm:gap-2.5">
        <span className="text-xl sm:text-2xl md:text-3xl select-none inline-block leading-none" aria-hidden="true">❐</span>
        <span className="leading-none">parthesh</span>
      </p>

      <div className="flex items-center gap-2 sm:gap-3">
        {filteredLinks.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            aria-label={`navigate to ${name}`}
            className="brutalist tracking-wider nav-btn-adaptive md:text-[11px] px-3 py-1.5 sm:px-5 sm:py-2.5 flex items-center justify-center"
          >
            <span>{name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}