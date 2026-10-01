'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from './ReducedMotion';
import { SectionIds } from './SectionIds';

const STAGE_KEYS = ['need', 'diagnosis', 'design', 'hiring', 'delivery', 'return'] as const;

/** Duration of one trajectory loop; must match the `traj-*` animations in `global.css`. */
const CYCLE_MS = 12_000;

/** Fraction of the loop when the boomerang reaches the hand again. */
const RETURN_AT = 0.85;

const TRAJECTORY_PATH =
  'M130,470 C300,505 585,450 592,285 C600,120 470,48 358,68 C225,92 102,240 130,470';

const STATIONS = [
  { key: 'diagnosis', cx: 413, cy: 455, x: 413, y: 500, anchor: 'middle' },
  { key: 'design', cx: 592, cy: 263, x: 614, y: 269, anchor: 'start' },
  { key: 'hiring', cx: 421, cy: 66, x: 421, y: 36, anchor: 'middle' },
  { key: 'delivery', cx: 182, cy: 194, x: 204, y: 200, anchor: 'start' },
] as const;

/**
 * Maps the loop progress to the stage the boomerang is currently in.
 * @param progress Loop progress between 0 and 1.
 * @returns The stage index, from 0 (need) to 5 (back and working).
 */
const getStage = (progress: number) =>
  progress >= RETURN_AT ? 5 : Math.min(4, Math.floor((progress / RETURN_AT) * 5));

/**
 * Picks the color of a progress bar segment; the last one turns pink on return.
 * @param options The current stage and the 1-based segment number.
 * @returns The Tailwind background class of the segment.
 */
const getSegmentColor = (options: { stage: number; segment: number }) => {
  if (options.stage < options.segment) {
    return 'bg-graphite-850';
  }

  return options.segment === 5 ? 'bg-pink' : 'bg-aqua';
};

export const BoomerangJourney = (props: { children: React.ReactNode }) => {
  const t = useTranslations('BoomerangTrajectory');
  const pathRef = useRef<SVGPathElement>(null);
  const [stage, setStage] = useState(0);

  // Follow the CSS animation clock so the stage labels stay in sync with the drawing.
  // With reduced motion, the hero stays on stage 0.
  useEffect(() => {
    const interval = prefersReducedMotion()
      ? undefined
      : setInterval(() => {
          const time = pathRef.current?.getAnimations()[0]?.currentTime;

          if (typeof time === 'number') {
            setStage(getStage((time % CYCLE_MS) / CYCLE_MS));
          }
        }, 150);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const stageKey = STAGE_KEYS[stage] ?? 'need';

  return (
    <>
      <div
        id={SectionIds.top}
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,520px),1fr))] items-center gap-x-12 gap-y-6 pt-14 pb-10"
      >
        {props.children}

        <div className="relative w-full max-w-[680px] justify-self-center">
          <svg
            viewBox="0 0 720 560"
            width="100%"
            // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- an inline SVG diagram needs role="img"
            role="img"
            aria-label={t('svg_label')}
            className="block overflow-visible"
          >
            <defs>
              <pattern id="hero-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.3" className="fill-graphite-900" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="720" height="560" fill="url(#hero-dots)" />
            <path
              d={TRAJECTORY_PATH}
              fill="none"
              strokeWidth={1.5}
              strokeDasharray="3 7"
              className="stroke-graphite-800"
            />
            <path
              ref={pathRef}
              d={TRAJECTORY_PATH}
              fill="none"
              strokeWidth={2.5}
              strokeLinecap="round"
              className="traj-draw stroke-aqua"
            />
            {STATIONS.map((station, index) => (
              <circle
                key={station.key}
                cx={station.cx}
                cy={station.cy}
                r="6"
                strokeWidth={2}
                className={`stroke-aqua ${stage > index ? 'fill-aqua' : 'fill-graphite-950'}`}
              />
            ))}
            <rect
              x="118"
              y="458"
              width="24"
              height="24"
              fill="none"
              strokeWidth={2}
              className="stroke-paper"
            />
            {STATIONS.map((station) => (
              <text
                key={station.key}
                x={station.x}
                y={station.y}
                textAnchor={station.anchor}
                className="fill-graphite-200 text-[17px] font-semibold"
              >
                {t(`stages.${station.key}.name`)}
              </text>
            ))}
            <text x="96" y="522" className="fill-paper text-[15px] font-bold tracking-[0.1em]">
              {t('start_label')}
            </text>
            <circle className="traj-ring stroke-paper" cx="0" cy="0" r="11" fill="none" />
            <circle className="traj-dot fill-paper" cx="0" cy="0" r="8" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] items-center gap-x-10 gap-y-5 border-t border-graphite-850 pt-[26px] pb-[30px]">
        <div className="flex items-baseline gap-3.5">
          <div className="text-xs font-bold tracking-[0.14em] text-graphite-400 uppercase">
            {t('stage_label')}
          </div>
          <div className="text-[40px] leading-11 font-bold tracking-[-0.03em] tabular-nums">
            {String(stage).padStart(2, '0')}
            <span className="text-graphite-500">/05</span>
          </div>
        </div>

        <div key={stage} className="flex min-h-16 animate-word-in flex-col justify-center gap-1">
          <div className="text-lg leading-6 font-bold text-paper">
            {t(`stages.${stageKey}.name`)}
          </div>
          <div className="text-[15px] leading-[22px] text-graphite-300">
            {t(`stages.${stageKey}.desc`)}
          </div>
        </div>

        <div className="flex gap-1.5" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((segment) => (
            <div
              key={segment}
              className={`h-[3px] grow rounded-xs ${getSegmentColor({ stage, segment })}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};
