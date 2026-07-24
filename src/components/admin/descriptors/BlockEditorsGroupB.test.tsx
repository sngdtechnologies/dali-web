import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  InfoTileBlockEditor, StepHeaderBlockEditor, NoteBlockEditor,
  ButtonsBlockEditor, ProgressBlockEditor, AvatarsBlockEditor,
} from './BlockEditorsGroupB';
import type { SduiBlockValue } from '@/lib/admin/descriptor-types';

describe('InfoTileBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'infoTile' }> = { type: 'infoTile', icon: 'i', title: 'Titre' };
  it('renders title and icon', () => {
    render(<InfoTileBlockEditor block={block} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('Titre')).toBeInTheDocument();
    expect(screen.getByDisplayValue('i')).toBeInTheDocument();
  });
});

describe('StepHeaderBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'stepHeader' }> = { type: 'stepHeader', number: '1', label: 'Étape' };
  it('renders number and label', () => {
    render(<StepHeaderBlockEditor block={block} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Étape')).toBeInTheDocument();
  });
});

describe('NoteBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'note' }> = { type: 'note', text: 'Attention' };
  it('renders the text and toggles italic', async () => {
    const onChange = vi.fn();
    render(<NoteBlockEditor block={block} onChange={onChange} />);
    expect(screen.getByDisplayValue('Attention')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('checkbox', { name: 'Italique' }));
    expect(onChange).toHaveBeenLastCalledWith({ ...block, italic: false });
  });
});

describe('ButtonsBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'buttons' }> = { type: 'buttons', buttons: [{ label: 'Valider' }] };
  it('renders a button label and adds a new one', async () => {
    const onChange = vi.fn();
    render(<ButtonsBlockEditor block={{ ...block, buttons: [] }} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: '+ Ajouter' }));
    expect(onChange).toHaveBeenCalledWith({ ...block, buttons: [{ label: '' }] });
  });
});

describe('ProgressBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'progress' }> = { type: 'progress', fraction: 0.5 };
  it('updates fraction as a number', () => {
    // A single atomic change: this input is controlled by a spy-only onChange (no
    // re-render feeds a new value back), so a clear()+type() sequence of keystrokes
    // gets reset between events instead of accumulating.
    const onChange = vi.fn();
    render(<ProgressBlockEditor block={block} onChange={onChange} />);
    const input = screen.getByLabelText('Fraction (0 à 1)') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '0.8' } });
    expect(onChange).toHaveBeenLastCalledWith({ ...block, fraction: 0.8 });
  });
});

describe('AvatarsBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'avatars' }> = {
    type: 'avatars', rows: [{ initials: 'AB', name: 'A B', status: { label: 'Actif' } }],
  };
  it('renders a row and its status label', () => {
    render(<AvatarsBlockEditor block={block} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('A B')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Actif')).toBeInTheDocument();
  });
  it('switching status to badge sets kind and shows a variant selector', async () => {
    const onChange = vi.fn();
    render(<AvatarsBlockEditor block={block} onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox', { name: 'Statut en badge' }));
    expect(onChange).toHaveBeenLastCalledWith({
      ...block,
      rows: [{ ...block.rows[0], status: { kind: 'badge', label: 'Actif' } }],
    });
  });
  it('adds a row with an empty non-badge status', async () => {
    const onChange = vi.fn();
    render(<AvatarsBlockEditor block={{ ...block, rows: [] }} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: '+ Ajouter' }));
    expect(onChange).toHaveBeenCalledWith({ ...block, rows: [{ initials: '', name: '', status: { label: '' } }] });
  });
});
