import { ExternalProvider } from '@ethersproject/providers';

import { IBaseConnector, IConnectorConfig, IConnectResult } from '../../types/connector';
import { ConnectorEventEmitter } from '../../types/connector-event';
import { EIP1193Event } from '../../types/eip1193';

export abstract class BaseConnector extends ConnectorEventEmitter implements IBaseConnector {
  readonly id: string;
  readonly name: string;
  readonly icon?: string;
  readonly type: string;

  protected constructor(configs: IConnectorConfig) {
    super();
    const { id, name, icon, type } = configs;
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.type = type;
  }

  abstract getProvider(chainId?: number): Promise<ExternalProvider>;
  abstract connect(chainId?: number): Promise<IConnectResult>;
  abstract disconnect(): Promise<void>;
  abstract isAuthorized(): Promise<boolean>;
  abstract getAccounts(): Promise<readonly string[]>;
  abstract getChainId(): Promise<number>;
  abstract switchChain(chain: number): Promise<boolean>;
  abstract requestAccounts(): Promise<readonly string[]>;

  protected onChainChanged = (chainId: string) => {
    this.emit(EIP1193Event.CHAIN_CHANGED, chainId);
  };

  protected onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      this.onDisconnect();
    }
    else this.emit(EIP1193Event.ACCOUNTS_CHANGED, accounts);
  };

  protected onConnect = ({ chainId }: { chainId: string }) => {
    this.emit(EIP1193Event.CONNECT, { chainId: chainId });
  };

  protected onDisconnect = () => {
    this.emit(EIP1193Event.DISCONNECT);
  };
}
