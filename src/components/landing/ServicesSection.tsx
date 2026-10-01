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
}) => (
  <article
    className={`flex flex-col gap-[22px] rounded-2xl bg-white px-8 py-9 ${
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

export const ServicesSection = async () => {
  const t = await getTranslations('ServicesSection');

  return (
    <section id={SectionIds.services} className="scroll-mt-4 py-32">
      <Container className="flex flex-col gap-14">
        <SectionIntro eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-stretch gap-4">
          <ServiceCard
            num="01"
            badge={t('health_check.badge')}
            title={t('health_check.title')}
            description={t('health_check.description')}
            billingLabel={t('billing_label')}
            billing={t('health_check.billing')}
            cta={t('health_check.cta')}
            featured
          />
          <ServiceCard
            num="02"
            badge={t('advisory.badge')}
            title={t('advisory.title')}
            description={t('advisory.description')}
            billingLabel={t('billing_label')}
            billing={t('advisory.billing')}
            cta={t('advisory.cta')}
          />
          <ServiceCard
            num="03"
            badge={t('governance.badge')}
            title={t('governance.title')}
            description={t('governance.description')}
            billingLabel={t('billing_label')}
            billing={t('governance.billing')}
            billingNote={t('governance.billing_note')}
            cta={t('governance.cta')}
          />
        </div>
      </Container>
    </section>
  );
};
