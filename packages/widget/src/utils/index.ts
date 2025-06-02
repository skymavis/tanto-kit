import { requestSafeProvider } from '@sky-mavis/tanto-connect';
import { UAParser } from 'ua-parser-js';
import { formatUnits } from 'viem';
import { Connector, CreateConnectorFn } from 'wagmi';

import { RONIN_WALLET_APP_DEEPLINK, RONIN_WALLET_WEB_LINK } from '../constants';
import { WALLET_IDS } from '../types/wallet';
import { name, version } from '../version';

export const notEmpty = <T>(value: T): value is NonNullable<T> => typeof value !== 'undefined' && value !== null;

export const isClient = () => typeof window !== 'undefined';

export const isRoninInAppBrowser = () =>
  isClient() && !!window.isWalletApp && window.ronin !== undefined && !!window.ethereum?.isRonin;

export const isSafeWallet = async () => {
  try {
    return !!(await requestSafeProvider());
  } catch {
    return false;
  }
};

export const getUserAgent = () => {
  if (!isClient()) return undefined;
  return UAParser(navigator.userAgent);
};

export const detectBrowser = () => {
  const parser = getUserAgent();
  return parser?.browser.name ?? '';
};

export const detectOS = () => {
  const parser = getUserAgent();
  return parser?.os.name ?? '';
};

export const isIOS = () => {
  const os = detectOS();
  return os.toLowerCase().includes('ios');
};

export const isAndroid = () => {
  const os = detectOS();
  return os.toLowerCase().includes('android');
};

export const isMobile = () => isAndroid() || isIOS();

export const isDesktop = () => !isMobile();

export const isInjectedConnector = (connectorType?: string) => connectorType === 'injected';

export const isRoninWallet = (connectorId?: string) => connectorId === WALLET_IDS.RONIN_WALLET;

export const isRoninWalletInjected = (connectorId?: string) => connectorId === WALLET_IDS.RONIN_WALLET_INJECTED;

export const isWCConnector = (connectorId?: string) => connectorId === WALLET_IDS.WALLET_CONNECT;

export const isWaypointConnector = (connectorId?: string) => connectorId === WALLET_IDS.WAYPOINT;

export const isSafeConnector = (connectorId?: string) => connectorId === WALLET_IDS.SAFE;

export const isCoinbaseConnector = (connectorId?: string) => connectorId === WALLET_IDS.COINBASE_WALLET;

export const generateInAppBrowserRoninMobileLink = (uri: string) => {
  return `${RONIN_WALLET_APP_DEEPLINK}in_app_browser?url=${encodeURIComponent(uri)}`;
};

export const generateRoninMobileWCLink = (uri: string, prefix = `${RONIN_WALLET_WEB_LINK}/`) =>
  `${prefix}auth-connect?uri=${encodeURIComponent(uri)}`;

export const isRoninExtensionInstalled = (connectors: readonly Connector<CreateConnectorFn>[]) =>
  connectors.some(connector => connector.id === WALLET_IDS.RONIN_WALLET_INJECTED);

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

export const getReverseNode = (address: string): string => {
  const node = address.startsWith('0x') ? address.substring(2) : address;
  return `${node.toLowerCase()}.addr.reverse`;
};

export const svgToBase64 = (svgText: string) => {
  const encoded = encodeURIComponent(svgText).replace(/'/g, '%27').replace(/"/g, '%22');
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
};

export const getVersionInfo = () => `${name}@${version}`;
