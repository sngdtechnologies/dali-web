import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { LegalPage } from './LegalPage';

const messages = { legal: { notice: 'Draft notice', cookies: { title: 'Cookie policy', body: 'Body text.' } } };

describe('LegalPage', () => {
  it('renders the doc title, body and the draft notice', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <LegalPage docKey="cookies" />
      </NextIntlClientProvider>,
    );
    expect(screen.getByRole('heading', { name: 'Cookie policy' })).toBeInTheDocument();
    expect(screen.getByText('Body text.')).toBeInTheDocument();
    expect(screen.getByText('Draft notice')).toBeInTheDocument();
  });
});
