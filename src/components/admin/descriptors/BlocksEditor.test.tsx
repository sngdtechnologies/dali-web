import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BlocksEditor, BlockNodeEditor } from './BlocksEditor';
import type { BlockScreenDescriptorValue, SduiBlockValue } from '@/lib/admin/descriptor-types';

describe('BlocksEditor', () => {
  const value: BlockScreenDescriptorValue = { type: 'blocks', title: 'Clôture', blocks: [{ type: 'note', text: 'Hello' }] };

  it('renders the title and dispatches to the note leaf editor', () => {
    render(<BlocksEditor value={value} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('Clôture')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Hello')).toBeInTheDocument();
  });

  it('adds a block defaulting to note', async () => {
    const onChange = vi.fn();
    render(<BlocksEditor value={{ ...value, blocks: [] }} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: '+ Ajouter' }));
    expect(onChange).toHaveBeenCalledWith({ ...value, blocks: [{ type: 'note', text: '' }] });
  });
});

describe('BlockNodeEditor — containers', () => {
  it('renders a section with its own fields and a nested child list', () => {
    const block: SduiBlockValue = { type: 'section', surface: 'card', children: [{ type: 'note', text: 'inner' }] };
    render(<BlockNodeEditor block={block} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('inner')).toBeInTheDocument();
  });

  it('renders a row with a gap number field', () => {
    // Atomic change: spy-only onChange means no re-render feeds the typed value back,
    // so a clear()+type() sequence gets reset between keystrokes instead of accumulating.
    const onChange = vi.fn();
    const block: SduiBlockValue = { type: 'row', gap: 8, children: [] };
    render(<BlockNodeEditor block={block} onChange={onChange} />);
    const gapInput = screen.getByDisplayValue('8');
    fireEvent.change(gapInput, { target: { value: '16' } });
    expect(onChange).toHaveBeenLastCalledWith({ ...block, gap: 16 });
  });

  it('adds a block nested two section levels deep', async () => {
    const onChange = vi.fn();
    const block: SduiBlockValue = { type: 'section', children: [{ type: 'section', children: [] }] };
    render(<BlockNodeEditor block={block} onChange={onChange} />);
    // ArrayField renders its own "+ Ajouter" after its items, so the innermost (empty
    // inner-section children) button precedes the outer section's button in DOM order.
    const addButtons = screen.getAllByRole('button', { name: '+ Ajouter' });
    await userEvent.click(addButtons[0]);
    expect(onChange).toHaveBeenCalledWith({
      ...block,
      children: [{ type: 'section', children: [{ type: 'note', text: '' }] }],
    });
  });

  it('switching a block type to a different type replaces it with that type\'s default shape', async () => {
    const onChange = vi.fn();
    const block: SduiBlockValue = { type: 'note', text: 'x' };
    render(<BlockNodeEditor block={block} onChange={onChange} />);
    await userEvent.selectOptions(screen.getByLabelText('Type de bloc'), 'badge');
    expect(onChange).toHaveBeenLastCalledWith({ type: 'badge', label: '' });
  });
});

describe('BlockNodeEditor — leaf dispatch', () => {
  it('dispatches richText to its editor', () => {
    render(<BlockNodeEditor block={{ type: 'richText', spans: [{ text: 'hi' }] }} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('hi')).toBeInTheDocument();
  });
  it('dispatches quickAmount to its editor', () => {
    render(<BlockNodeEditor block={{ type: 'quickAmount', key: 'k', value: '100' }} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
  });
  it('dispatches datePicker to its editor', () => {
    render(<BlockNodeEditor block={{ type: 'datePicker', key: 'k', initial: '2026-05-01' }} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('2026-05-01')).toBeInTheDocument();
  });
});
