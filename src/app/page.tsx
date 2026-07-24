import type { Metadata } from 'next';
import HomeClient from '@/components/home-client';

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
  return <HomeClient />;
}