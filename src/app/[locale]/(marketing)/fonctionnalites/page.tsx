import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHeader } from '@/components/marketing/PageHeader';
import { FeatureBlock } from '@/components/marketing/FeatureBlock';
import { AiBlock } from '@/components/marketing/AiBlock';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.features' });
  return pageMetadata({ locale, path: '/fonctionnalites', title: t('title'), description: t('body') });
}

export default async function FeaturesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <PageHeader namespace="features" />
      <FeatureBlock featureKey="aggregation" side="left" />
      <FeatureBlock featureKey="sms" side="right" />
      <AiBlock />
      <FeatureBlock featureKey="score" side="left" />
      <FeatureBlock featureKey="budgets" side="right" />
    </main>
  );
}
