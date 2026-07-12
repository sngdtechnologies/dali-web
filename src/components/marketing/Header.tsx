'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';
import { NavDropdown } from '@/components/ui/NavDropdown';
import { cn } from '@/lib/utils';

export function Header({ locale }: { locale: 'fr' | 'en' }) {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const featureItems = [
    { label: t('menu.aggregation'), href: '/fonctionnalites' },
    { label: t('menu.sms'), href: '/fonctionnalites' },
    { label: t('menu.ai'), href: '/fonctionnalites' },
    { label: t('menu.score'), href: '/fonctionnalites' },
    { label: t('menu.budgets'), href: '/fonctionnalites' },
  ];
  const enterpriseItems = [
    { label: t('menu.payments'), href: '/entreprises' },
    { label: t('menu.data'), href: '/entreprises' },
    { label: t('menu.insights'), href: '/entreprises' },
  ];

  return (
    <header className={cn('sticky top-0 z-50 transition-all duration-300', scrolled ? 'bg-ivoire/85 shadow-sm backdrop-blur' : 'bg-transparent')}>
      <Container className={cn('flex items-center justify-between transition-all duration-300', scrolled ? 'py-3' : 'py-5')}>
        <Link href="/" className="font-serif text-2xl">Dali</Link>
        <nav className="hidden items-center gap-6 md:flex">
          <NavDropdown label={t('features')} items={featureItems} />
          <NavDropdown label={t('enterprise')} items={enterpriseItems} />
          <Link href="/securite" className="py-2 text-sm">{t('security')}</Link>
          <Link href="/faq" className="py-2 text-sm">{t('faq')}</Link>
          <Link href="/a-propos" className="py-2 text-sm">{t('about')}</Link>
        </nav>
        <div className="flex items-center gap-3">
          <LocaleSwitcher currentLocale={locale} />
          <Button href="#download" className="hidden sm:inline-flex">{t('download')}</Button>
        </div>
      </Container>
    </header>
  );
}
