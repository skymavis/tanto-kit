export enum ConnectorErrorType {
  PROVIDER_NOT_FOUND = 'ProviderNotFound',
  CONNECT_FAILED = 'ConnectFailed',
  NOT_INSTALLED = 'NotInstalled',
  SWITCH_CHAIN_NOT_SUPPORTED = 'SwitchChainNotSupported',
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
