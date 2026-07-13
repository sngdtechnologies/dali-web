import { Poppins } from 'next/font/google';

// Single geometric sans used across the whole site (headings + body), matching the
// Linxo look. Poppins is the closest freely self-hostable match to Linxo's typeface.
export const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});
