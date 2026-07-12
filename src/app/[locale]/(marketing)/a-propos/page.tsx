import { setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/marketing/PageHeader';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <PageHeader namespace="about" />
    </main>
  );
}
