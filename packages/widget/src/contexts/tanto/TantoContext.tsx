import { createContext } from 'react';

export interface TantoConfig {
  clientId?: string;
  reducedMotion?: boolean;
  disableProfile?: boolean;
  hideConnectSuccessPrompt?: boolean;
  initialChainId?: number;
  createAccountOnConnect?: boolean;
  __internal_customBaseUrl?: string;
}

export interface TantoState {
  config: TantoConfig;
}

export const TantoContext = createContext<TantoState | undefined>(undefined);
