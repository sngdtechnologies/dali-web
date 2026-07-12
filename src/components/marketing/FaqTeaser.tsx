import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Accordion } from '@/components/ui/Accordion';
import { getFaqItems } from '@/lib/content/faq';

export function FaqTeaser() {
  const t = useTranslations('faq');
  const items = getFaqItems(t).slice(0, 4);
  return (
    <Section tone="ivoireDeep">
      <Container className="max-w-3xl">
        <h2 className="font-serif text-4xl">{t('title')}</h2>
        <div className="mt-8">
          <Accordion items={items} />
        </div>
        <Link href="/faq" className="mt-6 inline-block text-foret-700 underline">
          {t('seeAll')}
        </Link>
      </Container>
    </Section>
  );
}
