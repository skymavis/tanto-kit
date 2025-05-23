import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

type BadgeIntent = 'default' | 'highlight';
type BadgeProps = PropsWithChildren & {
  intent?: BadgeIntent;
};

export const StyledBadge = styled.div<Pick<BadgeProps, 'intent'>>(
  {
    padding: '2px 8px',
    borderRadius: 32,
    fontSize: '0.875em',
  },
  ({ theme, intent }) => {
    switch (intent) {
      case 'highlight':
        return {
          backgroundColor: theme.badgeHighlightBackground,
          color: theme.badgeDefaultColor,
        };
      default:
        return {
          backgroundColor: theme.badgeDefaultBackground,
          color: theme.badgeDefaultColor,
        };
    }
  },
);

export const Badge = (props: BadgeProps) => {
  const { intent, children } = props;
  return <StyledBadge intent={intent}>{children}</StyledBadge>;
};
