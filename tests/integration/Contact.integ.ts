import { expect, test } from '@playwright/test';

test.describe('Contact', () => {
  test.describe('Request validation', () => {
    test('rejects a request without a name', async ({ page }) => {
      const response = await page.request.post('/api/contact', {
        data: { name: '', email: 'maria@example.com', moment: 'stalled' },
      });

      expect(response.status()).toBe(422);
    });

    test('rejects a request with an invalid email', async ({ page }) => {
      const response = await page.request.post('/api/contact', {
        data: { name: 'Maria', email: 'maria', moment: 'stalled' },
      });

      expect(response.status()).toBe(422);
    });

    test('rejects a request with an unknown project moment', async ({ page }) => {
      const response = await page.request.post('/api/contact', {
        data: { name: 'Maria', email: 'maria@example.com', moment: 'unknown' },
      });

      expect(response.status()).toBe(422);
    });

    test('accepts a valid request', async ({ page }) => {
      const response = await page.request.post('/api/contact', {
        data: {
          name: 'Maria',
          company: 'Acme',
          email: 'maria@example.com',
          moment: 'integration',
          message: 'O equipamento chegou e não encaixa.',
        },
      });

      expect(response.status()).toBe(200);
    });
  });
});
