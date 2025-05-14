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
          color: theme.buttonPrimaryColor,
          backgroundColor: theme.buttonPrimaryBackground,
          boxShadow: theme.buttonPrimaryShadow,
          border: theme.buttonPrimaryBorder,
          '&:hover': {
            color: theme.buttonPrimaryHoverColor,
            backgroundColor: theme.buttonPrimaryHoverBackground,
            boxShadow: theme.buttonPrimaryHoverShadow,
          },
          '&:active': {
            color: theme.buttonPrimaryActiveColor,
            backgroundColor: theme.buttonPrimaryActiveBackground,
            boxShadow: theme.buttonPrimaryActiveShadow,
          },
        };
      case 'secondary':
        return {
          color: theme.buttonSecondaryColor,
          backgroundColor: theme.buttonSecondaryBackground,
          boxShadow: theme.buttonSecondaryShadow,
          border: theme.buttonSecondaryBorder,
          '&:hover': {
            color: theme.buttonSecondaryHoverColor,
            backgroundColor: theme.buttonSecondaryHoverBackground,
            boxShadow: theme.buttonSecondaryHoverShadow,
          },
          '&:active': {
            color: theme.buttonSecondaryActiveColor,
            backgroundColor: theme.buttonSecondaryActiveBackground,
            boxShadow: theme.buttonSecondaryActiveShadow,
          },
        };
    }
  },

  ({ theme, variant }) => {
    switch (variant) {
      case 'plain':
        return {
          color: theme.buttonSecondaryColor,
          backgroundColor: 'transparent',
          '&:hover': {
            color: theme.buttonSecondaryHoverColor,
            backgroundColor: theme.buttonSecondaryHoverBackground,
          },
          '&:active': {
            color: theme.buttonSecondaryActiveColor,
            backgroundColor: theme.buttonSecondaryActiveBackground,
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
        backgroundColor: theme.buttonDisabledBackground,
        pointerEvents: 'none',
        cursor: 'not-allowed',
        '&, & *': {
          transition: 'color 150ms ease',
          color: theme.buttonDisabledColor,
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
