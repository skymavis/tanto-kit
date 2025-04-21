import { ReactNode } from 'react';

export type ConnectState = 'connected' | 'connecting' | 'failed' | 'opening_wallet';

export const CONNECT_STATES: Record<Uppercase<ConnectState>, ConnectState> = {
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
  FAILED: 'failed',
  OPENING_WALLET: 'opening_wallet',
} as const;

export interface ConnectLogoProps {
  walletIcon: ReactNode;
  status: ConnectState;
}

export interface ConnectContentProps {
  walletName: string;
  status: ConnectState;
  wcUri?: string;
  onRetry?: () => void;
}
