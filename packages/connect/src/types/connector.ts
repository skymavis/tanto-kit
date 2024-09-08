export interface IConnectorConfig {
  id: string;
  name: string;
  type: string;
  icon?: string;
}

export interface IConnectResult {
  provider: unknown;
  chainId: number;
  account: string;
}

export interface IBaseConnector {
  readonly id: string;
  readonly name: string;
  readonly icon?: string;
  readonly type: string;

  connect(chainId?: number): Promise<IConnectResult>;
  disconnect(): Promise<void>;
  getProvider(chainId?: number): Promise<unknown>;
  isAuthorized(): Promise<boolean>;
  getAccounts(): Promise<readonly string[]>;
  getChainId(): Promise<number>;
  switchChain(chain: any): Promise<boolean>;
  requestAccounts(): Promise<readonly string[]>;
}
