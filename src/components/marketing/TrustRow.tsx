import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';

const P = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };

const ITEMS: { k: 'auto' | 'secure' | 'offline'; icon: ReactNode }[] = [
  { k: 'auto', icon: <svg {...P}><path d="M21 11.5a8.4 8.4 0 1 1-4-7.1M21 4v4h-4" /></svg> },
  { k: 'secure', icon: <svg {...P}><path d="M12 3 5 6v5c0 5 3.5 8 7 10 3.5-2 7-5 7-10V6z" /><path d="m9 12 2 2 4-4" /></svg> },
  { k: 'offline', icon: <svg {...P}><path d="M5 12.6a11 11 0 0 1 14 0M8.5 16.1a6 6 0 0 1 7 0M12 20h.01M2 2l20 20" /></svg> },
];

export async function TrustRow() {
  const t = await getTranslations('trustRow');
  return (
    <Section>
      <Container className="grid gap-6 md:grid-cols-3">
        {ITEMS.map((it) => (
          <Reveal key={it.k}>
            <div className="h-full rounded-dali-lg border border-encre/10 bg-white p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-dali-full bg-foret-50 text-foret-600">
                {it.icon}
              </span>
              <h3 className="mt-4 text-lg">{t(`${it.k}.title`)}</h3>
              <p className="mt-2 text-sm text-sable-700">{t(`${it.k}.body`)}</p>
            </div>
          </Reveal>
        ))}
      </Container>
    </Section>
  );
}
