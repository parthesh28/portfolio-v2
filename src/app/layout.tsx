import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import '@hackernoon/pixel-icon-library/fonts/iconfont.css';
import Footer from "@/components/footer";
import PixelLoader from "@/components/loading";


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
    <html lang="en"> 
      <body className={`antialiased`}>
        <div className="background-image" />
        <PixelLoader/>
        <Navbar />
        <Footer/>
        {children}
      </body>
    </html>
  );
}