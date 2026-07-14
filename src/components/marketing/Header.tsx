'use client';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';
import { MegaMenu } from '@/components/ui/MegaMenu';
import { getNavMenus } from './nav-data';
import { cn } from '@/lib/utils';
import { CONTACT_HREF } from '@/lib/config';

export function Header({ locale }: { locale: 'fr' | 'en' }) {
  const t = useTranslations('nav');
  const menus = getNavMenus(t);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
    };
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, []);

  const active = menus.find((m) => m.key === open);

  return (
    <header className={cn('sticky top-0 z-50 transition-all duration-300', scrolled || open ? 'bg-white/95 shadow-sm backdrop-blur' : 'bg-white')}>
      <div ref={ref} onMouseLeave={() => setOpen(null)}>
        <Container className={cn('flex items-center justify-between transition-all duration-300', scrolled ? 'py-3' : 'py-4')}>
          <Link href="/" className="flex items-center" aria-label="Dali" onFocus={() => setOpen(null)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Dali" className="h-11 w-auto" />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {menus.map((menu) => (
              <button
                key={menu.key}
                type="button"
                aria-haspopup="true"
                aria-expanded={open === menu.key}
                onMouseEnter={() => setOpen(menu.key)}
                onClick={() => setOpen(menu.key)}
                className={cn(
                  'inline-flex items-center gap-1 rounded-dali-full px-3 py-2 text-sm font-medium transition-colors',
                  open === menu.key ? 'bg-foret-50 text-foret-700' : 'hover:bg-encre/5',
                )}
              >
                {menu.label}
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className={cn('transition-transform duration-200', open === menu.key && 'rotate-180')}>
                  <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <LocaleSwitcher currentLocale={locale} />
            <Button href={CONTACT_HREF} variant="secondary" className="hidden sm:inline-flex">
              {t('contact')}
            </Button>
          </div>
        </Container>
        {active && (
          <div className="absolute inset-x-0 top-full border-t border-encre/10 bg-white shadow-xl">
            <Container>
              {active.layout === 'columns' ? (
                <MegaMenu layout="columns" columns={active.columns} />
              ) : (
                <MegaMenu layout="grid" items={active.items} promo={active.promo} />
              )}
            </Container>
          </div>
        )}
      </div>
    </header>
  );
}
