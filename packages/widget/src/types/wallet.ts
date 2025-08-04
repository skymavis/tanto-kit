import type { ReactNode } from 'react';
import type { Connector } from 'wagmi';

import type { WALLET_IDS } from '../constants';

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
