import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DetailEditor } from './DetailEditor';
import type { DetailDescriptorValue } from '@/lib/admin/descriptor-types';

const value: DetailDescriptorValue = {
  type: 'detail', title: 'Fiscalité',
  sections: [{ label: 'Acompte', rows: [{ label: 'Échéance', value: '15/06' }] }],
};

describe('DetailEditor', () => {
  it('renders the title, section label, and row fields', () => {
    render(<DetailEditor value={value} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('Fiscalité')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Acompte')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Échéance')).toBeInTheDocument();
    expect(screen.getByDisplayValue('15/06')).toBeInTheDocument();
  });

  it('updates the title', async () => {
    const onChange = vi.fn();
    render(<DetailEditor value={value} onChange={onChange} />);
    await userEvent.type(screen.getByDisplayValue('Fiscalité'), '!');
    expect(onChange).toHaveBeenLastCalledWith({ ...value, title: 'Fiscalité!' });
  });

  it('adds a section', async () => {
    const onChange = vi.fn();
    render(<DetailEditor value={{ ...value, sections: [] }} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: '+ Ajouter' }));
    expect(onChange).toHaveBeenCalledWith({ ...value, sections: [{ rows: [] }] });
  });

  it('adds a row inside a section', async () => {
    const onChange = vi.fn();
    render(<DetailEditor value={value} onChange={onChange} />);
    // ArrayField renders its own "+ Ajouter" after its items, so the row-level
    // (nested) button precedes the section-level (outer) button in DOM order.
    const addButtons = screen.getAllByRole('button', { name: '+ Ajouter' });
    await userEvent.click(addButtons[0]);
    expect(onChange).toHaveBeenCalledWith({
      ...value,
      sections: [{ label: 'Acompte', rows: [{ label: 'Échéance', value: '15/06' }, { label: '', value: '' }] }],
    });
  });
});
