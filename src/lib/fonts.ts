import { Inter } from 'next/font/google';

// Inter closely matches Linxo's native system-font stack (-apple-system / Segoe UI / Roboto…).
// Single family for headings + body; weights differentiate hierarchy.
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
