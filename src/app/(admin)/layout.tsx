import type { Metadata } from 'next';
import { inter } from '@/lib/fonts';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Backoffice · Dali',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="bg-sable-50 text-encre">{children}</body>
    </html>
  );
}
