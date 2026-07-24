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
    <nav aria-label="main navigation" className="fixed inset-x-0 mx-auto z-50 brutalist px-4 py-2 w-full max-w-[95vw] sm:max-w-4xl flex items-center justify-between mt-6">
      <p className="text-2xl sm:text-3xl font-bold px-2 sm:px-3 py-1 sm:py-2 tracking-wide flex items-center gap-2">
        <span className="text-2xl sm:text-3xl select-none inline-block translate-y-[2px]" aria-hidden="true">❐</span>
        <span className="underline">parthesh</span>
      </p>

      <div className="flex gap-3">
        {filteredLinks.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            aria-label={`navigate to ${name}`}
            className="brutalist tracking-widest text-base sm:text-lg font-bold px-3 py-1.5 sm:px-4 sm:py-2 flex items-center justify-center"
          >
            <span>{name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}