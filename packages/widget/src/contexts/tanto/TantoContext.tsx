import { createContext } from 'react';

export interface TantoConfig {
  reducedMotion?: boolean;
  disableProfile?: boolean;
  hideConnectSuccessPrompt?: boolean;
  initialChainId?: number;
}

export interface TantoState {
  config: TantoConfig;
}

export const TantoContext = createContext<TantoState | undefined>(undefined);
