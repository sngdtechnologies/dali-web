import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { FaqList } from '@/components/marketing/FaqList';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, path: '/faq', title: t('faqTitle'), description: t('faqDesc') });
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('faq');
  return (
    <main>
      <section className="bg-white pt-20 pb-10">
        <Container className="max-w-3xl">
          <Reveal>
            <h1 className="font-serif text-5xl">{t('title')}</h1>
            <p className="mt-4 text-lg text-sable-700">{t('subtitle')}</p>
          </Reveal>
        </Container>
      </section>
      <Section>
        <Container className="max-w-3xl">
          <FaqList />
        </Container>
      </Section>
    </main>
  );
}
