import type { ReactNode, SVGProps } from 'react';

export interface SvgIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  children?: ReactNode;
}

export function SvgIcon(props: SvgIconProps) {
  const { size = 16, viewBox = '0 0 256 256', color, children, ...restProps } = props;
  return (
    <svg {...restProps} style={{ fill: color ?? 'currentColor' }} viewBox={viewBox} width={size} height={size}>
      {children}
    </svg>
  );
}
