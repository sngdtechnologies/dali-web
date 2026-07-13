import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import { Hero } from '@/components/marketing/Hero';
import { AppShowcase } from '@/components/marketing/AppShowcase';
import { LogoStrip } from '@/components/marketing/LogoStrip';
import { BusinessSection } from '@/components/marketing/BusinessSection';
import { PersonaTabs } from '@/components/marketing/PersonaTabs';
import { TrustRow } from '@/components/marketing/TrustRow';
import { FinalCta } from '@/components/marketing/FinalCta';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, path: '/', title: t('homeTitle'), description: t('homeDesc') });
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AppShowcase />
      <LogoStrip />
      <BusinessSection />
      <PersonaTabs />
      <TrustRow />
      <FinalCta />
    </main>
  );
}
