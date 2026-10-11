import { expect, test } from '@playwright/test';

test.describe('I18n', () => {
  test.describe('Language switching', () => {
    test('switches the homepage from Portuguese to English using the nav link', async ({
      page,
    }) => {
      await page.goto('/');

      await expect(
        page.getByRole('heading', {
          name: 'Seu projeto sai da sua mão e volta funcionando.',
        }),
      ).toBeVisible();

      await page.getByRole('button', { name: 'Idioma' }).click();
      await page.getByRole('link', { name: 'English' }).click();

      await expect(page).toHaveURL(/\/en$/u);

      await expect(
        page.getByRole('heading', {
          name: 'Your project leaves your hand and comes back working.',
        }),
      ).toBeVisible();
    });

    test('switches the homepage to Spanish using the nav link', async ({ page }) => {
      await page.goto('/');

      await page.getByRole('button', { name: 'Idioma' }).click();
      await page.getByRole('link', { name: 'Español' }).click();

      await expect(page).toHaveURL(/\/es$/u);

      await expect(
        page.getByRole('heading', {
          name: 'Del problema al resultado, lado a lado con usted.',
        }),
      ).toBeVisible();
    });

    test('displays the sign-in page in English using the URL', async ({ page }) => {
      await page.goto('/en/sign-in');

      await expect(page.getByText('Email address')).toBeVisible();
    });
  });
});
