import type { Metadata } from 'next';
import { ASCII_ART, JAVA_ASCII, RUST_ASCII, TYPESCRIPT_ASCII } from "@/utils/ascii";


export const metadata: Metadata = {
  title: 'parthesh purohit',
  description: 'cs undergrad, full stack dev and a human building web, mobile, and solana applications.',
  openGraph: {
    title: 'parthesh purohit',
    description: 'cs undergrad, full stack dev and a human building web, mobile, and solana applications.',
    url: 'https://parthesh.in',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'parthesh purohit',
    description: 'cs undergrad, full stack dev and a human building web, mobile, and solana applications.',
  },
};

export default function Home() {
  return (

    <main id="main-content"
      className="flex-1 min-h-0 w-full flex items-center justify-center px-4 py-2 overflow-hidden">
      <div className="w-full h-full max-w-[92vw] md:max-w-3xl flex flex-col md:flex-row items-center justify-center gap-2 md:gap-10 lg:gap-14 overflow-hidden">

        <div className="shrink flex justify-center min-h-0">
          <pre
            className="font-bold font-mono select-none whitespace-pre tracking-tighter text-current origin-center text-[clamp(1.1px,0.16dvh,1.6px)] leading-[clamp(0.99px,0.16dvh,2.5px)] md:text-[1.75px] md:leading-[1.68px]">
            {ASCII_ART}
          </pre>
        </div>
        <article className="flex flex-col gap-2 md:gap-4 max-w-sm w-full">
          <header className="flex flex-col border-l-2 border-current pl-3 md:pl-4">
            <h1 className="text-[clamp(16px,2.1dvh,18.4px)] md:text-xl font-normal leading-snug">
              this is <span className="font-bold">parthesh purohit</span>.
            </h1>
            <p className="text-[clamp(14px,1.9dvh,16px)] md:text-base">
              cs undergrad, full stack dev and <span className="font-bold">a human</span>.
            </p>
          </header>

          <section className="border-l-2 border-current pl-3 md:pl-4">
            <blockquote className="text-[clamp(14px,1.9dvh,16px)] md:text-base font-medium leading-snug">
              <span className="text-2xl md:text-3xl font-bold select-none opacity-40 align-[-0.2em] mr-0.5 inline-block">&ldquo;</span>
              <em>i can love anything if i spend enough time with it.</em>
              <span className="text-2xl md:text-3xl font-bold select-none opacity-40 align-[-0.35em] ml-0.5 inline-block">&rdquo;</span>
            </blockquote>
          </section>

          <section className="flex flex-col gap-2 border-l-2 border-current pl-3 md:pl-4">
            <div className="flex items-center gap-1.5 text-[clamp(14px,1.9dvh,16px)] md:text-base font-bold">
              <span aria-hidden="true">&gt;</span>
              <span>things i work with:</span>
            </div>
            <div className="flex flex-row items-center gap-4 md:gap-6 flex-wrap">
              <pre
                className="font-mono font-black select-none whitespace-pre text-current shrink-0 text-[clamp(0.9px,0.145dvh,1.45px)] leading-[clamp(1px,0.13dvh,1.45px)] md:text-[1.3px] md:leading-[1.5px]"
              >
                {JAVA_ASCII}
              </pre>
              <pre
                className="font-mono font-black select-none whitespace-pre text-current shrink-0 text-[clamp(1.6px,0.26dvh,2.5px)] leading-[clamp(1.75px,0.235dvh,2.5px)] md:text-[2.35px] md:leading-[2.55px]"
              >
                {RUST_ASCII}
              </pre>
              <pre
                className="font-mono font-black select-none whitespace-pre text-current shrink-0 text-[clamp(1.6px,0.26dvh,2.5px)] leading-[clamp(1.75px,0.235dvh,2.5px)] md:text-[2.35px] md:leading-[2.55px]"
              >
                {TYPESCRIPT_ASCII}
              </pre>
            </div>
          </section>

          <section className="flex flex-col gap-1.5 border-l-2 border-current pl-3 md:pl-4">
            <div className="flex items-center gap-1.5 text-[clamp(1px,1.9dvh,16px)] md:text-base font-bold">
              <span aria-hidden="true">&gt;</span>
              <span>extras:</span>
            </div>
            <ul className="text-[clamp(12px,1.7dvh,14px)] md:text-sm font-medium space-y-1">
              <li>
                + solving on{' '}
                <a className="font-bold font-pixel-square" href="https://codeforces.com/profile/parthesh28" target="_blank" rel="noopener noreferrer">
                  @codeforces
                </a>
              </li>
              <li>+ writing and reading philosophy</li>
              <li>
                + playing chess on{' '}
                <a className="font-bold font-pixel-square" href="https://www.chess.com/member/parthesh28" target="_blank" rel="noopener noreferrer">
                  @chessdotcom
                </a>
              </li>
            </ul>
          </section>

        </article>
      </div>
    </main>
  );
}