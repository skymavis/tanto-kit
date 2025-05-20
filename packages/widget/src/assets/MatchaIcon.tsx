import type { ReactNode, SVGProps } from 'react';

export interface MatchaIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  children?: ReactNode;
}

export function MatchaIcon(props: MatchaIconProps) {
  const { size = 16, viewBox = '0 0 256 256', color, children, ...restProps } = props;
  return (
    <svg {...restProps} style={{ fill: color ?? 'currentColor' }} viewBox={viewBox} width={size} height={size}>
      {children}
    </svg>
  );
}
