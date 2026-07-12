import { setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/marketing/PageHeader';
import { FeatureBlock } from '@/components/marketing/FeatureBlock';
import { AiBlock } from '@/components/marketing/AiBlock';

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
