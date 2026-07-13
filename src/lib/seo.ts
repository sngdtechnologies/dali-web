import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

function join(locale: string, path: string): string {
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dali.app';

function alternates(locale: string, path: string) {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, join(l, path)]));
  return { canonical: join(locale, path), languages };
}

// Home / FAQ: self-contained titles (already include the brand) — kept absolute so the
// layout's "%s · Dali" template does not double the brand name.
export function buildMetadata({
  locale, path, title, description,
}: { locale: string; path: string; title: string; description: string }): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: title },
    description,
    alternates: alternates(locale, path),
    openGraph: { title, description, locale, type: 'website', images: ['/og.png'] },
  };
}

// Secondary pages: plain string title → wrapped by the layout template into "<title> · Dali".
export function pageMetadata({
  locale, path, title, description,
}: { locale: string; path: string; title: string; description: string }): Metadata {
  return {
    title,
    description,
    alternates: alternates(locale, path),
    openGraph: { title, description, locale, type: 'website', images: ['/og.png'] },
  };
}
