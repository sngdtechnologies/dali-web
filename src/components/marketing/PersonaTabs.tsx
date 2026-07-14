'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
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
        <h2 className="max-w-2xl text-4xl text-foret-800 md:text-5xl">{t('title')}</h2>
        <p className="mt-3 max-w-xl text-sable-700">{t('sub')}</p>
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr_1fr]">
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

          <div className="relative mx-auto hidden h-[460px] w-full max-w-[360px] lg:block" aria-hidden>
            <div className="absolute left-0 top-4 aspect-[9/19] w-[58%] overflow-hidden rounded-[24px] bg-foret-900 shadow-xl ring-1 ring-black/5">
              <Image src="/screens/comptes.webp" alt="" fill sizes="220px" className="object-cover object-top" />
            </div>
            <div className="absolute right-0 top-16 aspect-[9/19] w-[56%] overflow-hidden rounded-[24px] bg-white shadow-2xl ring-1 ring-black/5">
              <Image src="/screens/paiement.webp" alt="" fill sizes="220px" className="object-cover object-top" />
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-xl leading-relaxed text-encre md:text-2xl">{t(`${current}.body`)}</p>
            <Link
              href="/fonctionnalites"
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-dali-full bg-foret-800 px-5 py-3 text-sm font-medium text-ivoire transition-colors hover:bg-foret-700"
            >
              {t('appCta')}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
