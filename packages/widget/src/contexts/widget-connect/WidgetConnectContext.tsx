import { createContext } from 'react';
import { Connector } from 'wagmi';

import { Wallet } from '../../types/wallet';

export interface WidgetConnectState {
  wallets: Wallet[];
  primaryWallets: Wallet[];
  secondaryWallets: Wallet[];
  selectedWallet?: Wallet;
  selectedConnector?: Connector;
  setSelectedWallet: (wallet: Wallet) => void;
}

export const WidgetConnectContext = createContext<WidgetConnectState | undefined>(undefined);
