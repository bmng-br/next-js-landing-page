import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { isDashboardAllowed } from '@/libs/DashboardAccess';
import { listLeads } from '@/libs/Leads';
import { CONTACT_MOMENTS } from '@/validations/ContactValidation';

export default async function LeadsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  if (!(await isDashboardAllowed())) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'LeadsPage' });
  const tForm = await getTranslations({ locale, namespace: 'ContactForm' });
  const leads = await listLeads();
  const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'short', timeStyle: 'short' });
  const getMomentLabel = (value: string) => {
    const moment = CONTACT_MOMENTS.find((elt) => elt === value);
    return moment ? tForm(`moment_${moment}`) : value;
  };

  return (
    <div className="py-5">
      <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>

      {leads.length === 0 ? (
        <p className="mt-4 text-base">{t('empty')}</p>
      ) : (
        <ul className="mt-4 flex list-none flex-col gap-4 p-0">
          {leads.map((lead) => (
            <li key={lead.id} className="rounded-lg border border-gray-300 p-4 text-base">
              <div className="flex flex-wrap justify-between gap-2">
                <span className="font-bold text-gray-900">
                  {lead.name}
                  {lead.company && <span className="font-normal"> · {lead.company}</span>}
                </span>
                <span className="text-sm text-gray-500">{dateFormat.format(lead.createdAt)}</span>
              </div>
              <a href={`mailto:${lead.email}`} className="text-blue-700 hover:underline">
                {lead.email}
              </a>
              <div className="mt-1 text-sm">
                {t('moment_label')}: {getMomentLabel(lead.moment)}
              </div>
              {lead.message && <p className="mt-2 whitespace-pre-line">{lead.message}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
