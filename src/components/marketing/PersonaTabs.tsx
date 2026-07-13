'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const PERSONAS = ['individuals', 'students', 'families', 'professionals', 'ecommerce'] as const;

export function PersonaTabs() {
  const t = useTranslations('personas');
  const [active, setActive] = useState(0);
  const current = PERSONAS[active];
  return (
    <section className="bg-foret-50 py-20 md:py-28">
      <Container>
        <h2 className="max-w-2xl text-4xl md:text-5xl">{t('title')}</h2>
        <p className="mt-3 max-w-xl text-sable-700">{t('sub')}</p>
        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-2">
            {PERSONAS.map((p, i) => (
              <button
                key={p}
                type="button"
                aria-current={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  'flex items-center justify-between rounded-dali-full px-5 py-3.5 text-left text-sm font-medium transition-colors',
                  i === active ? 'bg-foret-800 text-ivoire' : 'text-encre hover:bg-white',
                )}
              >
                {t(`${p}.title`)}
                <span aria-hidden>→</span>
              </button>
            ))}
          </div>
          <div className="rounded-dali-xl bg-white p-8 shadow-sm">
            <h3 className="text-2xl">{t(`${current}.title`)}</h3>
            <p className="mt-3 text-sable-700">{t(`${current}.body`)}</p>
            <Link href="/fonctionnalites" className="mt-6 inline-block text-sm font-medium text-foret-700 hover:underline">
              {t('cta')} →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
