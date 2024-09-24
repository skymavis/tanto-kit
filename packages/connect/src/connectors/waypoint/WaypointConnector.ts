import { WaypointProvider } from '@sky-mavis/waypoint';

import { DEFAULT_CONNECTORS_CONFIG } from '../../common/connectors';
import { ReconnectStorage } from '../../common/storage';
import { requestWaypointProvider } from '../../providers';
import { IConnectorConfigs, IConnectResult } from '../../types/connector';
import { ConnectorError, ConnectorErrorType } from '../../types/connector-error';
import { EIP1193Event } from '../../types/eip1193';
import { BaseConnector } from '../base/BaseConnector';

export class WaypointConnector extends BaseConnector<WaypointProvider> {
  constructor(configs?: Partial<IConnectorConfigs>, provider?: WaypointProvider) {
    super({ ...DEFAULT_CONNECTORS_CONFIG.WAYPOINT, ...configs }, provider);
  }

  async isAuthorized() {
    const accounts = await this.getAccounts();
    return accounts.length > 0;
  }

  async getAccounts() {
    const provider = await this.getProvider();
    return provider.request<string[]>({
      method: 'eth_accounts',
    });
  }

  async switchChain() {
    console.error(new ConnectorError(ConnectorErrorType.SWITCH_CHAIN_NOT_SUPPORTED));
    return false;
  }

  async getChainId() {
    const provider = await this.getProvider();
    const chainId = await provider?.request<number | string>({
      method: 'eth_chainId',
    });

    return Number(chainId);
  }

  async requestAccounts() {
    const provider = await this.getProvider();
    return provider?.request<string[]>({
      method: 'eth_requestAccounts',
    });
  }

  async connect() {
    const provider = await this.getProvider();
    const chainId = await this.getChainId();
    const accounts = await this.getAccounts();
    const account = accounts[0];
    const connectResult: IConnectResult = {
      provider,
      chainId,
      account,
    };

    if (!account) {
      const { address, accessToken } = await provider.connect();
      connectResult.account = address as string;
      connectResult.accessToken = accessToken;
    }
    this.onConnect(connectResult);
    ReconnectStorage.add(this.id);
    return connectResult;
  }

  async disconnect() {
    const provider = await this.getProvider();
    provider.disconnect();

    this.onDisconnect();
    this.removeProviderListeners();
  }

  async requestProvider(chainId?: number) {
    return requestWaypointProvider(chainId);
  }

  protected setupProviderListeners() {
    this.removeProviderListeners();
    if (this.provider) {
      this.provider.on(EIP1193Event.DISCONNECT, this.onDisconnect);
    }
  }

  protected removeProviderListeners() {
    if (this.provider) {
      this.provider.removeListener(EIP1193Event.DISCONNECT, this.onDisconnect);
    }
  }
}
