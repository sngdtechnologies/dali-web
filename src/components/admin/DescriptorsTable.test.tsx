import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DescriptorsTable } from './DescriptorsTable';

const item = {
  key: 'fiscalite', locale: 'fr', type: 'detail', title: 'Fiscalité',
  version: 3, updatedAt: '2026-07-01T00:00:00.000Z',
};

describe('DescriptorsTable', () => {
  it('renders a row per descriptor with a link to its editor', () => {
    render(<DescriptorsTable items={[item]} />);
    expect(screen.getByText('Fiscalité')).toBeInTheDocument();
    expect(screen.getByText('fiscalite')).toBeInTheDocument();
    expect(screen.getByText('fr')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Fiscalité/ })).toHaveAttribute('href', '/admin/descriptors/fiscalite/fr');
  });

  it('renders an empty state when there are no descriptors', () => {
    render(<DescriptorsTable items={[]} />);
    expect(screen.getByText('Aucun descripteur.')).toBeInTheDocument();
  });
});
