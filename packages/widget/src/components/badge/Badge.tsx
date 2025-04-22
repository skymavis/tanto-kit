import { memo } from 'react';

import { StyledBadge } from './Badge.styles';
import type { BadgeProps } from './Badge.types';

export const Badge = memo((props: BadgeProps) => {
  const { intent, children } = props;
  return <StyledBadge intent={intent}>{children}</StyledBadge>;
});
