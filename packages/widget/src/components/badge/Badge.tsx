import { StyledBadge } from './Badge.styles';
import type { BadgeProps } from './Badge.types';

export function Badge(props: BadgeProps) {
  const { intent, children } = props;
  return <StyledBadge intent={intent}>{children}</StyledBadge>;
}
