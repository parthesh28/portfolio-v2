'use client'
import { ASCII_ART, JAVA_ASCII, RUST_ASCII, TYPESCRIPT_ASCII } from "@/utils/ascii";

export default function HomeClient() {
  return (
    <main id="main-content" className="h-dvh w-full relative flex items-center justify-center pt-24 pb-20 md:pt-20 md:pb-12 px-4 overflow-hidden">
      <div className="w-full max-w-[95vw] sm:max-w-4xl flex flex-col md:flex-row items-center justify-center gap-responsive md:gap-12 lg:gap-14">

        {/* ASCII Portrait */}
        <div className="shrink-0 flex justify-center w-full md:w-auto overflow-hidden">
          <pre className="portrait-responsive sm:text-[2.2px] sm:leading-[2.4px] md:text-[2.8px] md:leading-[3px] lg:text-[3.2px] lg:leading-[3.4px] font-mono select-none whitespace-pre tracking-tighter text-current overflow-hidden scale-x-110 origin-center">
            {ASCII_ART}
          </pre>
        </div>

        {/* Profile Content */}
        <article className="flex flex-col gap-responsive md:gap-4 lg:gap-5 max-w-lg w-full">

          <header className="flex flex-col border-l-2 border-current pl-3 md:pl-4">
            <h1 className="title-responsive md:text-2xl font-normal leading-snug">
              this is <span className="font-bold">parthesh purohit</span>.
            </h1>
            <p className="body-responsive md:text-base">
              cs undergrad, full stack dev and <span className="font-bold">a human</span>.
            </p>
          </header>

          <section className="flex flex-col border-l-2 border-current pl-3 md:pl-4">
            <blockquote className="body-responsive md:text-lg font-medium leading-snug">
              <span className="title-responsive md:text-4xl font-bold select-none opacity-50 align-[-0.2em] mr-0.5 md:mr-1 inline-block">&ldquo;</span>
              <em>i can love anything if i spend enough time with it.</em>
              <span className="title-responsive md:text-4xl font-bold select-none opacity-50 align-[-0.35em] ml-0.5 md:ml-1 inline-block">&rdquo;</span>
            </blockquote>
          </section>

          <section className="flex flex-col gap-1.5 md:gap-3 border-l-2 border-current pl-3 md:pl-4">
            <div className="flex items-center gap-1.5 font-bold body-responsive md:text-base">
              <span aria-hidden="true">♡</span>
              <span>things i work with:</span>
            </div>
            <div className="flex flex-row items-center gap-3 md:gap-8 overflow-hidden flex-wrap">
              <pre
                className="font-mono font-black select-none whitespace-pre text-current shrink-0"
                style={{ fontSize: '1.3px', lineHeight: '1.48px' }}
              >
                {JAVA_ASCII}
              </pre>
              <pre
                className="font-mono font-black select-none whitespace-pre text-current shrink-0"
                style={{ fontSize: '2.35px', lineHeight: '2.40px' }}
              >
                {RUST_ASCII}
              </pre>
              <pre
                className="font-mono font-black select-none whitespace-pre text-current shrink-0"
                style={{ fontSize: '2.35px', lineHeight: '2.40px' }}
              >
                {TYPESCRIPT_ASCII}
              </pre>
            </div>
          </section>

          <section className="flex flex-col gap-1 md:gap-1.5 border-l-2 border-current pl-3 md:pl-4">
            <div className="flex items-center gap-1.5 font-bold body-responsive md:text-base">
              <span aria-hidden="true">✦</span>
              <span>extras:</span>
            </div>
            <ul className="small-responsive md:text-sm font-medium space-y-0.5 md:space-y-1">
              <li>
                + solving on{' '}
                <a className="font-bold font-mono" href="https://codeforces.com/profile/parthesh28" target="_blank" rel="noopener noreferrer">
                  @codeforces
                </a>
              </li>
              <li>+ writing and reading philosophy</li>
              <li>
                + playing chess on{' '}
                <a className="font-bold font-mono" href="https://www.chess.com/member/parthesh28" target="_blank" rel="noopener noreferrer">
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
