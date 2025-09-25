import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../index.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  title: 'MiningVerse - Bitcoin Mining Management Platform',
  description: 'Professional Bitcoin mining management platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}