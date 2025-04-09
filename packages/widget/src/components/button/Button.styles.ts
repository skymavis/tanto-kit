import styled from '@emotion/styled';

import type { ButtonProps } from './Button.types';

export const StyledButton = styled.button<ButtonProps>(
  {
    cursor: 'pointer',
    position: 'relative',
    textAlign: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    transitionProperty: 'color, background-color, box-shadow',
    transitionDuration: '150ms',
    transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  },

  ({ fullWidth: full }) => {
    return {
      width: full ? '100%' : 'auto',
    };
  },

  ({ theme, intent }) => {
    switch (intent) {
      case 'primary':
        return {
          color: theme.buttonPrimaryTextColor,
          backgroundColor: theme.buttonPrimaryBackgroundColor,
          '&:hover': {
            backgroundColor: theme.buttonPrimaryHoverBackgroundColor,
          },
          '&:active': {
            backgroundColor: theme.buttonPrimaryBackgroundColor,
          },
        };
      case 'secondary':
        return {
          color: theme.buttonSecondaryTextColor,
          backgroundColor: theme.buttonSecondaryBackgroundColor,
          '&:hover': {
            backgroundColor: theme.buttonSecondaryHoverBackgroundColor,
          },
          '&:active': {
            backgroundColor: theme.buttonSecondaryActiveBackgroundColor,
          },
        };
    }
  },

  ({ theme, variant }) => {
    switch (variant) {
      case 'plain':
        return {
          color: theme.buttonSecondaryTextColor,
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: theme.buttonSecondaryHoverBackgroundColor,
          },
          '&:active': {
            backgroundColor: theme.buttonSecondaryActiveBackgroundColor,
          },
        };
    }
  },

  ({ size }) => {
    switch (size) {
      case 'large':
        return {
          fontWeight: 500,
          height: 52,
          fontSize: 16,
          padding: '0 16px',
        };
      case 'default':
        return {
          height: 44,
          fontSize: 16,
          padding: '0 16px',
        };
      case 'small':
        return {
          height: 36,
          fontSize: 16,
          padding: '0 16px',
        };
      case 'xsmall':
        return {
          height: 28,
          fontSize: 14,
          padding: '0 8px',
        };
    }
  },

  ({ shape }) => {
    switch (shape) {
      case 'square':
        return {
          borderRadius: 0,
        };
      case 'lessrounded':
        return {
          borderRadius: 8,
        };
      case 'rounded':
        return {
          borderRadius: 328,
        };
    }
  },

  ({ theme, disabled }) => {
    if (disabled) {
      return {
        color: theme.buttonDisabledTextColor,
        backgroundColor: theme.buttonDisabledBackgroundColor,
        pointerEvents: 'none',
        cursor: 'not-allowed',
      };
    }
  },
);

export const StyledIconButton = styled(StyledButton)({
  aspectRatio: 1,
  padding: 0,
  borderRadius: 8,
});
