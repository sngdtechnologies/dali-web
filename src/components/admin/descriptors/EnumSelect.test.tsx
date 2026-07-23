import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EnumSelect } from './EnumSelect';

describe('EnumSelect', () => {
  it('renders the given options', () => {
    render(<EnumSelect value="card" onChange={vi.fn()} options={['none', 'card', 'forestHero'] as const} label="Surface" />);
    expect(screen.getByRole('option', { name: 'forestHero' })).toBeInTheDocument();
  });

  it('calls onChange with the selected option', async () => {
    const onChange = vi.fn();
    render(<EnumSelect value="card" onChange={onChange} options={['none', 'card', 'forestHero'] as const} label="Surface" />);
    await userEvent.selectOptions(screen.getByLabelText('Surface'), 'forestHero');
    expect(onChange).toHaveBeenCalledWith('forestHero');
  });

  it('omits the none option by default', () => {
    render(<EnumSelect value="card" onChange={vi.fn()} options={['none', 'card'] as const} label="Surface" />);
    const select = screen.getByLabelText('Surface') as HTMLSelectElement;
    expect(select.options).toHaveLength(2);
  });

  it('includes a none option when allowNone is true', () => {
    render(<EnumSelect value={undefined} onChange={vi.fn()} options={['a', 'b'] as const} label="X" allowNone />);
    const select = screen.getByLabelText('X') as HTMLSelectElement;
    expect(select.options).toHaveLength(3);
  });
});
