import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { SOLUTIONS, solutionSlugs } from '@/lib/solutions';
import { SolutionPage } from '@/components/marketing/SolutionPage';
import { VirementPage } from '@/components/marketing/VirementPage';
import { WealthPage } from '@/components/marketing/WealthPage';
import { AppPage } from '@/components/marketing/AppPage';
import { EcheancierPage } from '@/components/marketing/EcheancierPage';
import { AggregationPage } from '@/components/marketing/AggregationPage';
import { InsightsPage } from '@/components/marketing/InsightsPage';
import { EtudesPage } from '@/components/marketing/EtudesPage';
import { pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => solutionSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const solution = SOLUTIONS[slug];
  if (!solution) return {};
  const t = await getTranslations({ locale, namespace: `solutions.${solution.key}` });
  return pageMetadata({ locale, path: `/solutions/${slug}`, title: t('title'), description: t('sub') });
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const solution = SOLUTIONS[slug];
  if (!solution) notFound();
  if (slug === 'app') return <AppPage />;
  if (slug === 'virement-simplifie') return <VirementPage />;
  if (slug === 'echeancier-de-paiement') return <EcheancierPage />;
  if (slug === 'solution-aggregation-bancaire') return <AggregationPage />;
  if (slug === 'wealth') return <WealthPage />;
  if (slug === 'insights') return <InsightsPage />;
  if (slug === 'nos-etudes') return <EtudesPage />;
  return <SolutionPage solution={solution} />;
}
