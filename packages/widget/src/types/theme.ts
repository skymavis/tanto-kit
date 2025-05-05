export interface WidgetTheme {
  /* ------------------ INFO ----------------- */
  name: string;
  /* ------------------ GENERAL ----------------- */
  fontFamily: string;
  foregroundColor: string;
  neutralColor: string;
  linkTextColor: string;
  linkTextSecondaryColor: string;
  borderColor: string;
  borderActiveColor: string;
  errorBorderColor: string;
  errorTextColor: string;

  /* ---------------- SCROLL BAR ---------------- */
  backgroundColor: string;
  thumbBackgroundColor: string;

  /* ------------------- MODAL ------------------ */
  modalMaxWidth: number;
  modalOverlayColor: string;
  modalBackgroundColor: string;
  modalShadow: string;
  modalBorderRadius: number;
  modalBorder: string;
  modalPadding: number;

  /* ------------------- INPUT ------------------ */
  inputBorderRadius: number;
  inputBackgroundColor: string;
  inputBorderColor: string;
  inputFocusShadow: string;

  /* ------------------ BUTTON ------------------ */
  buttonPrimaryTextColor: string;
  buttonPrimaryBackgroundColor: string;
  buttonPrimaryHoverBackgroundColor: string;
  buttonPrimaryActiveBackgroundColor: string;

  buttonSecondaryTextColor: string;
  buttonSecondaryBackgroundColor: string;
  buttonSecondaryHoverBackgroundColor: string;
  buttonSecondaryActiveBackgroundColor: string;

  buttonDisabledTextColor: string;
  buttonDisabledBackgroundColor: string;

  /* ------------------ SPINNER ----------------- */
  spinnerColor: string;

  /* ---------------- ONRAMP_CARD --------------- */
  onRampCardBorderRadius: number;
  onRampCardBackgroundColor: string;

  listItemBackgroundColor: string;
  listItemHoverBackgroundColor: string;
  listItemActiveBackgroundColor: string;

  listItemLargeBackgroundColor: string;
  listItemLargeHoverBackgroundColor: string;
  listItemLargeActiveBackgroundColor: string;

  /* ----------------- SKELETON ----------------- */
  skeletonBackgroundColor: string;
  skeletonForegroundColor: string;

  /* --------------- PROVIDER ITEM -------------- */
  providerItemBorderColor: string;
  providerItemActiveBorderColor: string;

  /* ------------------- BADGE ------------------ */
  badgeSuccessBackgroundColor: string;
  badgeSuccessColor: string;

  /* ------------------- TOOLTIP ------------------ */
  tooltipBackgroundColor: string;
  tooltipBorder: string;
  tooltipBorderRadius: number;
  tooltipBoxShadow: string;
}
