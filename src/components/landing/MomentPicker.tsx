'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ButtonLink } from './ButtonLink';
import { useContactMoment } from './ContactMomentContext';
import { SectionIds } from './SectionIds';

const MOMENT_KEYS = ['stalled', 'expansion', 'integration'] as const;

type MomentKey = (typeof MOMENT_KEYS)[number];

export const MomentPicker = () => {
  const t = useTranslations('MomentPicker');
  const [selected, setSelected] = useState<MomentKey>('stalled');
  const contactMoment = useContactMoment();

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-6">
      <fieldset
        role="radiogroup"
        aria-label={t('group_label')}
        className="m-0 flex flex-col gap-3 border-0 p-0"
      >
        {MOMENT_KEYS.map((key) => {
          const isChecked = selected === key;

          return (
            // oxlint-disable-next-line jsx-a11y/label-has-associated-control -- the label text is in nested spans
            <label
              key={key}
              className={`flex min-h-22 cursor-pointer items-center gap-[18px] rounded-[14px] bg-white px-6 py-[18px] text-graphite-950 transition-colors duration-200 hover:border-graphite-950 has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-teal ${
                isChecked ? 'border-2 border-graphite-950' : 'border border-mist-400'
              }`}
            >
              <input
                type="radio"
                name="moment"
                value={key}
                checked={isChecked}
                onChange={() => {
                  setSelected(key);
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
          );
        })}
      </fieldset>

      <div
        key={selected}
        aria-live="polite"
        className="flex animate-word-in flex-col gap-6 rounded-2xl border border-t-4 border-mist-300 border-t-teal bg-white p-10"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-bold tracking-[0.14em] text-teal uppercase">
            {t('moment_label', { moment: t(`${selected}.moment`) })}
          </div>
          <div className="rounded-lg bg-mist-100 px-3 py-[7px] text-[13px] font-bold text-graphite-950">
            {t(`${selected}.tag`)}
          </div>
        </div>
        <div className="text-[clamp(26px,2.6vw,34px)] leading-[1.15] font-bold tracking-[-0.03em]">
          {t(`${selected}.headline`)}
        </div>
        <p className="m-0 text-[17px] leading-7 text-graphite-700">{t(`${selected}.body`)}</p>
        <div className="flex flex-col gap-1.5 border-t border-mist-200 pt-5">
          <div className="text-xs font-bold tracking-[0.14em] text-graphite-700 uppercase">
            {t('start_label')}
          </div>
          <div className="text-xl leading-7 font-bold">{t(`${selected}.service`)}</div>
        </div>
        <ButtonLink
          href={`#${SectionIds.contact}`}
          variant="ink"
          className="self-start"
          onClick={() => {
            contactMoment.setMoment(selected);
          }}
        >
          {t('cta')}
        </ButtonLink>
      </div>
    </div>
  );
};
