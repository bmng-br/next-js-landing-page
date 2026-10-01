import * as z from 'zod';

/** Project moments a visitor can pick in the contact form. */
export const CONTACT_MOMENTS = ['stalled', 'expansion', 'integration', 'other'] as const;

export type ContactMoment = (typeof CONTACT_MOMENTS)[number];

export const ContactValidation = z.object({
  name: z.string().trim().min(1),
  company: z.string().trim().optional(),
  email: z.email(),
  moment: z.enum(CONTACT_MOMENTS),
  message: z.string().trim().optional(),
});
