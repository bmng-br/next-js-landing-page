'use client';

import { useTranslations } from 'next-intl';
import { Fragment, useState } from 'react';
import { ButtonLink } from './ButtonLink';
import { useContactMoment } from './ContactMomentContext';
import { SectionIds } from './SectionIds';

const MOMENT_KEYS = ['organize', 'expansion', 'stalled', 'integration', 'ongoing'] as const;

type MomentKey = (typeof MOMENT_KEYS)[number];

export const MomentPicker = () => {
  const t = useTranslations('MomentPicker');
  const [selected, setSelected] = useState<MomentKey>('organize');
  const contactMoment = useContactMoment();

  return (
    <div
      role="radiogroup"
      aria-label={t('group_label')}
      className="grid gap-3 lg:grid-cols-2 lg:grid-rows-[repeat(5,auto)_1fr] lg:gap-x-6"
    >
      {MOMENT_KEYS.map((key) => {
        const isChecked = selected === key;

        return (
          <Fragment key={key}>
            {/* oxlint-disable-next-line jsx-a11y/label-has-associated-control -- the label text is in nested spans */}
            <label
              className={`flex min-h-22 cursor-pointer scroll-mt-4 items-center gap-[18px] rounded-[14px] border-2 bg-white px-6 py-[18px] text-graphite-950 transition-colors duration-200 hover:border-graphite-950 has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-teal lg:col-start-1 ${
                isChecked ? 'border-graphite-950' : 'border-mist-400'
              }`}
            >
              <input
                type="radio"
                name="moment"
                value={key}
                checked={isChecked}
                onChange={(event) => {
                  const label = event.currentTarget.closest('label');
                  setSelected(key);
                  contactMoment.setMoment(key);
                  // Below lg the answer opens under the option, so bring the pair into view
                  if (!window.matchMedia('(min-width: 1024px)').matches) {
                    requestAnimationFrame(() => label?.scrollIntoView({ block: 'start' }));
                  }
                }}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`flex size-[22px] shrink-0 items-center justify-center rounded-full border-2 ${
                  isChecked ? 'border-graphite-950' : 'border-graphite-500'
                }`}
              >
                <span className={`size-2.5 rounded-full ${isChecked ? 'bg-graphite-950' : ''}`} />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[19px] leading-[26px] font-bold tracking-[-0.01em]">
                  {t(`${key}.situation`)}
                </span>
                <span
                  className={`text-xs font-bold tracking-[0.14em] uppercase ${
                    isChecked ? 'text-teal' : 'text-graphite-700'
                  }`}
                >
                  {t(`${key}.moment`)}
                </span>
              </span>
            </label>

            {isChecked && (
              <div
                aria-live="polite"
                className="mb-3 flex animate-word-in flex-col gap-5 rounded-2xl border border-mist-300 bg-white p-6 sm:p-8 lg:col-start-2 lg:row-span-6 lg:row-start-1 lg:mb-0 lg:p-9"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs font-bold tracking-[0.14em] text-teal uppercase">
                    {t('moment_label', { moment: t(`${key}.moment`) })}
                  </div>
                  <div className="rounded-lg bg-mist-100 px-3 py-[7px] text-[13px] font-bold text-graphite-950">
                    {t(`${key}.tag`)}
                  </div>
                </div>
                <div className="text-[clamp(26px,2.6vw,34px)] leading-[1.15] font-bold tracking-[-0.03em]">
                  {t(`${key}.headline`)}
                </div>
                <p className="m-0 text-[17px] leading-7 text-graphite-700">{t(`${key}.body`)}</p>
                <div className="flex flex-col gap-1.5 border-t border-mist-200 pt-5">
                  <div className="text-xs font-bold tracking-[0.14em] text-graphite-700 uppercase">
                    {t('start_label')}
                  </div>
                  <div className="text-xl leading-7 font-bold">{t(`${key}.service`)}</div>
                </div>
                <ButtonLink href={`#${SectionIds.contact}`} variant="ink" className="self-start">
                  {t('cta')}
                </ButtonLink>
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
