import { createContext } from 'react';
import type { Connector } from 'wagmi';

import type { Wallet } from '../../types/wallet';

export interface WidgetConnectState {
  wallets: Wallet[];
  primaryWallets: Wallet[];
  secondaryWallets: Wallet[];
  selectedWallet?: Wallet;
  selectedConnector?: Connector;
  setSelectedWallet: (wallet: Wallet) => void;
}

export const WidgetConnectContext = createContext<WidgetConnectState | undefined>(undefined);
