import { test, expect } from '@playwright/test';

test('home redirects to /fr and shows hero CTA', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/fr$/);
  await expect(page.getByRole('link', { name: /App Store/i }).first()).toBeVisible();
});

test('locale switch goes to /en', async ({ page }) => {
  await page.goto('/fr');
  await page.getByRole('button', { name: /English/i }).click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.getByRole('heading', { level: 1, name: /Your money, finally clear/i })).toBeVisible();
});

test('faq accordion opens an answer', async ({ page }) => {
  await page.goto('/fr/faq');
  const first = page.getByRole('button', { name: /Dali est-il gratuit/ });
  await first.click();
  await expect(first).toHaveAttribute('aria-expanded', 'true');
});

test('persona carousel advances with the Next control', async ({ page }) => {
  await page.goto('/fr');
  const next = page.getByRole('button', { name: /Profil suivant/ });
  await next.scrollIntoViewIfNeeded();
  await next.click();
  // second dot becomes current
  await expect(page.getByRole('button', { name: '2' })).toHaveAttribute('aria-current', 'true');
});

test('reduced-motion still renders content', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/fr');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await context.close();
});

test('home emits canonical + hreflang alternates (SEO budget)', async ({ page }) => {
  await page.goto('/fr');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/fr$/);
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
  await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveCount(1);
});
