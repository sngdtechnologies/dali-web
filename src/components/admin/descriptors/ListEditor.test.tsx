import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ListEditor } from './ListEditor';
import type { ListDescriptorValue } from '@/lib/admin/descriptor-types';

const value: ListDescriptorValue = {
  type: 'list', title: 'Recherche', emptyLabel: 'Rien ici', items: [{ title: 'Item A', subtitle: 'Sub A' }],
};

describe('ListEditor', () => {
  it('renders title, emptyLabel, and item fields', () => {
    render(<ListEditor value={value} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('Recherche')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Rien ici')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Item A')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Sub A')).toBeInTheDocument();
  });

  it('adds an item', async () => {
    const onChange = vi.fn();
    render(<ListEditor value={{ ...value, items: [] }} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: '+ Ajouter' }));
    expect(onChange).toHaveBeenCalledWith({ ...value, items: [{ title: '' }] });
  });

  it('toggles the fab on and off', async () => {
    const onChange = vi.fn();
    render(<ListEditor value={value} onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox', { name: 'Bouton flottant (FAB)' }));
    expect(onChange).toHaveBeenLastCalledWith({ ...value, fab: { label: '' } });
  });

  it('removes the fab when unchecked', async () => {
    const onChange = vi.fn();
    render(<ListEditor value={{ ...value, fab: { label: 'Ajouter' } }} onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox', { name: 'Bouton flottant (FAB)' }));
    expect(onChange).toHaveBeenLastCalledWith({ ...value, fab: undefined });
  });
});
