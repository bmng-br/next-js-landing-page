import { expect, test } from '@playwright/test';

test.describe('I18n', () => {
  test.describe('Language switching', () => {
    test('switches the homepage from Portuguese to English using the language menu', async ({
      page,
    }) => {
      await page.goto('/');

      await expect(
        page.getByRole('heading', { name: 'Do problema ao resultado, lado a lado com você.' }),
      ).toBeVisible();

      await page.getByRole('button', { name: /^Idioma/u }).click();
      await page.getByRole('link', { name: 'English' }).click();

      await expect(page).toHaveURL(/\/en$/u);

      await expect(
        page.getByRole('heading', { name: 'From problem to result, side by side with you.' }),
      ).toBeVisible();
    });

    test('switches the homepage to Spanish using the language menu', async ({ page }) => {
      await page.goto('/');

      await page.getByRole('button', { name: /^Idioma/u }).click();
      await page.getByRole('link', { name: 'Español' }).click();

      await expect(page).toHaveURL(/\/es$/u);

      await expect(
        page.getByRole('heading', { name: 'Del problema al resultado, lado a lado con usted.' }),
      ).toBeVisible();
    });

    test('marks the language of each page', async ({ page }) => {
      await page.goto('/en');

      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });
  });
});
