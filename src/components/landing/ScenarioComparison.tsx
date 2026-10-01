'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

type Scenario = 'without' | 'with';

const POINTS = [
  { num: '01', key: 'point_1' },
  { num: '02', key: 'point_2' },
  { num: '03', key: 'point_3' },
] as const;

const SUPPLIER_NODES = [
  { key: 'node_software', x: 110 },
  { key: 'node_automation', x: 300 },
  { key: 'node_electrical', x: 490 },
] as const;

const ToggleButton = (props: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    aria-pressed={props.pressed}
    onClick={props.onClick}
    className={`min-h-11 cursor-pointer rounded-[9px] border-0 px-[18px] text-sm font-bold ${
      props.pressed ? 'bg-white text-graphite-950 shadow-lift' : 'bg-transparent text-graphite-700'
    }`}
  >
    {props.children}
  </button>
);

const DiagramNode = (props: {
  x: number;
  y: number;
  width: number;
  label: string;
  className: string;
  labelClassName: string;
}) => (
  <>
    <rect
      x={props.x - props.width / 2}
      y={props.y}
      width={props.width}
      height="52"
      rx="12"
      strokeWidth={1.5}
      className={props.className}
    />
    <text x={props.x} y={props.y + 32} textAnchor="middle" className={props.labelClassName}>
      {props.label}
    </text>
  </>
);

const WithoutDiagram = () => {
  const t = useTranslations('ScenarioComparison');
  const quotes = [
    { key: 'quote_software', x: 110, className: 'say-software' },
    { key: 'quote_automation', x: 300, className: 'say-automation' },
    { key: 'quote_electrical', x: 490, className: 'say-electrical' },
  ] as const;

  return (
    <svg
      viewBox="0 0 600 420"
      width="100%"
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- an inline SVG diagram needs role="img"
      role="img"
      aria-label={t('without_svg_label')}
      className="block max-h-[min(420px,40svh)] max-w-[600px] animate-fade-in"
    >
      {SUPPLIER_NODES.map((node) => (
        <line
          key={node.key}
          x1="300"
          y1="82"
          x2={node.x}
          y2="304"
          strokeWidth={1.5}
          strokeDasharray="4 6"
          className="animate-flow stroke-graphite-500"
        />
      ))}
      <DiagramNode
        x={300}
        y={30}
        width={150}
        label={t('node_you')}
        className="fill-graphite-950 stroke-graphite-950"
        labelClassName="fill-paper text-[17px] font-bold"
      />
      {SUPPLIER_NODES.map((node) => (
        <DiagramNode
          key={node.key}
          x={node.x}
          y={304}
          width={150}
          label={t(node.key)}
          className="fill-white stroke-graphite-500"
          labelClassName="fill-graphite-950 text-[15px] font-semibold"
        />
      ))}
      {quotes.map((quote) => (
        <text
          key={quote.key}
          x={quote.x}
          y="390"
          textAnchor="middle"
          className={`${quote.className} fill-graphite-700 text-[15px] italic`}
        >
          {t(quote.key)}
        </text>
      ))}
      <g className="push-token">
        <circle cx="0" cy="0" r="16" className="fill-graphite-950" />
        <text x="0" y="6" textAnchor="middle" className="fill-paper text-[17px] font-extrabold">
          ?
        </text>
      </g>
    </svg>
  );
};

const WithDiagram = () => {
  const t = useTranslations('ScenarioComparison');

  return (
    <svg
      viewBox="0 0 600 420"
      width="100%"
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- an inline SVG diagram needs role="img"
      role="img"
      aria-label={t('with_svg_label')}
      className="block max-h-[min(420px,40svh)] max-w-[600px] animate-fade-in"
    >
      <line x1="300" y1="72" x2="300" y2="164" strokeWidth={3} className="stroke-teal" />
      {SUPPLIER_NODES.map((node) => (
        <line
          key={node.key}
          x1="300"
          y1="216"
          x2={node.x}
          y2="304"
          strokeWidth={1.5}
          className="stroke-teal"
        />
      ))}
      <DiagramNode
        x={300}
        y={20}
        width={150}
        label={t('node_you')}
        className="fill-white stroke-graphite-950"
        labelClassName="fill-graphite-950 text-[17px] font-bold"
      />
      <text x="392" y="52" className="fill-teal text-sm font-bold">
        {t('delivered_label')}
      </text>
      <DiagramNode
        x={300}
        y={164}
        width={220}
        label={t('node_boomerang')}
        className="fill-graphite-950 stroke-graphite-950"
        labelClassName="fill-paper text-[17px] font-extrabold"
      />
      {SUPPLIER_NODES.map((node) => (
        <DiagramNode
          key={node.key}
          x={node.x}
          y={304}
          width={150}
          label={t(node.key)}
          className="fill-white stroke-teal"
          labelClassName="fill-graphite-950 text-[15px] font-semibold"
        />
      ))}
      <text x="300" y="392" textAnchor="middle" className="fill-graphite-700 text-sm font-semibold">
        {t('suppliers_caption')}
      </text>
      <circle className="report-software fill-teal" cx="0" cy="0" r="6" />
      <circle className="report-automation fill-teal" cx="0" cy="0" r="6" />
      <circle className="report-electrical fill-teal" cx="0" cy="0" r="6" />
      <circle className="deliver fill-pink" cx="0" cy="0" r="8" />
    </svg>
  );
};

export const ScenarioComparison = () => {
  const t = useTranslations('ScenarioComparison');
  const [scenario, setScenario] = useState<Scenario>('without');
  const isWith = scenario === 'with';

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] overflow-hidden rounded-2xl border border-mist-300 bg-white">
      <div className="flex flex-col gap-6 px-10 py-[clamp(1.75rem,4svh,2.75rem)]">
        <fieldset className="m-0 inline-flex gap-1 self-start rounded-xl border-0 bg-mist-100 p-1">
          <legend className="sr-only">{t('toggle_label')}</legend>
          <ToggleButton
            pressed={!isWith}
            onClick={() => {
              setScenario('without');
            }}
          >
            {t('without_button')}
          </ToggleButton>
          <ToggleButton
            pressed={isWith}
            onClick={() => {
              setScenario('with');
            }}
          >
            {t('with_button')}
          </ToggleButton>
        </fieldset>

        <div key={scenario} className="flex animate-fade-in flex-col gap-[22px]">
          <h3 className="m-0 text-3xl leading-9 font-bold tracking-[-0.03em]">
            {t(`${scenario}_title`)}
          </h3>
          <ol className="m-0 flex list-none flex-col border-b border-mist-200 p-0">
            {POINTS.map((point) => (
              <li key={point.key} className="flex gap-4 border-t border-mist-200 py-3.5">
                <span
                  className={`min-w-6 text-sm font-bold ${isWith ? 'text-teal' : 'text-graphite-700'}`}
                >
                  {point.num}
                </span>
                <span
                  className={`text-base leading-[25px] ${isWith ? 'text-graphite-950' : 'text-graphite-700'}`}
                >
                  {t(`${scenario}_${point.key}`)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="flex items-center justify-center border-l border-mist-200 bg-paper px-6 py-8">
        {isWith ? <WithDiagram /> : <WithoutDiagram />}
      </div>
    </div>
  );
};
