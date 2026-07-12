import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Carousel } from './Carousel';

describe('Carousel', () => {
  it('advances the active slide when Next is clicked', async () => {
    render(
      <Carousel
        items={[<p key="a">Slide A</p>, <p key="b">Slide B</p>]}
        ariaLabel="Profiles"
        prevLabel="Prev"
        nextLabel="Next"
      />,
    );
    const dots = screen.getAllByRole('button', { name: /^[0-9]+$/ });
    expect(dots[0]).toHaveAttribute('aria-current', 'true');
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(dots[1]).toHaveAttribute('aria-current', 'true');
  });
});
