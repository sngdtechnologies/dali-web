import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders a labelled input wired by id', () => {
    render(<Input id="email" name="email" label="Email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('id', 'email');
    expect(input).toHaveAttribute('name', 'email');
  });

  it('defaults to type text and honours an explicit type', () => {
    const { rerender } = render(<Input id="a" name="a" label="A" />);
    expect(screen.getByLabelText('A')).toHaveAttribute('type', 'text');
    rerender(<Input id="a" name="a" label="A" type="password" />);
    expect(screen.getByLabelText('A')).toHaveAttribute('type', 'password');
  });

  it('can be disabled', () => {
    render(<Input id="a" name="a" label="A" disabled />);
    expect(screen.getByLabelText('A')).toBeDisabled();
  });
});
