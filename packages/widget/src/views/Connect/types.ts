import { ReactNode } from 'react';

export type ConnectState = 'connected' | 'connecting' | 'failed';

export const CONNECT_STATES: Record<Uppercase<ConnectState>, ConnectState> = {
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
  FAILED: 'failed',
} as const;

export interface ConnectLogoProps {
  walletIcon: ReactNode;
  status: ConnectState;
}

export interface ConnectContentProps {
  walletName: string;
  status: ConnectState;
  onRetry: () => void;
}

export const DELAY_CONNECT = 600;
export const DELAY_HIDE = 900;
