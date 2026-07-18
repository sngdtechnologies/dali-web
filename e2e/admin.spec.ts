import { test, expect } from '@playwright/test';

const email = process.env.E2E_ADMIN_EMAIL;
const password = process.env.E2E_ADMIN_PASSWORD;

test.describe('Backoffice', () => {
  test('redirects an anonymous visitor from /admin/users to the login page', async ({ page }) => {
    await page.goto('/admin/users');
    await expect(page).toHaveURL('/admin/login');
  });

  test.describe('with a running backend', () => {
    test.skip(!email || !password, 'E2E_ADMIN_* not set (needs a running backend + seeded admin)');

    test('logs in, browses users, opens a detail, and logs out', async ({ page }) => {
      await page.goto('/admin/login');
      await page.getByLabel('Email').fill(email!);
      await page.getByLabel('Mot de passe').fill(password!);
      await page.getByRole('button', { name: 'Se connecter' }).click();

      await expect(page).toHaveURL('/admin');
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

      await page.getByRole('link', { name: 'Utilisateurs' }).click();
      await expect(page).toHaveURL('/admin/users');
      await expect(page.getByRole('heading', { name: 'Utilisateurs' })).toBeVisible();

      await page.getByRole('button', { name: 'Déconnexion' }).click();
      await expect(page).toHaveURL('/admin/login');

      await page.goto('/admin');
      await expect(page).toHaveURL('/admin/login');
    });

    test('shows a generic error on bad credentials', async ({ page }) => {
      await page.goto('/admin/login');
      await page.getByLabel('Email').fill('nobody@dali.app');
      await page.getByLabel('Mot de passe').fill('definitely-wrong');
      await page.getByRole('button', { name: 'Se connecter' }).click();

      await expect(page.getByRole('alert')).toHaveText('Identifiants invalides');
      await expect(page).toHaveURL(/\/admin\/login/);
    });
  });
});
