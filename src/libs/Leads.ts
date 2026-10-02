import { desc } from 'drizzle-orm';
import { getTranslations } from 'next-intl/server';
import { leadsSchema } from '@/models/Schema';
import { AppConfig } from '@/utils/AppConfig';
import type { ContactRequest } from '@/validations/ContactValidation';
import { withDb } from './DB';
import { routing } from './I18nRouting';

type EmailMessage = {
  from: { email: string; name: string };
  to: string;
  replyTo: string;
  subject: string;
  text: string;
};

type EmailBinding = { send: (message: EmailMessage) => Promise<unknown> };

/** Module that exposes Worker bindings; only resolvable inside the Cloudflare Workers runtime. */
const CLOUDFLARE_WORKERS_MODULE = 'cloudflare:workers';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isEmailBinding = (value: unknown): value is EmailBinding =>
  isRecord(value) && typeof value.send === 'function';

/**
 * Treats optional form fields left blank as missing.
 * @param value The trimmed field value.
 * @returns The value, or null when it is empty or absent.
 */
const emptyToNull = (value: string | undefined) => (value?.length ? value : null);

/**
 * Loads the Worker's EMAIL binding.
 * @returns The binding, or null outside the Workers runtime (for example `next dev` or Vercel).
 */
const loadEmailBinding = async () => {
  const workers: unknown = await import(
    /* webpackIgnore: true */ /* turbopackIgnore: true */ /* @vite-ignore */ CLOUDFLARE_WORKERS_MODULE
  ).catch(() => null);

  if (!isRecord(workers) || !isRecord(workers.env)) {
    return null;
  }

  return isEmailBinding(workers.env.EMAIL) ? workers.env.EMAIL : null;
};

/**
 * Stores a contact form submission in the leads table.
 * @param lead The validated contact request.
 */
export const saveLead = async (lead: ContactRequest) => {
  await withDb((db) =>
    db.insert(leadsSchema).values({
      name: lead.name,
      company: emptyToNull(lead.company),
      email: lead.email,
      moment: lead.moment,
      message: emptyToNull(lead.message),
      locale: lead.locale ?? null,
    }),
  );
};

/**
 * Emails the team about a new lead.
 * @param options The lead and whether it was stored in the database.
 * @returns True when the alert was sent, false when no email binding is available.
 */
export const notifyNewLead = async (options: { lead: ContactRequest; saved: boolean }) => {
  const binding = await loadEmailBinding();

  if (!binding) {
    return false;
  }

  const t = await getTranslations({ locale: routing.defaultLocale, namespace: 'LeadNotification' });
  const tForm = await getTranslations({ locale: routing.defaultLocale, namespace: 'ContactForm' });
  const { lead } = options;

  const lines = [
    options.saved ? t('intro') : t('not_saved_warning'),
    '',
    `${t('name_label')}: ${lead.name}`,
    `${t('company_label')}: ${emptyToNull(lead.company) ?? '-'}`,
    `${t('email_label')}: ${lead.email}`,
    `${t('moment_label')}: ${tForm(`moment_${lead.moment}`)}`,
    `${t('language_label')}: ${lead.locale ?? '-'}`,
    '',
    `${t('message_label')}:`,
    emptyToNull(lead.message) ?? '-',
  ];

  await binding.send({
    from: { email: AppConfig.leadNotifications.from, name: AppConfig.name },
    to: AppConfig.leadNotifications.to,
    replyTo: lead.email,
    subject: t('subject', { name: lead.name }),
    text: lines.join('\n'),
  });

  return true;
};

/**
 * Lists the most recent leads, newest first.
 * @returns Up to 200 leads.
 */
export const listLeads = async () =>
  await withDb(
    async (db) =>
      await db.select().from(leadsSchema).orderBy(desc(leadsSchema.createdAt)).limit(200),
  );
