const SEGMENTS = [1, 2, 3, 4, 5] as const;

const getSegmentColor = (options: { isLit: boolean; segment: number }) => {
  if (!options.isLit) {
    return 'bg-mist-300';
  }

  return options.segment === 5 ? 'bg-pink' : 'bg-teal';
};

// Five-step journey track echoing the hero: the stages a service covers are lit, the return is pink
export const StageTrack = (props: { stages: readonly number[] }) => (
  <div aria-hidden="true" className="flex w-40 gap-1.5">
    {SEGMENTS.map((segment) => (
      <div
        key={segment}
        className={`h-[3px] grow rounded-xs ${getSegmentColor({ isLit: props.stages.includes(segment), segment })}`}
      />
    ))}
  </div>
);
