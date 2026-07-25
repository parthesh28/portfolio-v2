import type { Metadata } from 'next';
import BitsClient from '@/components/bits-client';

export const metadata: Metadata = {
  title: 'bits',
  description: 'short logs, technical writing, rust threadpool safety, solana lookup tables, and life reflections by parthesh purohit.',
  alternates: {
    canonical: 'https://parthesh.in/bits',
  },
  openGraph: {
    title: 'bits | parthesh purohit',
    description: 'short logs, technical writing, rust threadpool safety, solana lookup tables, and life reflections by parthesh purohit.',
    url: 'https://parthesh.in/bits',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'bits | parthesh purohit',
    description: 'short logs, technical writing, rust threadpool safety, solana lookup tables, and life reflections by parthesh purohit.',
  },
};

export default function BitsPage() {
  return <BitsClient />;
}