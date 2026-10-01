import { expect, takeSnapshot, test } from '@chromatic-com/playwright';

test.describe('Visual testing', () => {
  test.describe('Static pages', () => {
    test('takes a screenshot of the homepage', async ({ page }, testInfo) => {
      await page.goto('/');

      await expect(
        page.getByRole('heading', {
          name: 'Seu projeto sai da sua mão e volta funcionando.',
        }),
      ).toBeVisible();

      await takeSnapshot(page, testInfo);
    });

    test('takes a screenshot of the English homepage', async ({ page }, testInfo) => {
      await page.goto('/en');

      await expect(
        page.getByRole('heading', {
          name: 'Your project leaves your hand and comes back working.',
        }),
      ).toBeVisible();

      await takeSnapshot(page, testInfo);
    });
  });
});
