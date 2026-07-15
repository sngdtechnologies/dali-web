import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ComingSoon } from '@/components/marketing/ComingSoon';
import { pageMetadata } from '@/lib/seo';
import { CONTACT_HREF } from '@/lib/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'comingSoon' });
  return pageMetadata({ locale, path: '/carrieres', title: t('pages.careers.title'), description: t('pages.careers.body') });
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <ComingSoon
      pageKey="careers"
      actions={[
        { labelKey: 'contact', href: CONTACT_HREF, variant: 'primary' },
        { labelKey: 'backHome', href: '/', variant: 'secondary' },
      ]}
    />
  );
}
