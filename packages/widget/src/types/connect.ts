export enum ConnectState {
  CONNECTING = 'CONNECTING',
  OPEN_MOBILE_WALLET = 'OPEN_MOBILE_WALLET',
  AUTHENTICATING = 'AUTHENTICATING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export interface AccountConnectData {
  address?: string;
  chainId: number;
  connectorId?: string;
}

export interface AccountConnectionCallback {
  onConnect?: (data: AccountConnectData) => void;
  onDisconnect?: () => void;
}
