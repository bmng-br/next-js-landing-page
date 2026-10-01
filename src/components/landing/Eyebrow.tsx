export const Eyebrow = (props: { children: React.ReactNode; className?: string }) => (
  <div
    className={`text-xs leading-4 font-bold tracking-[0.14em] uppercase ${props.className ?? 'text-teal'}`}
  >
    {props.children}
  </div>
);
