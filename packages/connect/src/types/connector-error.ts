export enum ConnectorErrorType {
  PROVIDER_NOT_FOUND = 'ProviderNotFound',
  WALLET_IS_LOCKED = 'WalletIsLocked',
  CONNECT_FAIL = 'ConnectFail',
  USER_REJECTED_SESSION_REQUEST = 'UserRejectedSessionRequest',
  INVALID_PARAMS = 'InvalidParams',
  NOT_INSTALLED = 'NotInstalled',
  UNKNOWN = 'Unknown',
}

const ConnectorErrorCode = {
  [ConnectorErrorType.PROVIDER_NOT_FOUND]: 1001,
  [ConnectorErrorType.WALLET_IS_LOCKED]: 1002,
  [ConnectorErrorType.CONNECT_FAIL]: 1003,
  [ConnectorErrorType.USER_REJECTED_SESSION_REQUEST]: 1004,
  [ConnectorErrorType.INVALID_PARAMS]: 1005,
  [ConnectorErrorType.NOT_INSTALLED]: 1006,
  [ConnectorErrorType.UNKNOWN]: 1010,
};

export class ConnectorError extends Error {
  name: ConnectorErrorType;
  message: string;
  code: number;

  constructor(name: ConnectorErrorType, message?: string) {
    super();

    this.name = name;
    this.message = message ?? name;
    this.code = ConnectorErrorCode[name];
  }
}
