import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PixelLoader from "@/components/loading";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';

export const metadata: Metadata = {
  title: "parthesh purohit",
  description: "just a human",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`}>
      <body className={`antialiased font-pixel-square`}>
        <div className="absolute top-20 left-1 sm:-left-2 lg:left-0 z-0 pointer-events-none select-none" aria-hidden="true">
          <span className="block text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-sans font-black italic leading-none text-transparent [-webkit-text-stroke:1.5px_#e4e4e7] dark:[-webkit-text-stroke:1.5px_#27272a] opacity-70">
            ///
          </span>
        </div>

        <div className="absolute bottom-20 right-4 sm:right-6 z-0 pointer-events-none select-none" aria-hidden="true">
          <span className="block text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[13rem] font-sans font-black leading-none text-transparent [-webkit-text-stroke:1.5px_#e4e4e7] dark:[-webkit-text-stroke:1.5px_#27272a] opacity-70">
            T_T
          </span>
        </div>
        <PixelLoader />
        <Navbar />
        <Footer />
        {children}
      </body>
    </html>
  );
}