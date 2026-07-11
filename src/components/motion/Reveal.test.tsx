import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Reveal } from './Reveal';

describe('Reveal', () => {
  it('renders its children (content is never hidden by motion)', () => {
    render(<Reveal><p>Bonjour</p></Reveal>);
    expect(screen.getByText('Bonjour')).toBeInTheDocument();
  });
});
