import * as z from 'zod';

/** Project moments a visitor can pick in the contact form. */
export const CONTACT_MOMENTS = ['stalled', 'expansion', 'integration', 'other'] as const;

export type ContactMoment = (typeof CONTACT_MOMENTS)[number];

export const ContactValidation = z.object({
  name: z.string().trim().min(1).max(200),
  company: z.string().trim().max(200).optional(),
  email: z.email().max(320),
  moment: z.enum(CONTACT_MOMENTS),
  message: z.string().trim().max(5000).optional(),
  locale: z.string().max(10).optional(),
});

export type ContactRequest = z.infer<typeof ContactValidation>;
