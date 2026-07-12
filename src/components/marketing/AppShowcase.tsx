import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/motion/Reveal';
import { Link } from '@/i18n/routing';
import { StoreBadges } from './StoreBadges';
import { QrCode } from './QrCode';

const APP_URL = 'https://dali.app';
const BENEFITS = ['sms', 'ai', 'score', 'sync'] as const;

export async function AppShowcase() {
  const t = await getTranslations('showcase');
  return (
    <Section tone="ivoireDeep">
      <Container>
        <Reveal className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl">{t('title')}</h2>
            <p className="mt-3 max-w-md text-sable-700">{t('sub')}</p>
            <div className="mt-6">
              <StoreBadges />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="rounded-dali-lg bg-white p-5 shadow-sm">
              <QrCode value={APP_URL} alt={t('qrAlt')} />
            </div>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((k) => (
            <Reveal key={k}>
              <Card className="h-full transition-transform hover:-translate-y-1">
                <h3 className="font-serif text-xl">{t(`benefits.${k}.title`)}</h3>
                <p className="mt-2 text-sm text-sable-700">{t(`benefits.${k}.body`)}</p>
                <Link href="/fonctionnalites" className="mt-4 inline-block text-sm text-foret-700 hover:underline">
                  {t('learnMore')} →
                </Link>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
