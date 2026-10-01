import { expect, test } from '@playwright/test';

// Checkly is a tool used to monitor deployed environments, such as production or preview environments.
// It runs end-to-end tests with the `.check.e2e.ts` extension after each deployment to ensure that the environment is up and running.
// With Checkly, you can monitor your production environment and run `*.check.e2e.ts` tests regularly at a frequency of your choice.
// If the tests fail, Checkly will notify you via email, Slack, or other channels of your choice.
// On the other hand, E2E tests ending with `*.e2e.ts` are only run before deployment.
// You can run them locally or on CI to ensure that the application is ready for deployment.

test.describe('Sanity', () => {
  test.describe('Landing page', () => {
    test('displays the hero heading', async ({ page }) => {
      await page.goto('/');

      await expect(
        page.getByRole('heading', {
          name: 'Seu projeto sai da sua mão e volta funcionando.',
        }),
      ).toBeVisible();
    });

    test('shows the confirmation after submitting the contact form', async ({ page }) => {
      await page.goto('/');

      await page.getByLabel('Seu nome').fill('Maria');
      await page.getByLabel('E-mail de trabalho').fill('maria@example.com');
      await page
        .getByLabel('Em que momento está o projeto?')
        .selectOption({ label: 'O projeto travou ou atrasou' });
      await page.getByRole('button', { name: 'Pedir um Technical Health Check' }).click();

      await expect(page.getByRole('status')).toContainText(
        'Recebemos. O boomerang já saiu da sua mão.',
      );
      await expect(page.getByRole('status')).toBeFocused();
    });

    test('shows inline errors when submitting an empty contact form', async ({ page }) => {
      await page.goto('/');

      await page.getByRole('button', { name: 'Pedir um Technical Health Check' }).click();

      await expect(page.getByLabel('Seu nome')).toHaveAccessibleDescription('Informe seu nome.');
      await expect(page.getByLabel('Seu nome')).toBeFocused();
    });

    test('pre-fills the contact form from the triage section', async ({ page }) => {
      await page.goto('/');

      await page.getByText('Vou expandir, automatizar ou trocar o ERP').click();
      await page.getByRole('link', { name: 'Quero conversar sobre isso' }).click();

      await expect(page.getByLabel('Em que momento está o projeto?')).toHaveValue('expansion');
    });
  });
});
