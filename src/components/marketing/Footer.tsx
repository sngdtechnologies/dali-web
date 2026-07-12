import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();
  const columns = [
    {
      title: t('colProduct'),
      links: [
        { label: t('features'), href: '/fonctionnalites' },
        { label: t('security'), href: '/securite' },
      ],
    },
    {
      title: t('colResources'),
      links: [
        { label: t('faq'), href: '/faq' },
        { label: t('about'), href: '/a-propos' },
      ],
    },
    {
      title: t('colCompany'),
      links: [{ label: t('enterprise'), href: '/entreprises' }],
    },
    {
      title: t('colLegal'),
      links: [
        { label: t('terms'), href: '/legal/conditions' },
        { label: t('privacy'), href: '/legal/confidentialite' },
        { label: t('cookies'), href: '/legal/cookies' },
      ],
    },
  ];
  return (
    <footer className="bg-foret-900 py-16 text-ivoire">
      <Container className="grid gap-10 md:grid-cols-5">
        <div>
          <p className="font-serif text-2xl">Dali</p>
          <p className="mt-2 text-sm text-ivoire/70">{t('tagline')}</p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} className="flex flex-col gap-2 text-sm">
            <span className="mb-1 text-ivoire/50">{col.title}</span>
            {col.links.map((l) => (
              <Link key={l.label} href={l.href} className="text-ivoire/80 transition-colors hover:text-ivoire">
                {l.label}
              </Link>
            ))}
          </nav>
        ))}
      </Container>
      <Container>
        <p className="mt-12 border-t border-ivoire/10 pt-6 text-xs text-ivoire/50">© {year} Dali. {t('rights')}</p>
      </Container>
    </footer>
  );
}
