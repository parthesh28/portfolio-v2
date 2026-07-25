'use client'
import { ASCII_ART, JAVA_ASCII, RUST_ASCII, TYPESCRIPT_ASCII } from "@/utils/ascii";

export default function HomeClient() {
  return (
    <main id="main-content" className="h-dvh w-full relative flex items-center justify-center pt-16 pb-12 sm:pt-24 sm:pb-20 md:pt-20 md:pb-12 px-4 overflow-hidden">
      <div className="w-full max-w-[95vw] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl flex flex-col md:flex-row items-center justify-center gap-responsive md:gap-6 lg:gap-12">

        {/* ASCII Portrait */}
        <div className="shrink-0 flex justify-center w-full md:w-auto">
          <pre className="portrait-responsive portrait-mask sm:text-[0.80px] sm:leading-[1.05px] md:text-[0.95px] md:leading-[1.24px] lg:text-[1.10px] lg:leading-[1.42px] xl:text-[1.25px] xl:leading-[1.62px] font-bold select-none whitespace-pre tracking-tighter text-current origin-center scale-x-[1.5] scale-y-[1.10]" aria-hidden="true">
            {ASCII_ART}
          </pre>
        </div>

        {/* Profile Content */}
        <article className="flex-1 flex flex-col gap-responsive md:gap-4 lg:gap-5 max-w-lg w-full">

          <header className="flex flex-col border-l-2 border-current pl-3 md:pl-4">
            <h1 className="title-responsive md:text-base leading-snug">
              this is <span>parthesh purohit</span>.
            </h1>
            <p className="body-responsive md:text-xs leading-relaxed">
              cs undergrad, full stack dev and <span>a human</span>.
            </p>
          </header>

          <section className="flex flex-col border-l-2 border-current pl-3 md:pl-4" aria-label="quote">
            <blockquote className="body-responsive md:text-xs leading-relaxed">
              <span className="text-base sm:text-lg md:text-xl select-none opacity-50 align-[-0.2em] mr-0.5 md:mr-1 inline-block" aria-hidden="true">&ldquo;</span>
              <em>i can love anything if i spend enough time with it.</em>
              <span className="text-base sm:text-lg md:text-xl select-none opacity-50 align-[-0.35em] ml-0.5 md:ml-1 inline-block" aria-hidden="true">&rdquo;</span>
            </blockquote>
          </section>

          <section className="flex flex-col gap-1.5 md:gap-3 border-l-2 border-current pl-3 md:pl-4" aria-label="technologies">
            <div className="flex items-center gap-1.5 body-responsive md:text-xs">
              <span aria-hidden="true">&gt;</span>
              <span>things i work with:</span>
            </div>
            <div className="flex flex-row items-center gap-3 md:gap-8 overflow-hidden flex-wrap" aria-label="ascii art logos for java, rust, and typescript">
              <pre
                className="font-bold select-none whitespace-pre text-current shrink-0"
                style={{ fontSize: '0.95px', lineHeight: '1.10px' }}
                aria-hidden="true"
              >
                {JAVA_ASCII}
              </pre>
              <pre
                className="font-bold select-none whitespace-pre text-current shrink-0"
                style={{ fontSize: '1.60px', lineHeight: '1.70px' }}
                aria-hidden="true"
              >
                {RUST_ASCII}
              </pre>
              <pre
                className="font-bold select-none whitespace-pre text-current shrink-0"
                style={{ fontSize: '1.60px', lineHeight: '1.70px' }}
                aria-hidden="true"
              >
                {TYPESCRIPT_ASCII}
              </pre>
            </div>
          </section>

          <section className="flex flex-col gap-1.5 md:gap-2 border-l-2 border-current pl-3 md:pl-4" aria-label="extras and hobbies">
            <div className="flex items-center gap-1.5 body-responsive md:text-xs">
              <span aria-hidden="true" className="text-md">&gt;</span>
              <span>extras:</span>
            </div>
            <ul className="small-responsive md:text-xs leading-relaxed space-y-1">
              <li>
                + solving on{' '}
                <a href="https://codeforces.com/profile/parthesh28" target="_blank" rel="noopener noreferrer" aria-label="codeforces profile (opens in new tab)">
                  @codeforces
                </a>
              </li>
              <li>+ writing and reading philosophy</li>
              <li>
                + playing chess on{' '}
                <a href="https://www.chess.com/member/parthesh28" target="_blank" rel="noopener noreferrer" aria-label="chess.com profile (opens in new tab)">
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
