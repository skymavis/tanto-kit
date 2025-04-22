export * from './theme';

export type ConnectState = 'connected' | 'connecting' | 'failed' | 'opening_wallet';

export const CONNECT_STATES: Record<Uppercase<ConnectState>, ConnectState> = {
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
  FAILED: 'failed',
  OPENING_WALLET: 'opening_wallet',
} as const;
