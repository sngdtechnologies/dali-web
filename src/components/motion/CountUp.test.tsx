import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CountUp } from './CountUp';

describe('CountUp', () => {
  it('shows the final value under reduced motion', () => {
    render(<CountUp to={820} />);
    expect(screen.getByText('820')).toBeInTheDocument();
  });
});
