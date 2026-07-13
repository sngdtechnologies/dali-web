import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

function join(locale: string, path: string): string {
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dali.app';

export function buildMetadata({
  locale, path, title, description,
}: { locale: string; path: string; title: string; description: string }): Metadata {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, join(l, path)]));
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: join(locale, path), languages },
    openGraph: { title, description, locale, type: 'website', images: ['/og.png'] },
  };
}
