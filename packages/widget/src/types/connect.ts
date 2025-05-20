export enum ConnectState {
  PENDING = 'PENDING',
  OPENING_WALLET = 'OPENING_WALLET',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface AccountConnectionCallback {
  onConnect?: (data: { address?: string; chainId: number; connectorId?: string }) => void;
  onDisconnect?: () => void;
}
