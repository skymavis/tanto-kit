import { createContext } from 'react';

export interface TantoConfig {
  reducedMotion?: boolean;
  disableProfile?: boolean;
  hideConnectSuccessPrompt?: boolean;
}

export const defaultTantoConfig: TantoConfig = {
  reducedMotion: false,
  disableProfile: false,
  hideConnectSuccessPrompt: false,
};

export interface TantoState {
  config: TantoConfig;
}

export const TantoContext = createContext<TantoState | undefined>(undefined);
