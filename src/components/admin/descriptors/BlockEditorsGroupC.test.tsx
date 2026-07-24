import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ImageBlockEditor, BarChartBlockEditor, LineChartBlockEditor,
  MonthSelectorBlockEditor, ToggleBlockEditor, ChipsBlockEditor,
} from './BlockEditorsGroupC';
import type { SduiBlockValue } from '@/lib/admin/descriptor-types';

describe('ImageBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'image' }> = { type: 'image', caption: 'Photo' };
  it('renders the caption', () => {
    render(<ImageBlockEditor block={block} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('Photo')).toBeInTheDocument();
  });
});

describe('BarChartBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'barChart' }> = { type: 'barChart', bars: [{ label: '1 mai', value: 12 }] };
  it('renders a bar and adds a new one', async () => {
    const onChange = vi.fn();
    render(<BarChartBlockEditor block={{ ...block, bars: [] }} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: '+ Ajouter' }));
    expect(onChange).toHaveBeenCalledWith({ ...block, bars: [{ label: '', value: 0 }] });
  });
  it('parses axisLabels from a comma-separated input', () => {
    // Atomic change: spy-only onChange means no re-render feeds the typed value back,
    // so a multi-character type() would get reset between keystrokes.
    const onChange = vi.fn();
    render(<BarChartBlockEditor block={block} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Labels des axes (séparés par des virgules)'), { target: { value: '1 mai, 15 mai' } });
    expect(onChange).toHaveBeenLastCalledWith({ ...block, axisLabels: ['1 mai', '15 mai'] });
  });
});

describe('LineChartBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'lineChart' }> = { type: 'lineChart', points: [1, 2], labels: ['a', 'b'] };
  it('parses points from a comma-separated number input', () => {
    const onChange = vi.fn();
    render(<LineChartBlockEditor block={block} onChange={onChange} />);
    const input = screen.getByLabelText('Points (séparés par des virgules)') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '3, 4, 5' } });
    expect(onChange).toHaveBeenLastCalledWith({ ...block, points: [3, 4, 5] });
  });
});

describe('MonthSelectorBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'monthSelector' }> = { type: 'monthSelector', items: [{ label: 'Mai', value: '2026-05' }] };
  it('renders an item and adds a new one', async () => {
    const onChange = vi.fn();
    render(<MonthSelectorBlockEditor block={{ ...block, items: [] }} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: '+ Ajouter' }));
    expect(onChange).toHaveBeenCalledWith({ ...block, items: [{ label: '', value: '' }] });
  });
});

describe('ToggleBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'toggle' }> = { type: 'toggle', key: 'mode', options: [{ id: 'a', label: 'A' }], selected: 'a' };
  it('renders the key and selected value', () => {
    render(<ToggleBlockEditor block={block} onChange={vi.fn()} />);
    expect(screen.getByDisplayValue('mode')).toBeInTheDocument();
    // Both the "Sélection" field and the first option's "Id" field have value 'a' here,
    // so getByDisplayValue('a') is ambiguous — target the field by placeholder instead.
    expect(screen.getByPlaceholderText('Sélection')).toHaveValue('a');
  });
});

describe('ChipsBlockEditor', () => {
  const block: Extract<SduiBlockValue, { type: 'chips' }> = { type: 'chips', key: 'cat', options: [{ id: 'x', label: 'X' }], selected: 'x' };
  it('renders the key and adds an option', async () => {
    const onChange = vi.fn();
    render(<ChipsBlockEditor block={{ ...block, options: [] }} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: '+ Ajouter' }));
    expect(onChange).toHaveBeenCalledWith({ ...block, options: [{ id: '', label: '' }] });
  });
});
