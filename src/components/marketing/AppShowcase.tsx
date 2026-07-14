import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { QrCode } from './QrCode';
import { cn } from '@/lib/utils';

const APP_URL = 'https://dali.app';

const CARDS: { k: string; tint: string; img: string }[] = [
  { k: 'aggregation', tint: 'bg-sable-100', img: 'comptes' },
  { k: 'sms', tint: 'bg-or-100', img: 'depenses' },
  { k: 'ai', tint: 'bg-foret-800', img: 'assistant' },
  { k: 'score', tint: 'bg-foret-50', img: 'score' },
  { k: 'pay', tint: 'bg-sable-200', img: 'paiement' },
  { k: 'budget', tint: 'bg-foret-100', img: 'budget' },
];

function LabMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 72 72" aria-hidden>
      <path d="M8 44 A28 28 0 0 1 44 8" fill="none" stroke="#F5F0E6" strokeWidth="7" strokeLinecap="round" />
      <path d="M28 64 A28 28 0 0 1 64 28" fill="none" stroke="#C9A961" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

export async function AppShowcase() {
  const t = await getTranslations('showcase');
  return (
    <Section className="border-t border-encre/[0.06]">
      <Container>
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-foret-800 px-4 py-1.5 text-sm font-medium text-ivoire">
            <LabMark /> {t('eyebrow')}
          </span>
          <Link href="/fonctionnalites" className="text-sm font-medium text-foret-700 underline decoration-1 underline-offset-4 hover:no-underline">
            {t('discover')} →
          </Link>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <h2 className="max-w-lg text-4xl text-foret-800 md:text-5xl">{t('gridTitle')}</h2>
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-dali-md bg-white p-2 shadow-sm">
              <QrCode value={APP_URL} alt={t('qrAlt')} size={96} />
            </div>
            <p className="text-sm text-sable-700">{t('scan')}</p>
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.flatMap((c) => [
            <Reveal key={`${c.k}-img`}>
              <div className={cn('relative aspect-[4/5] overflow-hidden rounded-dali-lg', c.tint)} aria-hidden>
                <Image
                  src={`/screens/${c.img}.webp`}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  className="object-cover object-top"
                />
              </div>
            </Reveal>,
            <Reveal key={`${c.k}-text`}>
              <div className="flex h-full flex-col justify-center rounded-dali-lg bg-sable-50 p-7">
                <h3 className="text-xl leading-snug text-encre">{t(`cards.${c.k}.title`)}</h3>
                <p className="mt-3 text-sm text-sable-700">{t(`cards.${c.k}.body`)}</p>
              </div>
            </Reveal>,
          ])}
        </div>
      </Container>
    </Section>
  );
}
