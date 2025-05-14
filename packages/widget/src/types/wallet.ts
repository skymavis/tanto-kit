import { ReactNode } from 'react';
import { Connector } from 'wagmi';

export type WalletId =
  | string
  | 'WAYPOINT'
  | 'RONIN_WALLET'
  | 'com.roninchain.wallet'
  | 'walletConnect'
  // Custom for Ronin
  | 'CUSTOM_RONIN_MOBILE_WALLET'
  | 'CUSTOM_RONIN_IN_APP_WALLET';

export interface WalletConfig {
  icon: ReactNode;
  name: string;
  homepage?: string;
  displayOptions?: {
    thumbnail?: ReactNode;
    description?: string;
    highlightBackground?: boolean;
    showRoninBadge?: boolean;
  };
}

export type Wallet = WalletConfig & {
  id: string;
  isInstalled: boolean;
  connector?: Connector;
};
