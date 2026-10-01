import { Eyebrow } from './Eyebrow';

export const SectionIntro = (props: { eyebrow: string; title: string; description: string }) => (
  <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-20 gap-y-7">
    <div className="flex flex-col gap-5">
      <Eyebrow>{props.eyebrow}</Eyebrow>
      <h2 className="m-0 text-[clamp(36px,4.6vw,64px)] leading-[1.02] font-bold tracking-[-0.04em]">
        {props.title}
      </h2>
    </div>
    <p className="m-0 text-lg leading-[29px] text-graphite-700">{props.description}</p>
  </div>
);
