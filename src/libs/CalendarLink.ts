import type { PreferredWindow } from '@/validations/ContactValidation';

/** Hour a suggested conversation starts at, in the visitor's time zone, for each preferred window. */
const START_HOUR = { morning: 9, afternoon: 14 } as const;

/** Start hour used when the visitor has no preferred window. */
const DEFAULT_START_HOUR = 10;

/** Length of the first conversation. */
const MEETING_MINUTES = 30;

const pad = (value: number) => String(value).padStart(2, '0');

/**
 * Builds a Google Calendar link that opens a ready-to-save event, with the lead already invited.
 * The team can still change the date, the time, the guests and the length before saving.
 * @param options The preferred date and window, the visitor's time zone and the event texts.
 * @param options.date The preferred date, as YYYY-MM-DD.
 * @param options.window The preferred part of the day, when there is one.
 * @param options.timezone The visitor's IANA time zone, when known.
 * @param options.title The event title.
 * @param options.details The event description.
 * @param options.guestEmail The email of the lead, invited to the event.
 * @returns The link of the calendar event template.
 */
export const buildCalendarUrl = (options: {
  date: string;
  window?: PreferredWindow;
  timezone?: string;
  title: string;
  details: string;
  guestEmail: string;
}) => {
  const day = options.date.replaceAll('-', '');
  const hour = options.window ? START_HOUR[options.window] : DEFAULT_START_HOUR;
  const endMinutes = MEETING_MINUTES;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: options.title,
    dates: `${day}T${pad(hour)}0000/${day}T${pad(hour)}${pad(endMinutes)}00`,
    details: options.details,
    add: options.guestEmail,
  });

  if (options.timezone) {
    params.set('ctz', options.timezone);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
