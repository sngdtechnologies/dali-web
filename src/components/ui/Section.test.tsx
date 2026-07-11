import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Section } from './Section';

describe('Section', () => {
  it('applies dark tone classes', () => {
    const { container } = render(<Section tone="dark">x</Section>);
    expect(container.firstChild).toHaveClass('bg-foret-900');
  });
});
