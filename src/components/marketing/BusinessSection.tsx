import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { Link } from '@/i18n/routing';

const P = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };

const CARDS: { k: 'payments' | 'data' | 'observatory'; links: string[]; icon: ReactNode }[] = [
  { k: 'payments', links: ['l1', 'l2'], icon: <svg {...P}><path d="M3 8h14l-3-3M21 16H7l3 3" /></svg> },
  { k: 'data', links: ['l1', 'l2', 'l3'], icon: <svg {...P}><path d="M12 3 3 8l9 5 9-5-9-5ZM3 12l9 5 9-5" /></svg> },
  { k: 'observatory', links: ['l1'], icon: <svg {...P}><path d="M4 20V10M10 20V4M16 20v-7M22 20V8" /></svg> },
];

export async function BusinessSection() {
  const t = await getTranslations('business');
  return (
    <Section>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <h2 className="max-w-xl text-4xl md:text-5xl">{t('title')}</h2>
          <p className="text-sm leading-relaxed text-sable-700">{t('intro')}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CARDS.map((c) => (
            <Reveal key={c.k}>
              <div className="flex h-full flex-col rounded-dali-lg bg-gradient-to-b from-foret-700 to-foret-900 p-6 text-ivoire">
                <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-dali-sm bg-ivoire/10 text-ivoire">
                  {c.icon}
                </span>
                <h3 className="text-xl leading-snug">{t(`${c.k}.title`)}</h3>
                <div className="mt-5 flex flex-col gap-2">
                  {c.links.map((l) => (
                    <Link key={l} href="/entreprises" className="text-sm font-medium text-or-300 hover:underline">
                      {t(`${c.k}.${l}`)} →
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
