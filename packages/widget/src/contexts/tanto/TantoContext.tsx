import { createContext } from 'react';

export interface TantoConfig {
  clientId?: string;
  reducedMotion?: boolean;
  disableProfile?: boolean;
  hideConnectSuccessPrompt?: boolean;
  initialChainId?: number;
  createAccountOnConnect?: boolean;
}

export interface TantoState {
  config: TantoConfig;
}

export const TantoContext = createContext<TantoState | undefined>(undefined);
