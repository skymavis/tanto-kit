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
    transition: 'all 150ms cubic-bezier(0.25, 0.1, 0.25, 1)',
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
          color: theme.colors.buttonPrimaryForeground,
          backgroundColor: theme.colors.buttonPrimary,
          '&:hover': {
            backgroundColor: theme.colors.buttonPrimaryHover,
          },
          '&:active': {
            backgroundColor: theme.colors.buttonPrimaryActive,
          },
        };
      case 'secondary':
        return {
          color: theme.colors.buttonSecondaryForeground,
          backgroundColor: theme.colors.buttonSecondary,
          '&:hover': {
            backgroundColor: theme.colors.buttonSecondaryHover,
          },
          '&:active': {
            backgroundColor: theme.colors.buttonSecondaryActive,
          },
        };
    }
  },

  ({ theme, variant }) => {
    switch (variant) {
      case 'plain':
        return {
          color: theme.colors.buttonSecondaryForeground,
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: theme.colors.buttonSecondaryHover,
          },
          '&:active': {
            backgroundColor: theme.colors.buttonSecondaryActive,
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
          fontSize: '1em',
          padding: '0 16px',
        };
      case 'default':
        return {
          height: 44,
          fontSize: '1em',
          padding: '0 16px',
        };
      case 'small':
        return {
          height: 36,
          fontSize: '1em',
          padding: '0 16px',
        };
      case 'xsmall':
        return {
          height: 28,
          fontSize: '0.875em',
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
        backgroundColor: theme.colors.buttonDisabled,
        pointerEvents: 'none',
        cursor: 'not-allowed',
        '&, & *': {
          transition: 'color 150ms ease',
          color: theme.colors.buttonDisabledForeground,
        },
      };
    }
  },
);

export const StyledIconButton = styled(StyledButton)({
  aspectRatio: 1,
  padding: 0,
  borderRadius: 8,
});
