import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

export function SecurityCallout() {
  const t = useTranslations('security');
  return (
    <Section tone="dark">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-serif text-4xl text-ivoire">{t('title')}</h2>
          <p className="mt-4 text-lg text-ivoire/70">{t('body')}</p>
          <div className="mt-8">
            <Button href="/securite" variant="secondary">
              {t('cta')}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
