import { createContext } from 'react';
import { Connector } from 'wagmi';

import { Wallet } from '../../types/wallet';

export interface TantoState {
  wallet: Wallet | null;
  connector?: Connector;
  setWallet: (wallet: Wallet) => void;
}

export const TantoContext = createContext<TantoState | undefined>(undefined);
