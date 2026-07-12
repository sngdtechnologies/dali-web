import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { TrustBadges } from './TrustBadges';

const messages = {
  trust: { offline: 'Fonctionne hors ligne', encrypted: 'Données chiffrées', sms: 'Suivi automatique SMS', banks: 'Banques locales supportées' },
};

describe('TrustBadges', () => {
  it('renders all four trust items', () => {
    render(
      <NextIntlClientProvider locale="fr" messages={messages}>
        <TrustBadges />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText('Fonctionne hors ligne')).toBeInTheDocument();
    expect(screen.getByText('Banques locales supportées')).toBeInTheDocument();
  });
});
