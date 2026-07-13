import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('@/i18n/routing', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
  usePathname: () => '/',
  useRouter: () => ({ replace: vi.fn() }),
}));

import frMessages from '../../../messages/fr.json';
import { Header } from './Header';

describe('Header', () => {
  it('renders the mega-menu triggers', () => {
    render(
      <NextIntlClientProvider locale="fr" messages={frMessages}>
        <Header locale="fr" />
      </NextIntlClientProvider>,
    );
    expect(screen.getByRole('button', { name: /Nos solutions/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cas d'usages/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ressources/ })).toBeInTheDocument();
  });

  it('opens the solutions mega-menu and reveals its items on click', async () => {
    render(
      <NextIntlClientProvider locale="fr" messages={frMessages}>
        <Header locale="fr" />
      </NextIntlClientProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: /Nos solutions/ }));
    expect(screen.getByText("L'app Dali")).toBeInTheDocument();
    expect(screen.getByText('Dali-Score')).toBeInTheDocument();
  });
});
