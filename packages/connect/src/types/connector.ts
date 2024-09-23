import { IConnectorEventEmitter } from './connector-event';

export interface IConnectorConfigs {
  id: string;
  name: string;
  type: string;
  icon?: string;
}

export interface IConnectResult {
  provider: unknown;
  chainId: number;
  account: string;
  accessToken?: string;
}

export interface IBaseConnector extends IConnectorEventEmitter {
  readonly id: string;
  readonly name: string;
  readonly icon?: string;
  readonly type: string;
  readonly isRonin: boolean;

  connect(chainId?: number): Promise<IConnectResult>;
  disconnect(): Promise<void>;
  getProvider(chainId?: number): Promise<unknown>;
  isAuthorized(): Promise<boolean>;
  getAccounts(): Promise<readonly string[]>;
  getChainId(): Promise<number>;
  switchChain(chain: any): Promise<boolean>;
  requestAccounts(): Promise<readonly string[]>;
  shouldAutoReconnect(): Promise<boolean>;
  autoConnect(): Promise<IConnectResult | null>;

  onChainChanged(chainId: string): void;
  onAccountsChanged(accounts: string[]): void;
  onConnect(results: IConnectResult): void;
  onDisconnect(): void;
}
