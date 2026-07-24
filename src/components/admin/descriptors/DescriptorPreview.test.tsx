import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DescriptorPreview } from './DescriptorPreview';
import type { ScreenDescriptorValue } from '@/lib/admin/descriptor-types';

describe('DescriptorPreview', () => {
  it('renders detail sections and rows', () => {
    const value: ScreenDescriptorValue = {
      type: 'detail', title: 'Fiscalité',
      sections: [{ label: 'Acompte', rows: [{ label: 'Échéance', value: '15/06' }] }],
    };
    render(<DescriptorPreview value={value} />);
    expect(screen.getByText('Fiscalité')).toBeInTheDocument();
    expect(screen.getByText('Acompte')).toBeInTheDocument();
    expect(screen.getByText('Échéance')).toBeInTheDocument();
    expect(screen.getByText('15/06')).toBeInTheDocument();
  });

  it('renders the empty label for an empty list', () => {
    const value: ScreenDescriptorValue = { type: 'list', title: 'Recherche', items: [], emptyLabel: 'Rien ici' };
    render(<DescriptorPreview value={value} />);
    expect(screen.getByText('Rien ici')).toBeInTheDocument();
  });

  it('renders list item titles', () => {
    const value: ScreenDescriptorValue = { type: 'list', title: 'Recherche', items: [{ title: 'Item A', trailing: '10 000' }] };
    render(<DescriptorPreview value={value} />);
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('10 000')).toBeInTheDocument();
  });

  it('renders form field labels', () => {
    const value: ScreenDescriptorValue = { type: 'form', title: 'Nouvel objectif', fields: [{ kind: 'text', key: 'name', label: 'Nom' }] };
    render(<DescriptorPreview value={value} />);
    expect(screen.getByText('Nom')).toBeInTheDocument();
  });

  it('renders wizard step titles and their fields', () => {
    const value: ScreenDescriptorValue = {
      type: 'wizard', title: 'Nouvel actif',
      steps: [{ title: 'Type', fields: [{ kind: 'text', key: 'k', label: 'Catégorie' }] }],
    };
    render(<DescriptorPreview value={value} />);
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Catégorie')).toBeInTheDocument();
  });

  it('delegates blocks screens to BlockPreview', () => {
    const value: ScreenDescriptorValue = { type: 'blocks', title: 'Clôture', blocks: [{ type: 'note', text: 'Aucune alarme' }] };
    render(<DescriptorPreview value={value} />);
    expect(screen.getByText('Aucune alarme')).toBeInTheDocument();
  });
});
