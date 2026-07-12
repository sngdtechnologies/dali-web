import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { PageHeader } from './PageHeader';

const messages = { pages: { features: { title: 'Titre', body: 'Corps' } } };

describe('PageHeader', () => {
  it('renders title and body from the pages namespace', () => {
    render(
      <NextIntlClientProvider locale="fr" messages={messages}>
        <PageHeader namespace="features" />
      </NextIntlClientProvider>,
    );
    expect(screen.getByRole('heading', { name: 'Titre' })).toBeInTheDocument();
    expect(screen.getByText('Corps')).toBeInTheDocument();
  });
});
