import styled from '@emotion/styled';

import type { BadgeProps } from './Badge.types';

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
