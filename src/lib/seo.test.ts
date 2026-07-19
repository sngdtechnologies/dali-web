import { describe, it, expect } from 'vitest';
import { buildMetadata } from './seo';

describe('buildMetadata', () => {
  it('sets title, canonical and hreflang alternates', () => {
    const m = buildMetadata({ locale: 'fr', path: '/faq', title: 'FAQ', description: 'd' });
    expect(m.title).toEqual({ absolute: 'FAQ' });
    expect(m.alternates?.canonical).toBe('/fr/faq');
    expect(m.alternates?.languages).toEqual({ fr: '/fr/faq', en: '/en/faq' });
  });
  it('handles the home path without a trailing slash', () => {
    const m = buildMetadata({ locale: 'en', path: '/', title: 'Dali', description: 'd' });
    expect(m.alternates?.canonical).toBe('/en');
    expect(m.alternates?.languages).toEqual({ fr: '/fr', en: '/en' });
  });
});
