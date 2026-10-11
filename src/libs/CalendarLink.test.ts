import { describe, expect, it } from 'vitest';
import { buildCalendarUrl } from './CalendarLink';

const base = {
  date: '2026-10-20',
  title: 'Conversa com Maria',
  details: 'Empresa: Acme',
  guestEmail: 'maria@example.com',
};

describe('CalendarLink', () => {
  describe('Calendar event link', () => {
    it('starts the event at 14:00 for an afternoon preference', () => {
      const url = new URL(buildCalendarUrl({ ...base, window: 'afternoon' }));

      expect(url.searchParams.get('dates')).toBe('20261020T140000/20261020T143000');
    });

    it('starts the event at 09:00 for a morning preference', () => {
      const url = new URL(buildCalendarUrl({ ...base, window: 'morning' }));

      expect(url.searchParams.get('dates')).toBe('20261020T090000/20261020T093000');
    });

    it('starts the event at 10:00 when there is no preferred window', () => {
      const url = new URL(buildCalendarUrl(base));

      expect(url.searchParams.get('dates')).toBe('20261020T100000/20261020T103000');
    });

    it('invites the lead and keeps the visitor time zone', () => {
      const url = new URL(buildCalendarUrl({ ...base, timezone: 'America/Bogota' }));

      expect(url.searchParams.get('add')).toBe('maria@example.com');
      expect(url.searchParams.get('ctz')).toBe('America/Bogota');
    });

    it('omits the time zone when it is unknown', () => {
      const url = new URL(buildCalendarUrl(base));

      expect(url.searchParams.has('ctz')).toBeFalsy();
    });
  });
});
