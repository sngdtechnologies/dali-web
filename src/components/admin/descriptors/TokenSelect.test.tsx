import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TokenSelect } from './TokenSelect';

describe('TokenSelect', () => {
  it('renders the 16 known tokens plus a none option by default', () => {
    render(<TokenSelect value={undefined} onChange={vi.fn()} label="Couleur" />);
    const select = screen.getByLabelText('Couleur') as HTMLSelectElement;
    expect(select.options).toHaveLength(17);
    expect(screen.getByRole('option', { name: 'terre700' })).toBeInTheDocument();
  });

  it('calls onChange with the selected token', async () => {
    const onChange = vi.fn();
    render(<TokenSelect value={undefined} onChange={onChange} label="Couleur" />);
    await userEvent.selectOptions(screen.getByLabelText('Couleur'), 'terre700');
    expect(onChange).toHaveBeenCalledWith('terre700');
  });

  it('calls onChange with undefined when the none option is chosen', async () => {
    const onChange = vi.fn();
    render(<TokenSelect value="fg1" onChange={onChange} label="Couleur" />);
    await userEvent.selectOptions(screen.getByLabelText('Couleur'), '—');
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it('omits the none option when allowNone is false', () => {
    render(<TokenSelect value="fg1" onChange={vi.fn()} label="Couleur" allowNone={false} />);
    const select = screen.getByLabelText('Couleur') as HTMLSelectElement;
    expect(select.options).toHaveLength(16);
  });
});
