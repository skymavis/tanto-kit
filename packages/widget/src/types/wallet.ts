import { ReactNode } from 'react';
import { Connector } from 'wagmi';

export const WALLET_IDS = {
  WAYPOINT: 'WAYPOINT',
  RONIN_WALLET: 'RONIN_WALLET',
  RONIN_WALLET_INJECTED: 'com.roninchain.wallet',
  WALLET_CONNECT: 'walletConnect',
  SAFE: 'safe',
  COINBASE_WALLET: 'coinbaseWalletSDK',
  CUSTOM_RONIN_MOBILE_WALLET: 'CUSTOM_RONIN_MOBILE_WALLET',
  CUSTOM_RONIN_IN_APP_WALLET: 'CUSTOM_RONIN_IN_APP_WALLET',
} as const;

export type WalletId = typeof WALLET_IDS[keyof typeof WALLET_IDS] | (string & {});

export interface WalletConfig {
  icon: ReactNode;
  name: string;
  homepage?: string;
  displayOptions?: {
    thumbnail?: ReactNode;
    description?: string;
    highlightBackground?: boolean;
    showRoninBadge?: boolean;
    connectingTitle?: string;
    connectingDescription?: string;
  };
}

export type Wallet = WalletConfig & {
  id: WalletId;
  isInstalled: boolean;
  connector?: Connector;
};
