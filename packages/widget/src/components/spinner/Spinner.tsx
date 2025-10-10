import styled from '@emotion/styled';

import { spin } from '../../styles/animations';

interface SpinnerProps {
  size?: 'small' | 'default' | 'large' | 'xsmall';
  color?: string;
}

export const StyledSpinner = styled.div<SpinnerProps>(
  {
    aspectRatio: '1',
    borderRadius: '50%',
    '--mask': 'conic-gradient(#0000 10%,#000),linear-gradient(#000 0 0) content-box',
    WebkitMask: 'var(--mask)',
    mask: 'var(--mask)',
    WebkitMaskComposite: 'source-out',
    maskComposite: 'subtract',
    animation: `${spin} 1s infinite linear`,
  },

  props => {
    const { color, theme } = props;
    return {
      backgroundColor: color || theme.spinnerColor,
    };
  },

  props => {
    const { size } = props;
    switch (size) {
      case 'xsmall':
        return {
          padding: 4,
          width: 16,
        };
      case 'small':
        return {
          padding: 4,
          width: 18,
        };
      case 'default':
        return {
          padding: 4,
          width: 24,
        };
      case 'large':
        return {
          padding: 8,
          width: 48,
        };
    }
  },
);

export function Spinner(props: SpinnerProps) {
  const { size = 'default', color } = props;

  return <StyledSpinner size={size} color={color} />;
}
