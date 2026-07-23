import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  RichTextBlockEditor, AmountBlockEditor, IconTileBlockEditor,
  BadgeBlockEditor, KeyValuesBlockEditor, IconRowsBlockEditor,
} from './BlockEditorsGroupA';
import type { SduiBlockValue } from '@/lib/admin/descriptor-types';

describe('RichTextBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'richText' }> = { type: 'richText', spans: [{ text: 'Hello', role: 'h1' }] };

  it('renders the span text and role', () => {
    render(<RichTextBlockEditor block={block} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('Hello')).toBeInTheDocument();
  });

  it('adds a span', async () => {
    const onChange = vi.fn();
    render(<RichTextBlockEditor block={{ ...block, spans: [] }} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: '+ Ajouter' }));
    expect(onChange).toHaveBeenCalledWith({ ...block, spans: [{ text: '' }] });
  });

  it('updates the span color token', async () => {
    const onChange = vi.fn();
    render(<RichTextBlockEditor block={block} onChange={onChange} />);
    await userEvent.selectOptions(screen.getByLabelText('Couleur'), 'terre700');
    expect(onChange).toHaveBeenLastCalledWith({ ...block, spans: [{ ...block.spans[0], color: 'terre700' }] });
  });
});

describe('AmountBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'amount' }> = { type: 'amount', value: '100000' };

  it('renders the value', () => {
    render(<AmountBlockEditor block={block} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('100000')).toBeInTheDocument();
  });

  it('updates size as a number', async () => {
    // Single keystroke: this input is controlled by a spy-only onChange (no re-render
    // feeds a new value back), so React resets the DOM between keystrokes and a
    // multi-digit type() would only surface its last digit.
    const onChange = vi.fn();
    render(<AmountBlockEditor block={block} onChange={onChange} />);
    await userEvent.type(screen.getByLabelText('Taille'), '3');
    expect(onChange).toHaveBeenLastCalledWith({ ...block, size: 3 });
  });

  it('toggles serif', async () => {
    const onChange = vi.fn();
    render(<AmountBlockEditor block={block} onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox', { name: 'Serif' }));
    expect(onChange).toHaveBeenLastCalledWith({ ...block, serif: true });
  });
});

describe('IconTileBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'iconTile' }> = { type: 'iconTile', icon: 'wallet' };

  it('renders the icon', () => {
    render(<IconTileBlockEditor block={block} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('wallet')).toBeInTheDocument();
  });

  it('updates the tone token', async () => {
    const onChange = vi.fn();
    render(<IconTileBlockEditor block={block} onChange={onChange} />);
    await userEvent.selectOptions(screen.getByLabelText('Teinte'), 'foret800');
    expect(onChange).toHaveBeenLastCalledWith({ ...block, tone: 'foret800' });
  });
});

describe('BadgeBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'badge' }> = { type: 'badge', label: 'Nouveau' };

  it('renders the label', () => {
    render(<BadgeBlockEditor block={block} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('Nouveau')).toBeInTheDocument();
  });

  it('updates the variant', async () => {
    const onChange = vi.fn();
    render(<BadgeBlockEditor block={block} onChange={onChange} />);
    await userEvent.selectOptions(screen.getByLabelText('Variante'), 'attention');
    expect(onChange).toHaveBeenLastCalledWith({ ...block, variant: 'attention' });
  });
});

describe('KeyValuesBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'keyValues' }> = { type: 'keyValues', rows: [{ label: 'Solde', value: '10 000' }] };

  it('renders a row', () => {
    render(<KeyValuesBlockEditor block={block} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('Solde')).toBeInTheDocument();
  });

  it('adds a row', async () => {
    const onChange = vi.fn();
    render(<KeyValuesBlockEditor block={{ ...block, rows: [] }} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: '+ Ajouter' }));
    expect(onChange).toHaveBeenCalledWith({ ...block, rows: [{ label: '', value: '' }] });
  });
});

describe('IconRowsBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'iconRows' }> = { type: 'iconRows', rows: [{ icon: 'car', title: 'Trajet' }] };

  it('renders a row', () => {
    render(<IconRowsBlockEditor block={block} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('Trajet')).toBeInTheDocument();
  });

  it('adds a row', async () => {
    const onChange = vi.fn();
    render(<IconRowsBlockEditor block={{ ...block, rows: [] }} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: '+ Ajouter' }));
    expect(onChange).toHaveBeenCalledWith({ ...block, rows: [{ icon: '', title: '' }] });
  });
});
