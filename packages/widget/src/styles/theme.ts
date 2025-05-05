import type { Theme } from '@emotion/react';

export const tantoDarkTheme: Theme = {
  /* ------------------ INFO ----------------- */
  name: 'tanto-dark',

  /* ------------------ GENERAL ----------------- */
  fontFamily: "'Work Sans', 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  foregroundColor: '#fff',
  neutralColor: 'rgba(205, 213, 229, 0.75)',
  linkTextColor: '#5294F8',
  linkTextSecondaryColor: '#136AEC',
  borderColor: '#353A45',
  borderActiveColor: 'rgba(205, 213, 229, 0.10)',
  errorBorderColor: '#971127',
  errorTextColor: '#F6515E',

  /* ---------------- SCROLL BAR ---------------- */
  backgroundColor: '#1c1c22',
  thumbBackgroundColor: '#353a45',

  /* ------------------- MODAL ------------------ */
  modalMaxWidth: 500,
  modalOverlayColor: 'rgba(12, 12, 13, 0.6)',
  modalBackgroundColor: '#15181E',
  modalShadow: '0px 0px 1px 0px rgba(0, 0, 0, 0.20), 0px 24px 64px 0px #000',
  modalBorderRadius: 20,
  modalBorder: '1px solid #272B34',
  modalPadding: 24,

  /* ------------------- INPUT ------------------ */
  inputBorderRadius: 8,
  inputBackgroundColor: 'rgba(14, 17, 22, 0.00)',
  inputBorderColor: 'rgba(205, 213, 229, 0.30)',
  inputFocusShadow: '0px 0px 0px 4px rgba(255, 255, 255, 0.10)',

  /* ------------------ BUTTON ------------------ */
  buttonPrimaryTextColor: '#15181E',
  buttonPrimaryBackgroundColor: '#F1F3F9',
  buttonPrimaryHoverBackgroundColor: '#CDD5E5',
  buttonPrimaryActiveBackgroundColor: '#F1F3F9',

  buttonSecondaryTextColor: '#F1F3F9',
  buttonSecondaryBackgroundColor: '#CDD5E512',
  buttonSecondaryHoverBackgroundColor: '#CDD5E51A',
  buttonSecondaryActiveBackgroundColor: '#CDD5E526',

  buttonDisabledTextColor: 'rgba(205, 213, 229, 0.7)',
  buttonDisabledBackgroundColor: '#CDD5E512',

  /* ------------------ SPINNER ----------------- */
  spinnerColor: '#f1f3f9',

  /* ---------------- ONRAMP CARD --------------- */
  onRampCardBorderRadius: 16,
  onRampCardBackgroundColor: 'rgba(205, 213, 229, 0.07)',

  listItemBackgroundColor: 'rgba(205, 213, 229, 0.07)',
  listItemHoverBackgroundColor: 'rgba(205, 213, 229, 0.1)',
  listItemActiveBackgroundColor: 'rgba(205, 213, 229, 0.15)',

  listItemLargeBackgroundColor: 'rgba(205, 213, 229, 0.07)',
  listItemLargeHoverBackgroundColor: 'rgba(205, 213, 229, 0.10)',
  listItemLargeActiveBackgroundColor: 'rgba(205, 213, 229, 0.15)',

  /* ----------------- SKELETON ----------------- */
  skeletonBackgroundColor: 'rgba(205, 213, 229, 0.07)',
  skeletonForegroundColor: `linear-gradient(
        270deg,
        rgba(147, 176, 236, 0),
        rgba(147, 176, 236, 0.06) 50%,
        rgba(147, 176, 236, 0)
      )`,

  /* --------------- PROVIDER ITEM -------------- */
  providerItemBorderColor: 'rgba(205, 213, 229, 0.10)',
  providerItemActiveBorderColor: '#F1F3F9',

  /* ------------------- BADGE ------------------ */
  badgeSuccessBackgroundColor: 'rgba(12, 49, 34, 0.60)',
  badgeSuccessColor: '#52E08D',

  /* ------------------- TOOLTIP ------------------ */
  tooltipBackgroundColor: '#15181E',
  tooltipBorder: '1px solid #272B34',
  tooltipBorderRadius: 12,
  tooltipBoxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.10),  0px 4px 20px 0px rgba(0, 0, 0, 0.40)',
};

