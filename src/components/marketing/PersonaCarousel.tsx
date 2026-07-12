import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Carousel } from '@/components/ui/Carousel';
import { Link } from '@/i18n/routing';

const PERSONAS = ['individuals', 'students', 'families', 'professionals', 'ecommerce'] as const;

export function PersonaCarousel() {
  const t = useTranslations('personas');
  const items = PERSONAS.map((p) => (
    <Card key={p} className="mx-auto max-w-2xl bg-white">
      <span className="text-sm font-medium text-foret-600">{t(`${p}.title`)}</span>
      <p className="mt-3 font-serif text-2xl leading-snug">{t(`${p}.body`)}</p>
      <Link href="/fonctionnalites" className="mt-5 inline-block text-sm text-foret-700 hover:underline">
        {t('cta')} →
      </Link>
    </Card>
  ));
  return (
    <Section>
      <Container>
        <h2 className="text-center font-serif text-4xl">{t('title')}</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sable-700">{t('sub')}</p>
        <div className="mt-10">
          <Carousel items={items} ariaLabel={t('title')} prevLabel={t('prev')} nextLabel={t('next')} />
        </div>
      </Container>
    </Section>
  );
}
