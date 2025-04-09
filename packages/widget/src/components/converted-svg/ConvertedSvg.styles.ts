import styled from '@emotion/styled';

import type { ConvertedSvgProps } from './ConvertedSvg.types';

export const StyledConvertedSvg = styled.img<Pick<ConvertedSvgProps, 'size'>>(
  {
    borderRadius: '50%',
    objectFit: 'cover',
  },
  ({ size }) => {
    switch (size) {
      case 'small':
        return {
          width: 16,
          height: 16,
        };
      case 'default':
        return {
          width: 32,
          height: 32,
        };
      case 'large':
        return {
          width: 48,
          height: 48,
        };
    }
  },
);
