import * as z from 'zod';

/** Project moments a visitor can pick in the contact form. */
export const CONTACT_MOMENTS = [
  'organize',
  'expansion',
  'stalled',
  'integration',
  'ongoing',
  'other',
] as const;

export type ContactMoment = (typeof CONTACT_MOMENTS)[number];

/** Parts of the day a visitor can prefer for the first conversation; blank means any time. */
export const PREFERRED_WINDOWS = ['morning', 'afternoon'] as const;

export type PreferredWindow = (typeof PREFERRED_WINDOWS)[number];

/**
 * Treats a blank optional form field as missing.
 * @param value The raw field value.
 * @returns The value, or undefined when it is an empty string.
 */
const blankToUndefined = (value: unknown) => (value === '' ? undefined : value);

export const ContactValidation = z.object({
  name: z.string().trim().min(1).max(200),
  company: z.string().trim().min(1).max(200),
  email: z.email().max(320),
  moment: z.enum(CONTACT_MOMENTS),
  message: z.string().trim().max(5000).optional(),
  preferredDate: z.preprocess(blankToUndefined, z.iso.date().optional()),
  preferredWindow: z.preprocess(blankToUndefined, z.enum(PREFERRED_WINDOWS).optional()),
  // IANA time zone of the visitor, such as America/Sao_Paulo
  timezone: z
    .string()
    .max(64)
    .regex(/^[A-Za-z0-9_+\-/]+$/u)
    .optional(),
  locale: z.string().max(10).optional(),
});

export type ContactRequest = z.infer<typeof ContactValidation>;
