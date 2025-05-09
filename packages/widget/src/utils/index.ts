import { detect } from 'detect-browser';
import { formatUnits } from 'viem';
import { Connector, CreateConnectorFn } from 'wagmi';

import { RONIN_WALLET_WEB_LINK } from '../constants';

export const notEmpty = <T>(value: T): value is NonNullable<T> => typeof value !== 'undefined' && value !== null;

export const isClient = () => {
  return typeof window !== 'undefined';
};

export const isRoninInAppBrowser = () => {
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

export const isWCConnector = (connectorId?: string) => connectorId === 'walletConnect';

export const isInjectedConnector = (connectorType?: string) => connectorType === 'injected';

export const generateInAppBrowserRoninMobileLink = (uri: string) => {
  return `roninwallet://in_app_browser?url=${encodeURIComponent(uri)}`;
};

export const generateRoninMobileWCLink = (uri: string, prefix = `${RONIN_WALLET_WEB_LINK}/`): string => {
  return `${prefix}auth-connect?uri=${encodeURIComponent(uri)}`;
};

export const isRoninExtensionInstalled = (connectors: readonly Connector<CreateConnectorFn>[]) => {
  return connectors.some(connector => connector.id === 'com.roninchain.wallet');
};

export const truncate = (
  value?: string,
  options?: {
    prefixChar?: number;
    suffixChar?: number;
    bridge?: string;
  },
) => {
  const { prefixChar = 8, suffixChar = 6, bridge = '•••' } = options ?? {};
  if (!value) return '';
  if (value.length <= prefixChar + suffixChar + bridge.length) return value;
  return `${value.slice(0, prefixChar)}${bridge}${value.slice(-suffixChar)}`;
};

export const formatBalance = (amount: bigint) => {
  const remainder = amount % BigInt(1e14);
  return formatUnits(amount - remainder, 18);
};

export const isValidURL = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
