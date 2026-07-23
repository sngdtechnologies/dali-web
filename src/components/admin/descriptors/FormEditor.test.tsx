import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormEditor } from './FormEditor';
import type { FormFields } from '@/lib/admin/descriptor-types';

const value: FormFields = {
  title: 'Nouvel objectif',
  fields: [{ kind: 'text', key: 'name', label: 'Nom', value: 'Voiture' }],
};

describe('FormEditor', () => {
  it('renders the title and the field key/label/value', () => {
    render(<FormEditor value={value} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('Nouvel objectif')).toBeInTheDocument();
    expect(screen.getByDisplayValue('name')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Nom')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Voiture')).toBeInTheDocument();
  });

  it('adds a field defaulting to kind text', async () => {
    const onChange = vi.fn();
    render(<FormEditor value={{ ...value, fields: [] }} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: '+ Ajouter' }));
    expect(onChange).toHaveBeenCalledWith({ ...value, fields: [{ kind: 'text', key: '', label: '' }] });
  });

  it('switching a field kind from text to select clears value and adds an empty options array', async () => {
    const onChange = vi.fn();
    render(<FormEditor value={value} onChange={onChange} />);
    await userEvent.selectOptions(screen.getByLabelText('Type'), 'select');
    expect(onChange).toHaveBeenLastCalledWith({
      ...value,
      fields: [{ kind: 'select', key: 'name', label: 'Nom', options: [] }],
    });
  });

  it('switching a field kind to docs shows a "Documents" add control', async () => {
    render(<FormEditor value={{ ...value, fields: [{ kind: 'docs', key: 'd', label: 'D', docs: [] }] }} onChange={vi.fn()} />);
    expect(screen.getByText('Documents')).toBeInTheDocument();
  });

  it('renders the select-kind grid toggle and options ArrayField only for select', () => {
    render(<FormEditor value={{ ...value, fields: [{ kind: 'select', key: 's', label: 'S', options: [] }] }} onChange={vi.fn()} />);
    expect(screen.getByText('Affichage en grille')).toBeInTheDocument();
    expect(screen.getByText('Options')).toBeInTheDocument();
  });

  it('updates a top-level form field like submitLabel', async () => {
    // A single keystroke: this input is controlled by the (spy-only, non-wired) onChange prop,
    // so React resets the DOM value to the unchanged prop after each keystroke — typing a
    // multi-character string here would only surface its last character.
    const onChange = vi.fn();
    render(<FormEditor value={value} onChange={onChange} />);
    await userEvent.type(screen.getByLabelText('Label du bouton de validation'), 'V');
    expect(onChange).toHaveBeenLastCalledWith({ ...value, submitLabel: 'V' });
  });
});
