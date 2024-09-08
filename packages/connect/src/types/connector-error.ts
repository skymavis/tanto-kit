// type IConnectorError =
//   | 'NotConnected'
//   | 'ProviderNotFound'
//   | 'UserRejected'
//   | 'ConnectFail'
//   | 'SessionInvalid'
//   | 'NotChainSwitchable';

export enum ConnectorErrorType {
  WALLET_IS_LOCKED = 'WalletIsLocked',
  USER_REJECTED_SESSION_REQUEST = 'UserRejectedSessionRequest',
  INVALID_PARAMS = 'InvalidParams',
  NOT_INSTALLED = 'NotInstalled',
  PROVIDER_NOT_FOUND = 'ProviderNotFound',
  UNKNOWN = 'Unknown',
}

const ConnectorErrorCode = {
  [ConnectorErrorType.WALLET_IS_LOCKED]: 1001,
  [ConnectorErrorType.USER_REJECTED_SESSION_REQUEST]: 1002,
  [ConnectorErrorType.INVALID_PARAMS]: 1003,
  [ConnectorErrorType.NOT_INSTALLED]: 1004,
  [ConnectorErrorType.PROVIDER_NOT_FOUND]: 1005,
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
