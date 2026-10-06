import { getTranslations } from 'next-intl/server';
import { ButtonLink } from './ButtonLink';
import { Container } from './Container';
import { SectionIds } from './SectionIds';
import { SectionIntro } from './SectionIntro';

const ServiceCard = (props: {
  num: string;
  badge: string;
  title: string;
  description: string;
  billingLabel: string;
  billing: string;
  billingNote?: string;
  cta: string;
  featured?: boolean;
  className?: string;
}) => (
  <article
    className={`flex flex-col gap-[22px] rounded-2xl bg-white px-8 py-9 ${props.className ?? ''} ${
      props.featured ? 'border-2 border-graphite-950' : 'border border-mist-300'
    }`}
  >
    <div className="flex items-center justify-between gap-3">
      <div className="text-[44px] leading-11 font-bold tracking-[-0.04em] text-teal">
        {props.num}
      </div>
      <div
        className={`rounded-lg px-3 py-[7px] text-xs font-bold tracking-[0.08em] uppercase ${
          props.featured ? 'bg-graphite-950 text-paper' : 'bg-mist-100'
        }`}
      >
        {props.badge}
      </div>
    </div>
    <h3 className="m-0 text-[28px] leading-8 font-bold tracking-[-0.03em]">{props.title}</h3>
    <p className="m-0 grow text-base leading-[26px] text-graphite-700">{props.description}</p>
    <div className="flex flex-col gap-1 border-t border-mist-200 pt-[18px] text-sm">
      <div className="flex justify-between gap-3">
        <span className="font-semibold text-graphite-700">{props.billingLabel}</span>
        <span className="text-right font-bold">{props.billing}</span>
      </div>
      {props.billingNote && (
        <div className="leading-[21px] text-graphite-700">{props.billingNote}</div>
      )}
    </div>
    <ButtonLink href={`#${SectionIds.contact}`} variant={props.featured ? 'primary' : 'outline'}>
      {props.cta}
    </ButtonLink>
  </article>
);

const SERVICES = [
  'diagnosis',
  'design_hiring',
  'processes',
  'project_management',
  'ongoing_governance',
] as const;

export const ServicesSection = async () => {
  const t = await getTranslations('ServicesSection');

  return (
    <section id={SectionIds.services} className="py-section">
      <Container className="flex flex-col gap-section-gap">
        <SectionIntro eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
        <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((key, index) => (
            <ServiceCard
              key={key}
              num={String(index + 1).padStart(2, '0')}
              badge={t(`${key}.badge`)}
              title={t(`${key}.title`)}
              description={t(`${key}.description`)}
              billingLabel={t('billing_label')}
              billing={t(`${key}.billing`)}
              billingNote={
                key === 'project_management' ? t('project_management.billing_note') : undefined
              }
              cta={t(`${key}.cta`)}
              featured={index === 0}
              // Large screens: three cards, then two wider ones; the odd last card fills its row on tablets
              className={
                index < 3 ? 'lg:col-span-2' : `lg:col-span-3 ${index === 4 ? 'md:col-span-2' : ''}`
              }
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
