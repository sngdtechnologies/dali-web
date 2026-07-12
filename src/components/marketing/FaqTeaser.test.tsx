import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('@/i18n/routing', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

import { FaqTeaser } from './FaqTeaser';

const messages = {
  faq: {
    title: 'Questions fréquentes',
    seeAll: 'Voir toutes les questions',
    items: {
      cost: { q: 'Dali est-il gratuit ?', a: 'Oui.' },
      offline: { q: 'Hors ligne ?', a: 'Oui.' },
      sms: { q: 'SMS ?', a: 'Oui.' },
      privacy: { q: 'Sécurité ?', a: 'Oui.' },
      score: { q: 'Score ?', a: 'Oui.' },
      accounts: { q: 'Comptes ?', a: 'Oui.' },
    },
  },
};

describe('FaqTeaser', () => {
  it('shows only the first four questions', () => {
    render(
      <NextIntlClientProvider locale="fr" messages={messages}>
        <FaqTeaser />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText('Dali est-il gratuit ?')).toBeInTheDocument();
    expect(screen.queryByText('Score ?')).not.toBeInTheDocument();
  });
});
