import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';

const SP = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true };

const SOCIALS: { name: string; path: ReactNode }[] = [
  { name: 'X', path: <path d="M18.9 2H22l-7 8 8.2 12h-6.4l-5-7-5.8 7H2l7.6-9L1.7 2h6.6l4.5 6.3zM17 20h1.6L7 4H5.3z" /> },
  { name: 'LinkedIn', path: <path d="M6.9 8.5H3.8V21h3.1zM5.35 3a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6M21 21v-6.9c0-3.7-2-5.4-4.6-5.4-2.1 0-3 1.2-3.6 2v-1.7H9.7V21h3.1v-6.5c0-1.5.9-2.4 2-2.4s1.9.8 1.9 2.5V21z" /> },
  { name: 'Instagram', path: <path d="M12 2c2.7 0 3 0 4.1.1 2.7.1 4 1.5 4.1 4.1.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c-.1 2.6-1.4 4-4.1 4.1-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-2.7-.1-4-1.5-4.1-4.1C2.8 15 2.8 14.7 2.8 12s0-3 .1-4.1C3 5.2 4.3 3.9 7 3.8 8.1 2.7 8.4 2.7 12 2.7zm0 3.2A6.8 6.8 0 1 0 18.8 12 6.8 6.8 0 0 0 12 5.2m0 11.2A4.4 4.4 0 1 1 16.4 12 4.4 4.4 0 0 1 12 16.4M18.9 4a1.6 1.6 0 1 0 1.6 1.6A1.6 1.6 0 0 0 18.9 4" /> },
  { name: 'YouTube', path: <path d="M23 8s-.2-1.6-.9-2.3c-.9-.9-1.8-.9-2.3-1C16.6 4.4 12 4.4 12 4.4s-4.6 0-7.8.3c-.5 0-1.4.1-2.3 1C1.2 6.4 1 8 1 8S.8 9.9.8 11.7v1.6C.8 15.1 1 17 1 17s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.3 7.6.3s4.6 0 7.8-.3c.5 0 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.7v-1.6C23.2 9.9 23 8 23 8M9.7 15.4V8.6l6 3.4z" /> },
];

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();
  const columns = [
    {
      title: t('colProduct'),
      links: [
        { label: t('app'), href: '/solutions/app' },
        { label: t('ai'), href: '/solutions/app#assistant-ia' },
        { label: t('score'), href: '/solutions/app#dali-score' },
        { label: t('features'), href: '/fonctionnalites' },
        { label: t('security'), href: '/securite' },
      ],
    },
    {
      title: t('colSolutions'),
      links: [
        { label: t('payments'), href: '/solutions/virement-simplifie' },
        { label: t('data'), href: '/solutions/solution-aggregation-bancaire' },
        { label: t('insights'), href: '/solutions/insights' },
        { label: t('studies'), href: '/solutions/nos-etudes' },
      ],
    },
    {
      title: t('colResources'),
      links: [
        { label: t('faq'), href: '/faq' },
        { label: t('help'), href: '/centre-aide' },
        { label: t('blog'), href: '/blog' },
      ],
    },
    {
      title: t('colCompany'),
      links: [
        { label: t('about'), href: '/a-propos' },
        { label: t('careers'), href: '/carrieres' },
        { label: t('events'), href: '/evenements' },
        { label: t('contact'), href: '/entreprises' },
      ],
    },
  ];
  const legal = [
    { label: t('terms'), href: '/legal/conditions' },
    { label: t('privacy'), href: '/legal/confidentialite' },
    { label: t('cookies'), href: '/legal/cookies' },
  ];
  return (
    <footer className="bg-foret-900 py-16 text-ivoire">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-light.svg" alt="Dali" className="h-12 w-auto" />
            <p className="mt-4 max-w-xs text-sm text-ivoire/70">{t('description')}</p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a key={s.name} href="#" aria-label={s.name} className="flex h-9 w-9 items-center justify-center rounded-dali-full bg-ivoire/10 text-ivoire/80 transition-colors hover:bg-ivoire/20 hover:text-ivoire">
                  <svg {...SP}>{s.path}</svg>
                </a>
              ))}
            </div>
          </div>
          {columns.map((col) => (
            <nav key={col.title} className="flex flex-col gap-2.5 text-sm">
              <span className="mb-1 text-xs uppercase tracking-wide text-ivoire/50">{col.title}</span>
              {col.links.map((l) => (
                <Link key={l.label} href={l.href} className="text-ivoire/80 transition-colors hover:text-ivoire">
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-ivoire/10 pt-6 text-xs text-ivoire/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Dali. {t('rights')}</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((l) => (
              <Link key={l.label} href={l.href} className="hover:text-ivoire/80">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
