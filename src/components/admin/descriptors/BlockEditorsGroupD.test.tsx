import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuickAmountBlockEditor, TextFieldBlockEditor, DatePickerBlockEditor } from './BlockEditorsGroupD';
import type { SduiBlockValue } from '@/lib/admin/descriptor-types';

describe('QuickAmountBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'quickAmount' }> = { type: 'quickAmount', key: 'amount', value: '5000' };

  it('renders key and value', () => {
    render(<QuickAmountBlockEditor block={block} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('amount')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5000')).toBeInTheDocument();
  });

  it('parses presets from a comma-separated input', () => {
    // Atomic change: spy-only onChange means no re-render feeds the typed value back,
    // so a multi-character type() would get reset between keystrokes.
    const onChange = vi.fn();
    render(<QuickAmountBlockEditor block={block} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Montants suggérés (séparés par des virgules)'), { target: { value: '1000, 5000' } });
    expect(onChange).toHaveBeenLastCalledWith({ ...block, presets: ['1000', '5000'] });
  });

  it('toggles editable', async () => {
    const onChange = vi.fn();
    render(<QuickAmountBlockEditor block={block} onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox', { name: 'Modifiable' }));
    expect(onChange).toHaveBeenLastCalledWith({ ...block, editable: false });
  });
});

describe('TextFieldBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'textField' }> = { type: 'textField', key: 'note', hint: 'Optionnel' };

  it('renders key and hint', () => {
    render(<TextFieldBlockEditor block={block} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('note')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Optionnel')).toBeInTheDocument();
  });

  it('parses suggestions from a comma-separated input', () => {
    const onChange = vi.fn();
    render(<TextFieldBlockEditor block={block} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Suggestions (séparées par des virgules)'), { target: { value: 'Taxi, Bus' } });
    expect(onChange).toHaveBeenLastCalledWith({ ...block, suggestions: ['Taxi', 'Bus'] });
  });
});

describe('DatePickerBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'datePicker' }> = { type: 'datePicker', key: 'date', initial: '2026-05-01' };

  it('renders the key and the initial date', () => {
    render(<DatePickerBlockEditor block={block} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('date')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2026-05-01')).toBeInTheDocument();
  });

  it('updates the initial date', () => {
    const onChange = vi.fn();
    render(<DatePickerBlockEditor block={block} onChange={onChange} />);
    const input = screen.getByLabelText('Date initiale') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '2026-06-15' } });
    expect(onChange).toHaveBeenLastCalledWith({ ...block, initial: '2026-06-15' });
  });
});
