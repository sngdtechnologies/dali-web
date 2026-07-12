import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';

export function FreeBanner() {
  const t = useTranslations('free');
  return (
    <Section>
      <Container>
        <Reveal className="text-center">
          <h2 className="font-serif text-4xl">{t('title')}</h2>
          <p className="mt-3 text-lg text-sable-700">{t('body')}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
