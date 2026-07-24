import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WizardEditor } from './WizardEditor';
import type { WizardDescriptorValue } from '@/lib/admin/descriptor-types';

const value: WizardDescriptorValue = {
  type: 'wizard', title: 'Nouvel actif',
  steps: [{ title: 'Type', fields: [] }],
};

describe('WizardEditor', () => {
  it('renders the wizard title and each step title', () => {
    render(<WizardEditor value={value} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('Nouvel actif')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Type')).toBeInTheDocument();
  });

  it('adds a step with an empty title and no fields', async () => {
    const onChange = vi.fn();
    render(<WizardEditor value={{ ...value, steps: [] }} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: '+ Ajouter' }));
    expect(onChange).toHaveBeenCalledWith({ ...value, steps: [{ title: '', fields: [] }] });
  });

  it('updates a step field through the nested FormEditor', async () => {
    const onChange = vi.fn();
    render(<WizardEditor value={value} onChange={onChange} />);
    await userEvent.type(screen.getByDisplayValue('Type'), '!');
    expect(onChange).toHaveBeenLastCalledWith({ ...value, steps: [{ title: 'Type!', fields: [] }] });
  });
});
