'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from './ReducedMotion';
import { SectionIds } from './SectionIds';
import { useInView } from './useInView';

const STAGE_KEYS = [
  'need',
  'diagnosis',
  'design',
  'processes',
  'implementation',
  'return',
] as const;

/** Readout lines of each stage in reading order: what we do, then what the client decides. */
const READOUT_LINES = {
  need: ['need.you'],
  diagnosis: ['diagnosis.we', 'diagnosis.you'],
  design: ['design.we', 'design.you'],
  processes: ['processes.we', 'processes.you'],
  implementation: ['implementation.we', 'implementation.you'],
  return: ['return.you', 'return.we'],
} as const;

/** When each stage begins, in ms into the trajectory pass; must match the `traj-*` animations in `global.css`. */
const STAGE_STARTS_MS = [3800, 8400, 13_000, 17_600, 22_200];

const TRAJECTORY_PATH =
  'M130,470 C300,505 585,450 592,285 C600,120 470,48 358,68 C225,92 102,240 130,470';

const VIEW_WIDTH = 720;
const VIEW_HEIGHT = 560;

// Labels are HTML on top of the SVG, so they keep a readable size when the drawing scales down
const STATIONS = [
  { key: 'diagnosis', cx: 413, cy: 455, x: 413, y: 516, align: '-translate-x-1/2' },
  { key: 'design', cx: 592, cy: 263, x: 568, y: 269, align: '-translate-x-full' },
  { key: 'processes', cx: 421, cy: 66, x: 421, y: 36, align: '-translate-x-1/2' },
  { key: 'implementation', cx: 182, cy: 194, x: 212, y: 200, align: '' },
] as const;

/**
 * Maps the time into the pass to the stage the project is in.
 * @param time Milliseconds since the animation started.
 * @returns The stage index, from 0 (need) to 5 (back in the client's hands).
 */
const getStage = (time: number) => STAGE_STARTS_MS.filter((start) => time >= start).length;

/**
 * Picks the color of a progress bar segment; the last one turns pink on delivery.
 * @param options The current stage and the 1-based segment number.
 * @returns The Tailwind background class of the segment.
 */
const getSegmentColor = (options: { stage: number; segment: number }) => {
  if (options.stage < options.segment) {
    return 'bg-graphite-850';
  }

  return options.segment === 5 ? 'bg-pink' : 'bg-aqua';
};

const percent = (value: number, total: number) => `${(value / total) * 100}%`;

const CONTROL_ICONS = {
  pause_button: <path d="M8 5v14M16 5v14" />,
  play_button: <path d="M8 5l11 7-11 7z" fill="currentColor" />,
  replay_button: <path d="M4.5 12a7.5 7.5 0 1 0 2.4-5.5M4.5 4.5v4h4" />,
} as const;

const getButtonLabelKey = (options: { isFinished: boolean; isPaused: boolean }) => {
  if (options.isFinished) {
    return 'replay_button';
  }

  return options.isPaused ? 'play_button' : 'pause_button';
};

