import Link from 'next/link'

const socialLinks = [
  { href: 'https://github.com/parthesh28', label: 'github' },
  { href: 'https://x.com/parthesh28', label: 'twitter' },
  { href: 'https://linkedin.com/in/parthesh28', label: 'linkedin' },
  { href: 'https://t.me/parthesh28', label: 'telegram' },
];

export default function Footer() {
  return (
    <footer className="shrink-0 inset-x-0 mx-auto z-40 w-full max-w-[92vw] md:max-w-3xl pb-3 pt-2">
      <hr className="border-t-2 border-current mb-2" />
      <div className="flex items-center justify-center gap-5 md:gap-7">
        {socialLinks.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-pixel-square text-sm font-bold"
          >
            {label}
          </Link>
        ))}
      </div>
    </footer>
  );
}