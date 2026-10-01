import { Eyebrow } from './Eyebrow';

export const SectionIntro = (props: {
  eyebrow: string;
  title: string;
  description: string;
  eyebrowClassName?: string;
}) => (
  <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-20 gap-y-7 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
    <div className="flex flex-col gap-5">
      <Eyebrow className={props.eyebrowClassName}>{props.eyebrow}</Eyebrow>
      <h2 className="m-0 text-[clamp(34px,min(4.6vw,6svh),64px)] leading-[1.02] font-bold tracking-[-0.04em]">
        {props.title}
      </h2>
    </div>
    <p className="m-0 text-lg leading-[29px] text-graphite-700">{props.description}</p>
  </div>
);
