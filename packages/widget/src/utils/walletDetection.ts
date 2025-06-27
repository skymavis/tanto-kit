import { requestSafeProvider } from '@sky-mavis/tanto-connect';
import type { Connector, CreateConnectorFn } from 'wagmi';

import { WALLET_IDS } from '../constants';

export function isRoninInAppBrowser() {
  return (
    typeof window !== 'undefined' && !!window.isWalletApp && window.ronin !== undefined && !!window.ethereum?.isRonin
  );
}

export async function isSafeWallet() {
  try {
    return !!(await requestSafeProvider());
  } catch {
    return false;
  }
}

export const isInjectedConnector = (connectorType?: string) => connectorType === 'injected';

export const isRoninWallet = (connectorId?: string) => connectorId === WALLET_IDS.RONIN_WALLET;

export const isRoninWalletInjected = (connectorId?: string) => connectorId === WALLET_IDS.RONIN_WALLET_INJECTED;

export const isWCConnector = (connectorId?: string) => connectorId === WALLET_IDS.WALLET_CONNECT;

export const isWaypointConnector = (connectorId?: string) => connectorId === WALLET_IDS.WAYPOINT;

export const isSafeConnector = (connectorId?: string) => connectorId === WALLET_IDS.SAFE;

export const isCoinbaseConnector = (connectorId?: string) => connectorId === WALLET_IDS.COINBASE_WALLET;

export function isRoninExtensionInstalled(connectors: readonly Connector<CreateConnectorFn>[]) {
  return connectors.some(connector => connector.id === WALLET_IDS.RONIN_WALLET_INJECTED);
}
