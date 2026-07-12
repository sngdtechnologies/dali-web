import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('@/i18n/routing', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
  usePathname: () => '/',
  useRouter: () => ({ replace: vi.fn() }),
}));

import { Header } from './Header';

const messages = {
  nav: {
    features: 'Fonctionnalités',
    enterprise: 'Entreprises',
    security: 'Sécurité',
    faq: 'FAQ',
    about: 'À propos',
    download: 'Télécharger',
    menu: {
      aggregation: 'Agrégation', sms: 'SMS', ai: 'IA', score: 'Score', budgets: 'Budgets',
      payments: 'Paiements', data: 'Données', insights: 'Insights',
    },
  },
  locale: { switchTo: 'English', label: 'Langue' },
};

describe('Header', () => {
  it('renders dropdown triggers and flat nav links', () => {
    render(
      <NextIntlClientProvider locale="fr" messages={messages}>
        <Header locale="fr" />
      </NextIntlClientProvider>,
    );
    expect(screen.getByRole('button', { name: /Fonctionnalités/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entreprises/ })).toBeInTheDocument();
    expect(screen.getByText('Sécurité')).toBeInTheDocument();
  });
});
