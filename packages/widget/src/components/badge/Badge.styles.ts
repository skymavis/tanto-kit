import styled from '@emotion/styled';

import type { BadgeProps } from './Badge.types';

export const StyledBadge = styled.div<Pick<BadgeProps, 'intent'>>(
  {
    padding: '2px 8px',
    borderRadius: 32,
    fontSize: '0.875em',
  },
  ({ intent }) => {
    switch (intent) {
      case 'highlight':
        return {
          backgroundColor: 'rgba(115, 13, 55, 0.60)',
          color: '#FBB2D0',
        };

      default:
        return {
          backgroundColor: 'rgba(39, 43, 52, 0.60)',
          color: '#F1F3F9',
        };
    }
  },
);
