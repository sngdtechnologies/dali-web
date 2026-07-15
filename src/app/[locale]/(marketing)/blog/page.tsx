import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ComingSoon } from '@/components/marketing/ComingSoon';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'comingSoon' });
  return pageMetadata({ locale, path: '/blog', title: t('pages.blog.title'), description: t('pages.blog.body') });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ComingSoon pageKey="blog" actions={[{ labelKey: 'backHome', href: '/', variant: 'secondary' }]} />;
}
