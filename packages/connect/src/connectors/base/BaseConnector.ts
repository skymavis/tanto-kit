import { ReconnectStorage } from '../../common/storage';
import { IBaseConnector, IConnectorConfigs, IConnectResult } from '../../types/connector';
import { ConnectorEvent, ConnectorEventEmitter } from '../../types/connector-event';
import { IEIP1193Provider } from '../../types/eip1193';

export abstract class BaseConnector<ProviderType = IEIP1193Provider>
  extends ConnectorEventEmitter
  implements IBaseConnector
{
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly icon?: string;
  readonly isRonin: boolean;
  protected provider?: ProviderType;

  protected constructor(configs: IConnectorConfigs, provider?: ProviderType) {
    const { id, name, icon, type } = configs;

    super();
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.type = type;
    this.isRonin = false;
    this.provider = provider;
  }

  abstract connect(chainId?: number): Promise<IConnectResult>;
  abstract disconnect(): Promise<void>;
  abstract isAuthorized(): Promise<boolean>;
  abstract getAccounts(): Promise<readonly string[]>;
  abstract getChainId(): Promise<number>;
  abstract switchChain(chain: number): Promise<void>;
  abstract addChain(chain: number): Promise<void>;
  abstract requestAccounts(): Promise<readonly string[]>;

  protected abstract requestProvider(): Promise<ProviderType>;

  getProvider = async () => {
    if (!this.provider) {
      this.provider = await this.requestProvider();
    }
    return this.provider;
  };

  getProviderSync = () => {
    return this.provider;
  };

  autoConnect = async () => {
    try {
      const isConnectable = await this.shouldAutoReconnect();
      return isConnectable ? await this.connect() : null;
    } catch (error) {
      console.error('Failed to auto-connect:', error);
      return null;
    }
  };

  shouldAutoReconnect = async () => {
    const isReconnect = ReconnectStorage.get(this.id);
    const isAuthorized = await this.isAuthorized();
    return isReconnect && isAuthorized;
  };

  onChainChanged = (chainId: string) => {
    this.emit(ConnectorEvent.CHAIN_CHANGED, Number(chainId));
  };

  onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      this.onDisconnect();
    }
    this.emit(ConnectorEvent.ACCOUNTS_CHANGED, accounts);
  };

  onConnect = (result: IConnectResult) => {
    this.emit(ConnectorEvent.CONNECT, result);
  };

  onDisconnect = () => {
    this.emit(ConnectorEvent.DISCONNECT);
  };
}
