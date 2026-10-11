import { describe, expect, it } from 'vitest';
import { ContactValidation } from './ContactValidation';

const base = {
  name: 'Maria',
  company: 'Acme',
  email: 'maria@example.com',
  moment: 'stalled',
};

describe('Contact validation', () => {
  describe('Preferred time', () => {
    it('accepts a request without any preference', () => {
      expect(ContactValidation.safeParse(base).success).toBeTruthy();
    });

    it('treats blank preference fields as missing', () => {
      const parse = ContactValidation.safeParse({
        ...base,
        preferredDate: '',
        preferredWindow: '',
      });

      expect(parse.data?.preferredDate).toBeUndefined();
      expect(parse.data?.preferredWindow).toBeUndefined();
    });

    it('keeps a valid date, window and time zone', () => {
      const parse = ContactValidation.safeParse({
        ...base,
        preferredDate: '2026-10-20',
        preferredWindow: 'afternoon',
        timezone: 'America/Sao_Paulo',
      });

      expect(parse.data).toMatchObject({
        preferredDate: '2026-10-20',
        preferredWindow: 'afternoon',
        timezone: 'America/Sao_Paulo',
      });
    });

    it('rejects a date that does not exist', () => {
      expect(
        ContactValidation.safeParse({ ...base, preferredDate: '2026-02-31' }).success,
      ).toBeFalsy();
    });

    it('rejects an unknown window', () => {
      expect(
        ContactValidation.safeParse({ ...base, preferredWindow: 'night' }).success,
      ).toBeFalsy();
    });
  });
});
