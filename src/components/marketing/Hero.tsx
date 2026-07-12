import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { StoreBadges } from './StoreBadges';
import { DeviceMockup } from './DeviceMockup';
import { ScrollIndicator } from './ScrollIndicator';

export function Hero() {
  const t = useTranslations('hero');
  return (
    <section className="relative overflow-hidden bg-ivoire pt-16 pb-28 md:pt-24">
      <Container className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <h1 className="font-serif text-5xl leading-[1.05] md:text-6xl">{t('headline')}</h1>
          <p className="mt-6 max-w-md text-lg text-sable-700">{t('sub')}</p>
          <div className="mt-8" id="download">
            <StoreBadges />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <DeviceMockup />
        </Reveal>
      </Container>
      <ScrollIndicator label={t('scroll')} />
    </section>
  );
}