export const BoomerangJourney = (props: { children: React.ReactNode }) => {
  const t = useTranslations('BoomerangTrajectory');
  const pathRef = useRef<SVGPathElement>(null);
  const [stage, setStage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const { ref, isInView } = useInView<HTMLDivElement>({ initial: true });
  const isPlaying = isInView && !isPaused;
  const isFinished = stage === STAGE_KEYS.length - 1;
  const buttonKey = getButtonLabelKey({ isFinished, isPaused });
  const buttonLabel = t(buttonKey);

  // Follow the CSS animation clock so the readout stays in sync with the drawing, and stop
  // once the pass has finished. With reduced motion, the hero stays on stage 0.
  useEffect(() => {
    const interval =
      prefersReducedMotion() || !isPlaying || isFinished
        ? undefined
        : setInterval(() => {
            const time = pathRef.current?.getAnimations()[0]?.currentTime;

            if (typeof time === 'number') {
              setStage(getStage(time));
            }
          }, 150);

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, isFinished, runKey]);

  return (
    <>
      <div
        id={SectionIds.top}
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,520px),1fr))] items-center gap-x-12 gap-y-6 pt-[clamp(1rem,3svh,3.5rem)] pb-[clamp(1rem,3svh,2.5rem)]"
      >
        {props.children}

        <div
          ref={ref}
          data-playing={isPlaying}
          className="relative w-full max-w-[min(680px,72svh)] justify-self-center"
        >
          <svg
            viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
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
            <rect x="0" y="0" width={VIEW_WIDTH} height={VIEW_HEIGHT} fill="url(#hero-dots)" />
            <path
              d={TRAJECTORY_PATH}
              fill="none"
              strokeWidth={1.5}
              strokeDasharray="3 7"
              className="stroke-graphite-800"
            />
            {/* The client's seat: the project leaves from here, stays tied to it, and returns to it */}
            <rect
              x="114"
              y="454"
              width="32"
              height="32"
              strokeWidth={2.5}
              className="fill-graphite-950 stroke-paper"
            />
            <g key={runKey}>
              <path
                ref={pathRef}
                d={TRAJECTORY_PATH}
                fill="none"
                strokeWidth={2.5}
                strokeLinecap="round"
                className="traj-draw stroke-aqua"
              />
              <circle className="traj-ring stroke-paper" cx="0" cy="0" r="11" fill="none" />
              <circle className="traj-dot fill-paper" cx="0" cy="0" r="8" />
            </g>
            {STATIONS.map((station, index) => (
              <circle
                key={station.key}
                cx={station.cx}
                cy={station.cy}
                r="7"
                strokeWidth={2}
                className={
                  stage > index ? 'fill-pink stroke-pink' : 'fill-graphite-950 stroke-aqua'
                }
              />
            ))}
          </svg>

          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {STATIONS.map((station) => (
              <span
                key={station.key}
                style={{
                  left: percent(station.x, VIEW_WIDTH),
                  top: percent(station.y + 3, VIEW_HEIGHT),
                }}
                className={`absolute -translate-y-full text-[13px] leading-4 font-semibold whitespace-nowrap text-graphite-200 ${station.align}`}
              >
                {t(`stages.${station.key}.label`)}
              </span>
            ))}
            <span
              style={{
                left: percent(20, VIEW_WIDTH),
                top: percent(494, VIEW_HEIGHT),
              }}
              className="absolute max-w-[4.5rem] text-[13px] leading-4 font-bold tracking-[0.1em] text-paper"
            >
              {t('start_label')}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] items-center gap-x-10 gap-y-5 border-t border-graphite-850 py-5">
        <div className="flex items-baseline gap-3.5">
          <div className="text-xs font-bold tracking-[0.14em] text-graphite-400 uppercase">
            {t('stage_label')}
          </div>
          <div className="text-[40px] leading-11 font-bold tracking-[-0.03em] tabular-nums">
            {stage === 0 ? '–' : String(stage).padStart(2, '0')}
            <span className="text-graphite-500">/05</span>
          </div>
        </div>

        {/* All stages share one grid cell, so the row keeps the tallest height while the text changes */}
        <div className="grid">
          {STAGE_KEYS.map((key, index) => (
            <div
              key={key}
              aria-hidden={index !== stage}
              className={`col-start-1 row-start-1 flex min-h-16 flex-col justify-center gap-1 ${
                index === stage ? 'animate-word-in' : 'invisible'
              }`}
            >
              <div className="text-lg leading-6 font-bold text-paper">
                {t(`stages.${key}.name`)}
              </div>
              <div className="text-[15px] leading-[22px]">
                {READOUT_LINES[key].map((line) => (
                  <span
                    key={line}
                    className={
                      line.endsWith('.you') ? 'font-semibold text-paper' : 'text-graphite-300'
                    }
                  >
                    {t(`stages.${line}`)}{' '}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((segment) => (
              <div
                key={segment}
                className={`h-[3px] grow rounded-xs ${getSegmentColor({ stage, segment })}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label={buttonLabel}
            title={buttonLabel}
            onClick={() => {
              if (isFinished) {
                setStage(0);
                setIsPaused(false);
                setRunKey(runKey + 1);
              } else {
                setIsPaused(!isPaused);
              }
            }}
            className="flex size-11 cursor-pointer items-center justify-center self-start rounded-[10px] border-[1.5px] border-graphite-600 bg-transparent text-paper transition-colors duration-200 hover:bg-paper hover:text-graphite-950 motion-reduce:hidden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {CONTROL_ICONS[buttonKey]}
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
