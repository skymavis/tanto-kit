import { UseAccountEffectParameters } from 'wagmi';

export enum ConnectState {
  PENDING = 'PENDING',
  OPENING_WALLET = 'OPENING_WALLET',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type WagmiOnConnectParameters = Parameters<Required<UseAccountEffectParameters>['onConnect']>[0];

export interface AccountConnectData {
  address?: string;
  chainId: number;
  connectorId?: string;
}

export interface AccountConnectionCallback {
  onConnect?: (data: AccountConnectData) => void;
  onDisconnect?: () => void;
}
