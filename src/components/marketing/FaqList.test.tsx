import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { FaqList } from './FaqList';

const messages = {
  faq: {
    items: {
      cost: { q: 'Q1', a: 'A1' },
      offline: { q: 'Q2', a: 'A2' },
      sms: { q: 'Q3', a: 'A3' },
      privacy: { q: 'Q4', a: 'A4' },
      score: { q: 'Q5', a: 'A5' },
      accounts: { q: 'Q6', a: 'A6' },
    },
  },
};

describe('FaqList', () => {
  it('renders all six questions', () => {
    render(
      <NextIntlClientProvider locale="fr" messages={messages}>
        <FaqList />
      </NextIntlClientProvider>,
    );
    ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'].forEach((q) => expect(screen.getByText(q)).toBeInTheDocument());
  });
});
