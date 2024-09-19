import { WaypointProvider } from '@sky-mavis/waypoint';

import { DEFAULT_CONNECTORS_CONFIG } from '../../common/connectors';
import { ReconnectStorage } from '../../common/storage';
import { requestWaypointProvider } from '../../providers';
import { IConnectorConfigs } from '../../types/connector';
import { ConnectorError, ConnectorErrorType } from '../../types/connector-error';
import { EIP1193Event } from '../../types/eip1193';
import { BaseConnector } from '../base/BaseConnector';

export class WaypointConnector extends BaseConnector {
  constructor(configs: Partial<IConnectorConfigs>, provider?: WaypointProvider) {
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

  async connect(chainId?: number) {
    const provider = await this.getProvider();

    if (!provider) {
      throw new ConnectorError(ConnectorErrorType.PROVIDER_NOT_FOUND);
    }

    const accounts = await this.requestAccounts();
    const currentChainId = await this.getChainId();

    const connectResults = {
      provider,
      chainId: chainId || currentChainId,
      account: accounts[0],
    };

    this.setupProviderListeners();
    this.onConnect(connectResults);
    ReconnectStorage.add(this.id);

    return {
      provider,
      chainId: chainId ?? currentChainId,
      account: accounts[0],
    };
  }

  async disconnect() {
    this.onDisconnect();
    this.removeProviderListeners();
  }

  async requestProvider() {
    return requestWaypointProvider();
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
