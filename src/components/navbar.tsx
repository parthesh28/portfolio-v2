'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DoubleSquareIcon from './doubleBox';

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/', icon: 'hn-home' },
    { name: 'Blog', href: '/blog', icon: 'hn-tech-stories' },
    { name: 'Work', href: '/work', icon: 'hn-business' }
  ];

  // Filter links based on current path
  const filteredLinks = links.filter(link =>
    link.href !== '/' ? !pathname?.startsWith(link.href) : pathname !== '/'
  );

  // NavLink component for consistent link styling
  const NavLink = ({ href, icon, children }) => (
    <Link
      href={href}
      className="navlink border-2 tracking-widest text-lg font-bold px-2 sm:px-3 py-2 sm:py-1.5 flex items-center justify-center min-w-[40px] sm:min-w-[80px]"
    >
      <i className={`hn ${icon} sm:hidden`}></i>
      <span className="hidden sm:inline">
        {children}
      </span>
    </Link>
  );

  return (
    <nav className="fixed left-1/2 -translate-x-1/2 z-10 navbar card-shadow border-2 px-4 py-2 w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[55rem] flex items-center justify-between mt-4 sm:mt-6">
      <div className='flex items-center'>
        <div className="p-1 logo border-2">
          <DoubleSquareIcon />
        </div>
        <p className="text-2xl sm:text-3xl font-bold px-2 sm:px-3 py-1 sm:py-2 tracking-widest">
          Parthesh
        </p>
      </div>

      <div className="flex gap-2 sm:gap-4">
        {filteredLinks.map((link) => (
          <NavLink key={link.name} href={link.href} icon={link.icon}>
            {link.name.toUpperCase()}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;