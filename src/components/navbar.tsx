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
    <nav
      aria-label="main navigation"
      className="shrink-0 mx-auto z-50 brutalist px-4 py-2 mt-3 md:mt-6 w-full max-w-[92vw] md:max-w-3xl flex items-center justify-between"
    >
      <p className="text-xl md:text-2xl font-bold tracking-wide flex items-center gap-2">
        <span className="select-none inline-block translate-y-[2px] leading-none" aria-hidden="true">❐</span>
        <span className="leading-none">parthesh</span>
      </p>

      <div className="flex items-center gap-2">
        {filteredLinks.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            aria-label={`navigate to ${name}`}
            className="brutalist px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base font-bold tracking-wider flex items-center justify-center"
          >
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
}