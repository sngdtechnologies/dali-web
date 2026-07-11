import type { Metadata } from 'next';
import { instrumentSerif, inter } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = { title: 'Dali', description: 'Dali' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${instrumentSerif.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
