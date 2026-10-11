import { getTranslations } from 'next-intl/server';
import { ButtonLink } from './ButtonLink';
import { Container } from './Container';
import { SectionIds } from './SectionIds';
import { SectionIntro } from './SectionIntro';
import { StageTrack } from './StageTrack';

const STAGES = ['diagnosis', 'design', 'processes', 'implementation', 'delivery'] as const;

const columnsClassName =
  'grid gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,3fr))]';

const Detail = (props: {
  label: string;
  children: string;
  labelClassName?: string;
  textClassName?: string;
}) => (
  <div className="flex flex-col gap-2">
    <div
      className={`text-xs font-bold tracking-[0.14em] uppercase ${props.labelClassName ?? 'text-graphite-700'}`}
    >
      {props.label}
    </div>
    <p className={`m-0 text-base leading-[26px] ${props.textClassName ?? 'text-graphite-700'}`}>
      {props.children}
    </p>
  </div>
);

export const JourneySection = async () => {
  const t = await getTranslations('JourneySection');

  return (
    <section id={SectionIds.journey} className="py-section">
      <Container className="flex flex-col gap-section-gap">
        <SectionIntro eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />

        <ol className="m-0 flex list-none flex-col p-0">
          {STAGES.map((stage, index) => (
            <li
              key={stage}
              className={`${columnsClassName} border-t border-mist-300 py-8 first:border-t-0 first:pt-0`}
            >
              <div className="flex flex-col gap-3">
                <div
                  aria-hidden="true"
                  className="text-[28px] leading-8 font-bold tracking-[-0.03em] text-teal"
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="m-0 text-[28px] leading-8 font-bold tracking-[-0.03em]">
                  {t(`stages.${stage}.name`)}
                </h3>
                <StageTrack stages={[index + 1]} />
              </div>
              <Detail label={t('do_label')}>{t(`stages.${stage}.do`)}</Detail>
              <Detail label={t('get_label')}>{t(`stages.${stage}.get`)}</Detail>
              <Detail
                label={t('role_label')}
                labelClassName="text-teal"
                textClassName="font-semibold text-graphite-950"
              >
                {t(`stages.${stage}.role`)}
              </Detail>
            </li>
          ))}
        </ol>

        <div
          className={`dark rounded-2xl bg-graphite-950 px-8 py-9 text-paper ${columnsClassName}`}
        >
          <div className="flex flex-col gap-2">
            <h3 className="m-0 text-[28px] leading-8 font-bold tracking-[-0.03em]">
              {t('governance.name')}
            </h3>
            <div className="text-sm leading-[21px] text-graphite-300">{t('governance.span')}</div>
          </div>
          <Detail
            label={t('do_label')}
            labelClassName="text-graphite-400"
            textClassName="text-graphite-200"
          >
            {t('governance.do')}
          </Detail>
          <Detail
            label={t('get_label')}
            labelClassName="text-graphite-400"
            textClassName="text-graphite-200"
          >
            {t('governance.get')}
          </Detail>
          <Detail
            label={t('role_label')}
            labelClassName="text-aqua"
            textClassName="font-semibold text-paper"
          >
            {t('governance.role')}
          </Detail>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-6">
          <p className="m-0 max-w-[640px] text-lg leading-[29px] text-graphite-700">{t('note')}</p>
          <ButtonLink href={`#${SectionIds.contact}`} variant="outline">
            {t('cta')}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
};
