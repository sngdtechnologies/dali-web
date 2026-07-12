import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StoreBadges } from './StoreBadges';

describe('StoreBadges', () => {
  it('links to both stores', () => {
    render(<StoreBadges />);
    expect(screen.getByRole('link', { name: /App Store/i })).toHaveAttribute('href', 'https://apps.apple.com/app/dali');
    expect(screen.getByRole('link', { name: /Google Play/i })).toHaveAttribute(
      'href',
      'https://play.google.com/store/apps/details?id=com.example.dali',
    );
  });
});
