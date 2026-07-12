import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { StoreBadges } from './StoreBadges';

export function FinalCta() {
  const t = useTranslations('cta');
  return (
    <Section tone="dark">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="font-serif text-4xl text-ivoire">{t('title')}</h2>
          <p className="mt-3 text-lg text-ivoire/70">{t('body')}</p>
          <div className="mt-8">
            <StoreBadges />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
