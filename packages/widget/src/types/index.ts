export * from './theme';

export type ConnectState = 'pending' | 'error' | 'success' | 'opening_wallet';

export const CONNECT_STATES: Record<Uppercase<ConnectState>, ConnectState> = {
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
  OPENING_WALLET: 'opening_wallet',
} as const;
