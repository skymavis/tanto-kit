export enum ConnectorErrorType {
  PROVIDER_NOT_FOUND = 'ProviderNotFound',
  WALLET_IS_LOCKED = 'WalletIsLocked',
  CONNECT_FAIL = 'ConnectFail',
  USER_REJECTED_SESSION_REQUEST = 'UserRejectedSessionRequest',
  INVALID_PARAMS = 'InvalidParams',
  NOT_INSTALLED = 'NotInstalled',
  UNKNOWN = 'Unknown',
  SWITCH_CHAIN_NOT_SUPPORTED= 'SwitchChainNotSupported'
}

export class ConnectorError extends Error {
  name: ConnectorErrorType;
  error?: any;

  constructor(name: ConnectorErrorType, error?: any) {
    super();

    this.name = name;
    this.error = error;
  }
}
