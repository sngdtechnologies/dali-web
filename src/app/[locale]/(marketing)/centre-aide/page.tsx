import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ComingSoon } from '@/components/marketing/ComingSoon';
import { pageMetadata } from '@/lib/seo';
import { CONTACT_HREF } from '@/lib/config';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'comingSoon' });
  return pageMetadata({ locale, path: '/centre-aide', title: t('pages.help.title'), description: t('pages.help.body') });
}

export default async function HelpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <ComingSoon
      pageKey="help"
      actions={[
        { labelKey: 'faq', href: '/faq', variant: 'primary' },
        { labelKey: 'contact', href: CONTACT_HREF, variant: 'secondary' },
      ]}
    />
  );
}
