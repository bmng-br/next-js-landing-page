const variants = {
  primary: 'bg-pink text-graphite-950 hover:bg-pink-soft',
  ghost: 'border-[1.5px] border-graphite-600 text-paper hover:bg-paper hover:text-graphite-950',
  ink: 'bg-graphite-950 text-paper hover:bg-graphite-850',
  outline:
    'border-[1.5px] border-graphite-950 text-graphite-950 hover:bg-graphite-950 hover:text-paper',
};

const sizes = {
  sm: 'min-h-11 px-5 text-sm',
  md: 'min-h-[52px] px-6 text-[15px]',
  lg: 'min-h-[54px] px-[26px] text-base',
};

export const ButtonLink = (props: {
  href: string;
  children: React.ReactNode;
  variant: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  onClick?: () => void;
}) => (
  <a
    href={props.href}
    onClick={props.onClick}
    className={`inline-flex items-center justify-center rounded-[10px] font-bold no-underline transition-colors duration-200 ${variants[props.variant]} ${sizes[props.size ?? 'md']} ${props.className ?? ''}`}
  >
    {props.children}
  </a>
);
