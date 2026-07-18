import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UsersTable } from './UsersTable';

const item = {
  id: 'u1',
  email: 'herve@x.app',
  createdAt: '2026-07-01T00:00:00.000Z',
  lastSeenAt: '2026-07-10T00:00:00.000Z',
  syncCount: 3,
  usageCount: 2,
};

describe('UsersTable', () => {
  it('renders a row per user with a link to the detail page', () => {
    render(<UsersTable items={[item]} />);
    expect(screen.getByText('herve@x.app')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /herve@x.app/ })).toHaveAttribute('href', '/admin/users/u1');
  });

  it('falls back to the id when the user has no email', () => {
    render(<UsersTable items={[{ ...item, email: null }]} />);
    expect(screen.getByRole('link', { name: /u1/ })).toBeInTheDocument();
  });

  it('renders an empty state when there are no users', () => {
    render(<UsersTable items={[]} />);
    expect(screen.getByText('Aucun utilisateur.')).toBeInTheDocument();
  });
});
