import { getTranslations } from 'next-intl/server';
import { ButtonLink } from './ButtonLink';
import { Container } from './Container';
import { SectionIds } from './SectionIds';
import { SectionIntro } from './SectionIntro';
import { StageTrack } from './StageTrack';

// Journey stages each service covers, matching the hero trajectory
const OTHER_SERVICES = [
  { key: 'design_hiring', stages: [2] },
  { key: 'processes', stages: [3] },
  { key: 'project_management', stages: [4, 5] },
  { key: 'ongoing_governance', stages: [1, 2, 3, 4, 5] },
] as const;

export const ServicesSection = async () => {
  const t = await getTranslations('ServicesSection');

  return (
    <section id={SectionIds.services} className="py-section">
      <Container className="flex flex-col gap-section-gap">
        <SectionIntro eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
        <div className="grid items-start gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <article className="flex flex-col gap-[22px] rounded-2xl border-2 border-graphite-950 bg-white px-8 py-9">
            <div className="flex items-center justify-between gap-3">
              <div
                aria-hidden="true"
                className="text-[44px] leading-11 font-bold tracking-[-0.04em] text-teal"
              >
                01
              </div>
              <div className="rounded-lg bg-graphite-950 px-3 py-[7px] text-xs font-bold tracking-[0.08em] text-paper uppercase">
                {t('diagnosis.badge')}
              </div>
            </div>
            <h3 className="m-0 text-[28px] leading-8 font-bold tracking-[-0.03em]">
              {t('diagnosis.title')}
            </h3>
            <p className="m-0 text-base leading-[26px] text-graphite-700">
              {t('diagnosis.description')}
            </p>
            <StageTrack stages={[1]} />
            <div className="border-t border-mist-200 pt-[18px] text-sm font-bold">
              {t('diagnosis.billing')}
            </div>
            <ButtonLink href={`#${SectionIds.contact}`} variant="primary">
              {t('diagnosis.cta')}
            </ButtonLink>
          </article>

          <div className="flex flex-col gap-8">
            <ul className="m-0 flex list-none flex-col p-0">
              {OTHER_SERVICES.map(({ key, stages }, index) => (
                <li
                  key={key}
                  className="grid gap-x-6 gap-y-2 border-t border-mist-300 py-6 first:border-t-0 first:pt-0 sm:grid-cols-[48px_minmax(0,1fr)]"
                >
                  <div
                    aria-hidden="true"
                    className="text-[28px] leading-8 font-bold tracking-[-0.03em] text-teal"
                  >
                    {String(index + 2).padStart(2, '0')}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="m-0 text-xl leading-7 font-bold">{t(`${key}.title`)}</h3>
                      <div className="text-xs font-bold tracking-[0.08em] text-graphite-700 uppercase">
                        {t(`${key}.badge`)}
                      </div>
                    </div>
                    <p className="m-0 text-base leading-[26px] text-graphite-700">
                      {t(`${key}.description`)}
                    </p>
                    <StageTrack stages={stages} />
                    <div className="text-sm font-bold">{t(`${key}.billing`)}</div>
                    {key === 'project_management' && (
                      <div className="text-sm leading-[21px] text-graphite-700">
                        {t('project_management.billing_note')}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <ButtonLink href={`#${SectionIds.contact}`} variant="outline" className="self-start">
              {t('other_cta')}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
};
