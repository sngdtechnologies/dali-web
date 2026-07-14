import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { Link } from '@/i18n/routing';

const P = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };

const CARDS: { k: 'payments' | 'data' | 'observatory'; links: string[]; icon: ReactNode; img: string; pos: string }[] = [
  {
    k: 'payments', links: ['l1', 'l2'],
    icon: <svg {...P}><path d="M3 8h14l-3-3M21 16H7l3 3" /></svg>,
    img: '/business/payments.webp', pos: 'object-center',
  },
  {
    k: 'data', links: ['l1', 'l2', 'l3'],
    icon: <svg {...P}><path d="M12 3 3 8l9 5 9-5-9-5ZM3 12l9 5 9-5" /></svg>,
    img: '/business/data.webp', pos: 'object-right',
  },
  {
    k: 'observatory', links: ['l1'],
    icon: <svg {...P}><path d="M4 20V10M10 20V4M16 20v-7M22 20V8" /></svg>,
    img: '/business/observatory.webp', pos: 'object-center',
  },
];

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-transform duration-200 group-hover:translate-x-1">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export async function BusinessSection() {
  const t = await getTranslations('business');
  return (
    <Section className="border-t border-encre/[0.06]">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <h2 className="max-w-xl text-4xl text-foret-800 md:text-5xl">{t('title')}</h2>
          <p className="text-sm leading-relaxed text-sable-700">{t('intro')}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CARDS.map((c) => (
            <Reveal key={c.k}>
              <div className="relative flex min-h-[480px] flex-col overflow-hidden rounded-dali-xl bg-foret-900 p-6 text-ivoire">
                <Image src={c.img} alt="" fill sizes="(max-width: 768px) 100vw, 380px" className={`object-cover ${c.pos}`} />
                <div className="pointer-events-none absolute inset-0 bg-foret-900/45" aria-hidden />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foret-900 via-foret-900/70 to-transparent" aria-hidden />
                <span className="relative z-10 inline-flex w-fit items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-encre">
                  <span className="text-foret-700">{c.icon}</span> {t(`${c.k}.badge`)}
                </span>
                <div className="relative z-10 mt-auto">
                  <h3 className="text-2xl leading-snug">{t(`${c.k}.title`)}</h3>
                  <div className="mt-5 border-t border-ivoire/15">
                    {c.links.map((l) => (
                      <Link key={l} href="/entreprises" className="group flex items-center justify-between gap-3 border-b border-ivoire/15 py-3.5 text-ivoire">
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-or-300">{t(`${c.k}.links.${l}.label`)}</span>
                          <span className="block truncate text-xs text-ivoire/60">{t(`${c.k}.links.${l}.desc`)}</span>
                        </span>
                        <Arrow />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
