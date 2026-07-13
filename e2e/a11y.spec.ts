import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const path of ['/fr', '/fr/faq']) {
  test(`no serious a11y violations on ${path}`, async ({ page }) => {
    test.setTimeout(90_000); // axe analysis over the long marketing page is slow but correct
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(serious).toEqual([]);
  });
}
