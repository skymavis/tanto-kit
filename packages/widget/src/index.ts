export type { TantoConnectButtonProps } from './ConnectButton';
export { TantoConnectButton } from './ConnectButton';
export type { TantoProviderProps } from './contexts/tanto/TantoProvider';
export { TantoProvider } from './contexts/tanto/TantoProvider';
export { darkTheme } from './contexts/theme/darkTheme';
export { lightTheme } from './contexts/theme/lightTheme';
export { useWidgetModal as useTantoModal } from './contexts/widget-modal/useWidgetModal';
export type { TantoEmbeddedWidgetProps } from './EmbeddedWidget';
export { TantoEmbeddedWidget } from './EmbeddedWidget';
export type { AppMetadata, DefaultConfig, KeylessWalletConfig } from './getDefaultConfig';
export { createConnectors, createTransports, getDefaultConfig, RONIN_WALLET_METADATA } from './getDefaultConfig';
export type {
  AuthFailedCallback,
  AuthFailedData,
  AuthSuccessCallback,
  AuthSuccessData,
  UseAuthEffectParameters,
} from './hooks/useAuthEffect';
export { useAuthEffect } from './hooks/useAuthEffect';
export { useConnectedWallet } from './hooks/useConnectedWallet';
export type { UseRnsAddressParameters } from './hooks/useRnsAddress';
export { useRnsAddress } from './hooks/useRnsAddress';
export type { UseRnsNameParameters } from './hooks/useRnsName';
export { useRnsName } from './hooks/useRnsName';
export type {
  TantoWidgetCustomThemeTokens,
  TantoWidgetTheme,
  TantoWidgetThemeMode,
  TantoWidgetThemeTokens,
} from './types/theme';
