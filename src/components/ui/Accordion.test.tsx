import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';

describe('Accordion', () => {
  it('toggles an item open on click', async () => {
    render(<Accordion items={[{ q: 'Question ?', a: 'Réponse.' }]} />);
    const trigger = screen.getByRole('button', { name: /Question/ });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Réponse.')).toBeVisible();
  });
});
