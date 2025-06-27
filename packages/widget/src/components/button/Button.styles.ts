import styled from '@emotion/styled';

import type { ButtonProps } from './Button.types';

function getIntentStyles(theme: any, intent?: string) {
  const intentMap = {
    primary: {
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
    },
    secondary: {
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
    },
  };

  return intentMap[intent as keyof typeof intentMap] || intentMap.primary;
}

function getVariantStyles(theme: any, variant?: string) {
  const variantMap = {
    plain: {
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
    },
  };

  return variantMap[variant as keyof typeof variantMap] || {};
}

function getSizeStyles(size?: string) {
  const sizeMap = {
    large: {
      fontWeight: 500,
      height: 52,
      fontSize: '1em',
      padding: '0 16px',
    },
    default: {
      height: 44,
      fontSize: '1em',
      padding: '0 16px',
    },
    small: {
      height: 36,
      fontSize: '1em',
      padding: '0 16px',
    },
    xsmall: {
      height: 28,
      fontSize: '0.875em',
      padding: '0 8px',
    },
  };

  return sizeMap[size as keyof typeof sizeMap] || sizeMap.default;
}

function getShapeStyles(shape?: string) {
  const shapeMap = {
    square: { borderRadius: 0 },
    lessrounded: { borderRadius: 8 },
    rounded: { borderRadius: 328 },
  };

  return shapeMap[shape as keyof typeof shapeMap] || {};
}

function getDisabledStyles(theme: any, disabled?: boolean) {
  if (!disabled) return {};

  return {
    backgroundColor: theme.buttonDisabledBackground,
    pointerEvents: 'none' as const,
    cursor: 'not-allowed',
    '&, & *': {
      transition: 'color 150ms ease',
      color: theme.buttonDisabledColor,
    },
  };
}

export const StyledButton = styled.button<ButtonProps>(
  {
    cursor: 'pointer',
    position: 'relative',
    textAlign: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 150ms cubic-bezier(0.25, 0.1, 0.25, 1)',
    border: 'none',
    outline: 'none',
    textDecoration: 'none',
  },
  ({ fullWidth }) => ({
    width: fullWidth ? '100%' : 'auto',
  }),
  ({ theme, intent }) => getIntentStyles(theme, intent),
  ({ theme, variant }) => getVariantStyles(theme, variant),
  ({ size }) => getSizeStyles(size),
  ({ shape }) => getShapeStyles(shape),
  ({ theme, disabled }) => getDisabledStyles(theme, disabled),
);

export const StyledIconButton = styled(StyledButton)({
  aspectRatio: 1,
  padding: 0,
  borderRadius: 8,
});
