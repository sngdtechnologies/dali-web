import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { LocaleSwitcher } from './LocaleSwitcher';

vi.mock('@/i18n/routing', () => ({
  usePathname: () => '/',
  useRouter: () => ({ replace: vi.fn() }),
}));

describe('LocaleSwitcher', () => {
  it('renders the other-locale label', () => {
    render(
      <NextIntlClientProvider locale="fr" messages={{ locale: { switchTo: 'English', label: 'Langue' } }}>
        <LocaleSwitcher currentLocale="fr" />
      </NextIntlClientProvider>,
    );
    expect(screen.getByRole('button', { name: /English/i })).toBeInTheDocument();
  });
});
