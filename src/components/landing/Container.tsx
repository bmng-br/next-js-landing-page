export const Container = (props: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto box-border w-full max-w-[1320px] px-6 ${props.className ?? ''}`}>
    {props.children}
  </div>
);
