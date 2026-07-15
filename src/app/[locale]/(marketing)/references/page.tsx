import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ComingSoon } from '@/components/marketing/ComingSoon';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'comingSoon' });
  return pageMetadata({ locale, path: '/references', title: t('pages.references.title'), description: t('pages.references.body') });
}

export default async function ReferencesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ComingSoon pageKey="references" actions={[{ labelKey: 'backHome', href: '/', variant: 'secondary' }]} />;
}
