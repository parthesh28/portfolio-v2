import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Loading from "@/components/loading";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';

export const metadata: Metadata = {
  title: "parthesh purohit",
  description: "just a human",
  icons: {
    icon: "data:image/png;base64,iVBORw0KGgo=",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistMono.variable} ${GeistPixelSquare.variable}`}>
      <body className="antialiased font-pixel-square overflow-hidden h-full w-full lowercase">
        <div className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <span className="absolute font-mono font-black text-transparent opacity-30 [-webkit-text-stroke:2px_#e4e4e7] dark:[-webkit-text-stroke:2px_#333338] top-16 left-0 text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem]">
            build
          </span>
          <span className="absolute font-mono font-black text-transparent opacity-30 [-webkit-text-stroke:2px_#e4e4e7] dark:[-webkit-text-stroke:2px_#333338] bottom-16 right-0 text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[13rem]">
            build
          </span>
        </div>

        <Loading />
        <Navbar />
        <Footer />
        
        {children}
      </body>
    </html>
  );
}