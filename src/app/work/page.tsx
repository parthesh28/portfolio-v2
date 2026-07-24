import type { Metadata } from 'next';
import WorkClient from '@/components/work-client';

export const metadata: Metadata = {
  title: 'work',
  description: 'proof of work and record of software engineering projects, rust programs, and solana ecosystem experiences by parthesh purohit.',
  openGraph: {
    title: 'work | parthesh purohit',
    description: 'proof of work and record of software engineering projects, rust programs, and solana ecosystem experiences by parthesh purohit.',
    url: 'https://parthesh.in/work',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'work | parthesh purohit',
    description: 'proof of work and record of software engineering projects, rust programs, and solana ecosystem experiences by parthesh purohit.',
  },
};

export default function WorkPage() {
  return <WorkClient />;
}