import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { FaqList } from '@/components/marketing/FaqList';

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('faq');
  return (
    <main>
      <section className="bg-ivoire pt-20 pb-10">
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
