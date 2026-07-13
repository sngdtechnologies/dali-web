import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { Link } from '@/i18n/routing';
import { QrCode } from './QrCode';
import { PhoneArt, type PhoneVariant } from './PhoneArt';
import { cn } from '@/lib/utils';

const APP_URL = 'https://dali.app';

const CARDS: { k: string; tint: string; variant: PhoneVariant }[] = [
  { k: 'aggregation', tint: 'bg-sable-100', variant: 'accounts' },
  { k: 'sms', tint: 'bg-or-100', variant: 'track' },
  { k: 'ai', tint: 'bg-foret-800', variant: 'ai' },
  { k: 'score', tint: 'bg-foret-50', variant: 'score' },
  { k: 'pay', tint: 'bg-sable-200', variant: 'pay' },
  { k: 'budget', tint: 'bg-foret-100', variant: 'budget' },
];

export async function AppShowcase() {
  const t = await getTranslations('showcase');
  return (
    <Section className="border-t border-encre/[0.06]">
      <Container>
        <div className="flex items-center justify-between gap-4">
          <Badge className="bg-foret-50 text-foret-700">{t('eyebrow')}</Badge>
          <Link href="/fonctionnalites" className="text-sm font-medium text-foret-700 hover:underline">
            {t('discover')} →
          </Link>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <h2 className="max-w-lg text-4xl md:text-5xl">{t('gridTitle')}</h2>
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-dali-md bg-white p-2 shadow-sm">
              <QrCode value={APP_URL} alt={t('qrAlt')} size={96} />
            </div>
            <p className="text-sm text-sable-700">{t('scan')}</p>
          </div>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            <Reveal key={c.k}>
              <div className="h-full overflow-hidden rounded-dali-lg border border-encre/10 bg-white shadow-sm transition-transform hover:-translate-y-1">
                <div className={cn('flex h-52 items-end justify-center overflow-hidden pt-6', c.tint)} aria-hidden>
                  <PhoneArt variant={c.variant} />
                </div>
                <div className="p-5">
                  <h3 className="text-lg">{t(`cards.${c.k}.title`)}</h3>
                  <p className="mt-2 text-sm text-sable-700">{t(`cards.${c.k}.body`)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
