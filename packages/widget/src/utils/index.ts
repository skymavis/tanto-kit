import { detect } from 'detect-browser';
import { Connector, CreateConnectorFn } from 'wagmi';

import { WEB_WALLET_LINK } from '../constants';

export const notEmpty = <T>(value: T): value is NonNullable<T> => typeof value !== 'undefined' && value !== null;

export const isClient = () => {
  return typeof window !== 'undefined';
};

export const isRoninWallet = () => {
  return isClient() && !!window.isWalletApp && window.ronin !== undefined && !!window.ethereum?.isRonin;
};

export const detectBrowser = () => {
  const browser = detect();
  return browser?.name ?? '';
};

export const detectOS = () => {
  const browser = detect();
  return browser?.os ?? '';
};

export const isIOS = () => {
  const os = detectOS();
  return os.toLowerCase().includes('ios');
};

export const isAndroid = () => {
  const os = detectOS();
  return os.toLowerCase().includes('android');
};

export const isMobile = () => {
  return isAndroid() || isIOS();
};

export const isDesktop = () => !isMobile();

export const generateInAppBrowserRoninMobileLink = (uri: string) => {
  return `roninwallet://in_app_browser?url=${encodeURIComponent(uri)}`;
};

export const generateRoninMobileWCLink = (uri: string): string => {
  return `${WEB_WALLET_LINK}/auth-connect?uri=${encodeURIComponent(uri)}`;
};

export const isRoninExtensionInstalled = (connectors: readonly Connector<CreateConnectorFn>[]) => {
  return connectors.some(connector => connector.id === 'com.roninchain.wallet');
};