export const tantoLightTheme: Theme = {
  /* ------------------ INFO ----------------- */
  name: 'tanto-light',

  /* ------------------ GENERAL ----------------- */
  fontFamily: "'Work Sans', 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  foregroundColor: '#000',
  neutralColor: 'rgba(0, 0, 0, 0.75)',
  linkTextColor: '#1D4ED8',
  linkTextSecondaryColor: '#1E40AF',
  borderColor: '#D1D5DB',
  borderActiveColor: 'rgba(0, 0, 0, 0.10)',
  errorBorderColor: '#B91C1C',
  errorTextColor: '#EF4444',

  /* ---------------- SCROLL BAR ---------------- */
  backgroundColor: '#F9FAFB',
  thumbBackgroundColor: '#D1D5DB',

  /* ------------------- MODAL ------------------ */
  modalMaxWidth: 500,
  modalOverlayColor: 'rgba(12, 12, 13, 0.8)',
  modalBackgroundColor: '#FFFFFF',
  modalShadow: '0px 0px 1px 0px rgba(0, 0, 0, 0.10), 0px 12px 24px 0px rgba(0, 0, 0, 0.20)',
  modalBorderRadius: 20,
  modalBorder: '1px solid #272B34',
  modalPadding: 24,

  /* ------------------- INPUT ------------------ */
  inputBorderRadius: 8,
  inputBackgroundColor: '#FFFFFF',
  inputBorderColor: 'rgba(0, 0, 0, 0.30)',
  inputFocusShadow: '0px 0px 0px 4px rgba(0, 0, 0, 0.10)',

  /* ------------------ BUTTON ------------------ */
  buttonPrimaryTextColor: '#FFFFFF',
  buttonPrimaryBackgroundColor: '#000',
  buttonPrimaryHoverBackgroundColor: '#4B5563',
  buttonPrimaryActiveBackgroundColor: '#374151',

  buttonSecondaryTextColor: '#000',
  buttonSecondaryBackgroundColor: 'rgba(0, 0, 0, 0.05)',
  buttonSecondaryHoverBackgroundColor: '#E5E7EB',
  buttonSecondaryActiveBackgroundColor: '#D1D5DB',

  buttonDisabledTextColor: '#9CA3AF',
  buttonDisabledBackgroundColor: '#E5E7EB',

  /* ------------------ SPINNER ----------------- */
  spinnerColor: '#4B5563',

  /* ---------------- ONRAMP CARD --------------- */
  onRampCardBorderRadius: 16,
  onRampCardBackgroundColor: '#F3F4F9',

  listItemBackgroundColor: 'transparent',
  listItemHoverBackgroundColor: 'rgba(0, 0, 0, 0.05)',
  listItemActiveBackgroundColor: 'rgba(0, 0, 0, 0.10)',

  listItemLargeBackgroundColor: 'rgba(0, 0, 0, 0.03)',
  listItemLargeHoverBackgroundColor: 'rgba(0, 0, 0, 0.05)',
  listItemLargeActiveBackgroundColor: 'rgba(0, 0, 0, 0.10)',

  /* ----------------- SKELETON ----------------- */
  skeletonBackgroundColor: 'rgba(0, 0, 0, 0.03)',
  skeletonForegroundColor: `linear-gradient(
        270deg,
        rgba(147, 176, 236, 0),
        rgba(147, 176, 236, 0.10) 50%,
        rgba(147, 176, 236, 0)
      )`,

  /* --------------- PROVIDER ITEM -------------- */
  providerItemBorderColor: 'rgba(0, 0, 0, 0.10)',
  providerItemActiveBorderColor: '#4B5563',

  /* ------------------- BADGE ------------------ */
  badgeSuccessBackgroundColor: '#c9fcdf',
  badgeSuccessColor: '#047912',

  /* ------------------- TOOLTIP ------------------ */
  tooltipBackgroundColor: '#FFFFFF',
  tooltipBorder: '1px solid #D1D5DB',
  tooltipBorderRadius: 12,
  tooltipBoxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.05), 0px 4px 20px 0px rgba(0, 0, 0, 0.10)',
};
