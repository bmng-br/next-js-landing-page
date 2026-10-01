'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

const FRONTS = [
  {
    num: '01',
    key: 'digital',
    items: ['digital.item_1', 'digital.item_2', 'digital.item_3', 'digital.item_4'],
  },
  {
    num: '02',
    key: 'cyber_physical',
    items: ['cyber_physical.item_1', 'cyber_physical.item_2', 'cyber_physical.item_3'],
  },
  {
    num: '03',
    key: 'compliance',
    items: ['compliance.item_1', 'compliance.item_2', 'compliance.item_3'],
  },
] as const;

export const FrontsAccordion = () => {
  const t = useTranslations('FrontsAccordion');
  const [openKey, setOpenKey] = useState<string | null>(FRONTS[0].key);

  return (
    <div className="flex flex-col border-b border-mist-500">
      {FRONTS.map((front) => {
        const isOpen = openKey === front.key;
        const panelId = `front-panel-${front.key}`;

        return (
          <div key={front.key} className="border-t border-mist-500">
            <h3 className="m-0">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  setOpenKey(isOpen ? null : front.key);
                }}
                className="flex w-full cursor-pointer items-center gap-6 border-0 bg-transparent px-2 py-7 text-left text-graphite-950 transition-colors duration-200 hover:bg-mist-100"
              >
                <span className="min-w-9 text-[15px] font-bold text-teal">{front.num}</span>
                <span className="grow text-[clamp(26px,3.4vw,44px)] leading-[1.1] font-bold tracking-[-0.035em]">
                  {t(`${front.key}.title`)}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex size-12 shrink-0 items-center justify-center rounded-[10px] border-[1.5px] border-graphite-950 transition-transform duration-300 ${
                    isOpen
                      ? 'rotate-45 bg-graphite-950 text-paper'
                      : 'bg-transparent text-graphite-950'
                  }`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>

            {isOpen && (
              <div
                id={panelId}
                className="grid animate-fade-in grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-16 gap-y-6 pr-2 pb-10 pl-2 sm:pl-[68px]"
              >
                <p className="m-0 text-lg leading-[29px] text-graphite-700">
                  {t(`${front.key}.body`)}
                </p>
                <div className="flex flex-col gap-3">
                  <div className="text-xs font-bold tracking-[0.14em] text-graphite-700 uppercase">
                    {t('items_title')}
                  </div>
                  <ul className="m-0 flex list-none flex-col gap-3 p-0">
                    {front.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-3 text-base leading-6 font-semibold"
                      >
                        <span className="size-[7px] shrink-0 -translate-y-0.5 bg-teal" />
                        {t(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
