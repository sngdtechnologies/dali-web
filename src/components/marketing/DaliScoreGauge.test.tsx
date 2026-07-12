import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DaliScoreGauge } from './DaliScoreGauge';

describe('DaliScoreGauge', () => {
  it('renders the target score', () => {
    render(<DaliScoreGauge score={820} />);
    expect(screen.getByText('820')).toBeInTheDocument();
  });
});
