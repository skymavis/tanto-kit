import { Prettify } from 'viem';
import { Connector } from 'wagmi';

import { RON_LOGO_URL } from '../constants';
import type { Wallet } from '../types/wallet';
import {
  isRoninWallet,
  isRoninWalletHeadlessConnector,
  isRoninWalletInjected,
  isWaypointConnector,
} from '../utils/walletDetection';
import { useAccount } from './useAccount';
import { useWallets } from './useWallets';

const normalizeWalletName = (wallet: Wallet) => {
  if (isRoninWallet(wallet.id) || isRoninWalletInjected(wallet.id)) return 'Ronin Wallet';
  if (isWaypointConnector(wallet.id) || isRoninWalletHeadlessConnector(wallet.id)) return 'Ronin Keyless Wallet';
  return wallet.name;
};

const normalizeWalletIcon = (connector: Connector) => {
  if (
    isRoninWallet(connector.id) ||
    isRoninWalletInjected(connector.id) ||
    isWaypointConnector(connector.id) ||
    isRoninWalletHeadlessConnector(connector.id)
  )
    return RON_LOGO_URL;
  return connector.icon;
};

export type WalletWithPlainIcon = Prettify<Omit<Wallet, 'icon'> & { icon?: string }>;

export function useConnectedWallet(): WalletWithPlainIcon | undefined {
  const { connector } = useAccount();
  const { wallets } = useWallets();

  const wallet = connector ? wallets.find(wallet => wallet.connector?.id === connector?.id) : undefined;

  if (!connector || !wallet) return undefined;

  return {
    ...wallet,
    icon: normalizeWalletIcon(connector),
    name: normalizeWalletName(wallet),
  };
}
