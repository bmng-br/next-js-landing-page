import { expect, test } from '@playwright/test';

const validRequest = {
  name: 'Maria',
  company: 'Acme',
  email: 'maria@example.com',
  moment: 'integration',
  message: 'O equipamento chegou e não encaixa.',
};

test.describe('Contact', () => {
  test.describe('Request validation', () => {
    test('rejects a request without a name', async ({ page }) => {
      const response = await page.request.post('/api/contact', {
        data: { ...validRequest, name: '' },
      });

      expect(response.status()).toBe(422);
    });

    test('rejects a request without a company', async ({ page }) => {
      const response = await page.request.post('/api/contact', {
        data: { ...validRequest, company: '' },
      });

      expect(response.status()).toBe(422);
    });

    test('rejects a request with an invalid email', async ({ page }) => {
      const response = await page.request.post('/api/contact', {
        data: { ...validRequest, email: 'maria' },
      });

      expect(response.status()).toBe(422);
    });

    test('rejects a request with an unknown project moment', async ({ page }) => {
      const response = await page.request.post('/api/contact', {
        data: { ...validRequest, moment: 'unknown' },
      });

      expect(response.status()).toBe(422);
    });

    test('rejects a request with a date that does not exist', async ({ page }) => {
      const response = await page.request.post('/api/contact', {
        data: { ...validRequest, preferredDate: '2026-02-31' },
      });

      expect(response.status()).toBe(422);
    });
  });

  test.describe('Valid requests', () => {
    test('accepts a valid request', async ({ page }) => {
      const response = await page.request.post('/api/contact', { data: validRequest });

      expect(response.status()).toBe(200);
    });

    test('accepts a request with a preferred date, window and time zone', async ({ page }) => {
      const response = await page.request.post('/api/contact', {
        data: {
          ...validRequest,
          preferredDate: '2026-10-20',
          preferredWindow: 'afternoon',
          timezone: 'America/Sao_Paulo',
        },
      });

      expect(response.status()).toBe(200);
    });
  });
});
