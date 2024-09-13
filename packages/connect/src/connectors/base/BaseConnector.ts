import { ReconnectStorage } from '../../common/storage';
import { IBaseConnector, IConnectorConfigs, IConnectResult } from '../../types/connector';
import { ConnectorEventEmitter } from '../../types/connector-event';
import { EIP1193Event } from '../../types/eip1193';

export abstract class BaseConnector extends ConnectorEventEmitter implements IBaseConnector {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly isRonin: boolean;
  readonly icon?: string;

  protected constructor(configs: IConnectorConfigs) {
    const { id, name, icon, type } = configs;

    super();
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.type = type;
    this.isRonin = false;
    this.processAutoReconnect();
  }

  abstract getProvider(chainId?: number): Promise<unknown>;
  abstract connect(chainId?: number): Promise<IConnectResult>;
  abstract disconnect(): Promise<void>;
  abstract isAuthorized(): Promise<boolean>;
  abstract getAccounts(): Promise<readonly string[]>;
  abstract getChainId(): Promise<number>;
  abstract switchChain(chain: number): Promise<boolean>;
  abstract requestAccounts(): Promise<readonly string[]>;

  processAutoReconnect = async () => {
    try {
      const shouldConnect = await this.shouldAutoReconnect();
      if (shouldConnect) {
        await this.connect();
      }
    } catch (e) {
      console.error(e);
    }
  };

  shouldAutoReconnect = async () => {
    const isReconnect = ReconnectStorage.get(this.id);
    const isAuthorized = await this.isAuthorized();
    return isReconnect && isAuthorized;
  };

  onChainChanged = (chainId: string) => {
    this.emit(EIP1193Event.CHAIN_CHANGED, chainId);
  };

  onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      this.onDisconnect();
    } else this.emit(EIP1193Event.ACCOUNTS_CHANGED, accounts);
  };

  onConnect = ({ chainId }: { chainId: string }) => {
    this.emit(EIP1193Event.CONNECT, { chainId: chainId });
  };

  onDisconnect = () => {
    this.emit(EIP1193Event.DISCONNECT);
  };
}
