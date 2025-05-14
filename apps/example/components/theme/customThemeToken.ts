import type { WidgetTheme } from '@sky-mavis/tanto-widget';

export const customThemeToken: WidgetTheme = {
  mode: 'light',
  fontFamily: [
    "'Nunito'",
    'sans-serif',
    '-apple-system',
    'BlinkMacSystemFont',
    "'Segoe UI'",
    'Helvetica',
    "'Apple Color Emoji'",
    'Arial',
    "'Segoe UI Emoji'",
  ],
  fontSize: '1em',

  buttonPrimaryBackground: 'oklch(0.71 0.097 111.7)',
  buttonPrimaryColor: 'oklch(0.98 0.005 0)',
  buttonPrimaryShadow: '0 2px 0 0 oklch(0.59 0.096 111.8)',
  buttonPrimaryBorder: '2px solid oklch(0.59 0.096 111.8)',
  buttonPrimaryHoverBackground: 'oklch(0.71 0.097 111.7)',
  buttonPrimaryHoverColor: 'oklch(0.98 0.005 0)',
  buttonPrimaryHoverShadow: '0 2px 0 0 oklch(0.59 0.096 111.8)',
  buttonPrimaryActiveBackground: 'oklch(0.71 0.097 111.7)',
  buttonPrimaryActiveColor: 'oklch(0.98 0.005 0)',
  buttonPrimaryActiveShadow: '0 2px 0 0 oklch(0.59 0.096 111.8)',

  buttonSecondaryBackground: 'oklch(0.88 0.055 83.6)',
  buttonSecondaryColor: 'oklch(0.51 0.077 78.9)',
  buttonSecondaryShadow: '0 2px 0 0 oklch(0.74 0.063 80.8)',
  buttonSecondaryBorder: '2px solid oklch(0.74 0.063 80.8)',
  buttonSecondaryHoverBackground: 'oklch(0.88 0.055 83.6)',
  buttonSecondaryHoverColor: 'oklch(0.51 0.077 78.9)',
  buttonSecondaryHoverShadow: '0 2px 0 0 oklch(0.74 0.063 80.8)',
  buttonSecondaryActiveBackground: 'oklch(0.88 0.055 83.6)',
  buttonSecondaryActiveColor: 'oklch(0.51 0.077 78.9)',
  buttonSecondaryActiveShadow: '0 2px 0 0 oklch(0.74 0.063 80.8)',

  buttonDisabledBackground: 'oklch(0.86 0.064 83.7)',
  buttonDisabledColor: 'oklch(0.51 0.077 74.3)',
  buttonDisabledBorder: '2px solid oklch(0.74 0.063 80.8)',

  bodyText: 'oklch(0.41 0.077 78.9)',
  mutedText: 'oklch(0.51 0.077 74.3)',

  overlayBackground: 'oklch(0.41 0.077 78.9 / 0.2)',
  overlayBackdropFilter: 'blur(10px)',

  drawerBorderRadius: '0.625rem',
  modalBorderRadius: '0.625rem',
  modalShadow: '0 2px 0 0 oklch(0.74 0.063 80.8)',
  modalBackground: 'oklch(0.92 0.042 83.6)',
  modalColor: 'oklch(0.41 0.077 74.3)',
  modalBorder: '2px solid oklch(0.74 0.063 80.8)',

  spinnerColor: 'oklch(0.51 0.077 74.3)',
  skeletonColor: 'oklch(0.86 0.055 83.6)',

  scrollbarTrack: 'oklch(0.91 0.048 83.6)',
  scrollbarThumb: 'oklch(0.74 0.063 80.8)',

  linkColor: 'oklch(0.71 0.097 111.7)',

  dividerBorder: '2px solid oklch(0.74 0.063 80.8)',

  listItemBackground: 'oklch(0.86 0.055 83.6 / 0.5)',
  listItemHoverBackground: 'oklch(0.86 0.055 83.6)',
};
