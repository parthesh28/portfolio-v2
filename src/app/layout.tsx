import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Loading from "@/components/loading";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "parthesh purohit",
    template: "%s | parthesh purohit",
  },
  description: "cs undergrad, full stack dev and a human building web, mobile, and solana applications.",
  keywords: ["parthesh purohit", "full stack developer", "solana", "rust", "next.js", "react native"],
  authors: [{ name: "parthesh purohit" }],
  creator: "parthesh purohit",
  metadataBase: new URL("https://parthesh.in"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parthesh.in",
    title: "parthesh purohit",
    description: "cs undergrad, full stack dev and a human building web, mobile, and solana applications.",
    siteName: "parthesh purohit",
  },
  twitter: {
    card: "summary_large_image",
    title: "parthesh purohit",
    description: "cs undergrad, full stack dev and a human building web, mobile, and solana applications.",
    creator: "@parthesh28",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "parthesh purohit",
  url: "https://parthesh.in",
  sameAs: [
    "https://github.com/parthesh28",
    "https://x.com/parthesh28",
    "https://linkedin.com/in/parthesh28",
  ],
  jobTitle: "Full Stack Developer",
  knowsAbout: ["Next.js", "Solana", "Rust", "React Native", "Hono", "TypeScript"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistMono.variable} ${GeistPixelSquare.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-pixel-square overflow-hidden h-dvh w-vw lowercase flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-neutral-950 focus:text-neutral-50 focus:border-2 focus:border-neutral-900"
        >
          skip to content
        </a>
        <Loading />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}