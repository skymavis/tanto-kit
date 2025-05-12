export interface WidgetTheme {
  name: string;
  fontFamily: string;
  colors: {
    buttonPrimary: string;
    buttonPrimaryHover: string;
    buttonPrimaryActive: string;
    buttonPrimaryForeground: string;
    buttonSecondary: string;
    buttonSecondaryHover: string;
    buttonSecondaryActive: string;
    buttonSecondaryForeground: string;
    buttonDisabled: string;
    buttonDisabledForeground: string;
    neutral: string;
    overlay: string;
    background: string;
    foreground: string;
    spinner: string;
    skeleton: string;
    modalBorder: string;
    scrollbarTrack: string;
    scrollbarThumb: string;
    link: string;
    border: string;
    error: string;
    listItem: string;
    listItemHover: string;
  };
}
