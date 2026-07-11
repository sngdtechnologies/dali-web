import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders a button by default', () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
  });
  it('renders an external anchor when href is an absolute url', () => {
    render(<Button href="https://apps.apple.com/app/dali">Store</Button>);
    const link = screen.getByRole('link', { name: 'Store' });
    expect(link).toHaveAttribute('href', 'https://apps.apple.com/app/dali');
  });
});
