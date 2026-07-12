import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { FeatureBlock } from './FeatureBlock';

const messages = { features: { aggregation: { title: 'Tous vos comptes, réunis', body: 'x' } } };

describe('FeatureBlock', () => {
  it('renders the feature title from translations', () => {
    render(
      <NextIntlClientProvider locale="fr" messages={messages}>
        <FeatureBlock featureKey="aggregation" side="left" />
      </NextIntlClientProvider>,
    );
    expect(screen.getByRole('heading', { name: /Tous vos comptes/ })).toBeInTheDocument();
  });
});
