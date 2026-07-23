import { describe, it, expect } from 'vitest';
import { daliColors, daliRadius, daliMotion } from './tokens';

describe('dali tokens', () => {
  it('exposes the exact brand palette', () => {
    expect(daliColors.ivoire).toBe('#F5F0E6');
    expect(daliColors.foret[800]).toBe('#1F3A2E');
    expect(daliColors.foret[900]).toBe('#102018');
    expect(daliColors.or[500]).toBe('#C9A961');
    expect(daliColors.encre).toBe('#1A1A17');
    expect(daliColors.terre[600]).toBe('#9C4D38');
    expect(daliColors.terre[700]).toBe('#7A3D2E');
  });
  it('exposes radius and motion tokens', () => {
    expect(daliRadius.lg).toBe('20px');
    expect(daliMotion.ease).toBe('cubic-bezier(0.22, 0.61, 0.36, 1)');
    expect(daliMotion.durations.base).toBe(280);
  });
});
