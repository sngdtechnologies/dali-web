import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlockPreview } from './BlocksPreview';
import type { SduiBlockValue } from '@/lib/admin/descriptor-types';

describe('BlockPreview', () => {
  it('renders richText spans with the mapped role size and color', () => {
    const block: SduiBlockValue = { type: 'richText', spans: [{ text: 'Bonjour', role: 'h1', color: 'terre700' }] };
    render(<BlockPreview block={block} />);
    const span = screen.getByText('Bonjour');
    expect(span).toHaveStyle({ fontSize: '32px', color: '#7A3D2E' });
  });

  it('renders a section and its nested children (two levels deep)', () => {
    const block: SduiBlockValue = {
      type: 'section',
      children: [{ type: 'section', children: [{ type: 'note', text: 'deep note' }] }],
    };
    render(<BlockPreview block={block} />);
    expect(screen.getByText('deep note')).toBeInTheDocument();
  });

  it('renders a row of children side by side', () => {
    const block: SduiBlockValue = { type: 'row', children: [{ type: 'note', text: 'A' }, { type: 'note', text: 'B' }] };
    render(<BlockPreview block={block} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('renders a badge with its label', () => {
    render(<BlockPreview block={{ type: 'badge', label: 'Nouveau' }} />);
    expect(screen.getByText('Nouveau')).toBeInTheDocument();
  });

  it('renders an amount with value and currency', () => {
    render(<BlockPreview block={{ type: 'amount', value: '100000', ccy: 'FCFA' }} />);
    expect(screen.getByText(/100000/)).toBeInTheDocument();
    expect(screen.getByText(/FCFA/)).toBeInTheDocument();
  });

  it('falls back gracefully for an out-of-band color token rather than crashing', () => {
    // Defensive case: the dropdown prevents this in practice, but the renderer must not throw.
    const block = { type: 'richText', spans: [{ text: 'x', color: 'not-a-token' }] } as unknown as SduiBlockValue;
    expect(() => render(<BlockPreview block={block} />)).not.toThrow();
  });
});
