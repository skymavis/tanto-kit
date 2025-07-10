import { Prettify } from 'viem';

export type TantoWidgetCustomThemeTokens = Prettify<Partial<Omit<TantoWidgetThemeTokens, 'mode'>>>;

export type TantoWidgetThemeMode = 'light' | 'dark';

export interface TantoWidgetThemeTokens {
  mode: TantoWidgetThemeMode;

  /* General */
  fontFamily: string | Array<string>;
  fontSize: number | string;

  /* Intent Colors */
  warningColor: string;
  successColor: string;

  /* Primary Button */
  buttonPrimaryColor: string;
  buttonPrimaryBackground: string;
  buttonPrimaryShadow: string;
  buttonPrimaryBorder: string;
  buttonPrimaryHoverColor: string;
  buttonPrimaryHoverBackground: string;
  buttonPrimaryHoverShadow: string;
  buttonPrimaryActiveColor: string;
  buttonPrimaryActiveBackground: string;
  buttonPrimaryActiveShadow: string;

  /* Secondary Button */
  buttonSecondaryColor: string;
  buttonSecondaryBackground: string;
  buttonSecondaryShadow: string;
  buttonSecondaryBorder: string;
  buttonSecondaryHoverColor: string;
  buttonSecondaryHoverBackground: string;
  buttonSecondaryHoverShadow: string;
  buttonSecondaryActiveColor: string;
  buttonSecondaryActiveBackground: string;
  buttonSecondaryActiveShadow: string;

  /* Disabled Button */
  buttonDisabledColor: string;
  buttonDisabledBackground: string;
  buttonDisabledBorder: string;

  /* Modal */
  modalBackground: string;
  modalBorder: string;
  modalShadow: string;
  modalBorderRadius: number | string;
  drawerBorderRadius: number | string;

  /* Overlay */
  overlayBackground: string;
  overlayBackdropFilter: string;

  /* Text */
  bodyText: string;
  mutedText: string;

  spinnerColor: string;
  skeletonColor: string;

  /* Scrollbar */
  scrollbarTrack: string;
  scrollbarThumb: string;

  /* Link */
  linkColor: string;

  /* Divider */
  dividerBorder: string;

  /* List Item */
  listItemBackground: string;
  listItemHoverBackground: string;

  /* Badge */
  badgeDefaultColor: string;
  badgeDefaultBackground: string;
  badgeHighlightColor: string;
  badgeHighlightBackground: string;

  /* QR Code */
  qrcodeBackground: string;
}

export type TantoWidgetTheme = TantoWidgetThemeMode | TantoWidgetThemeTokens;
