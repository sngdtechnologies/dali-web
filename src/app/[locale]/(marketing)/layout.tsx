import { setRequestLocale } from 'next-intl/server';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { Header } from '@/components/marketing/Header';
import { Footer } from '@/components/marketing/Footer';

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <SmoothScroll>
      <Header locale={locale as 'fr' | 'en'} />
      {children}
      <Footer />
    </SmoothScroll>
  );
}
