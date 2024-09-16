import { RoninWaypointWallet } from '@sky-mavis/waypoint';

import { SupportedChainIds } from '../../common/chain';
import { DEFAULT_CONNECTORS_CONFIG } from '../../common/connectors';
import { IConnectorConfigs } from '../../types/connector';
import { ConnectorError, ConnectorErrorType } from '../../types/connector-error';
import { EIP1193Event } from '../../types/eip1193';
import { BaseConnector } from '../base/BaseConnector';

const DEFAULT_ID_ORIGIN = 'https://waypoint.roninchain.com';
const CLIENT_ID = 'ced25363-9cab-4e50-b1bc-0e583b93c3a2';

export class WaypointConnector extends BaseConnector {
  constructor(config?: IConnectorConfigs) {
    super({ ...DEFAULT_CONNECTORS_CONFIG.WAYPOINT, ...config });
  }

  private provider?: RoninWaypointWallet;

  async getProvider(chainId?: number) {
    if (this.provider) {
      return this.provider;
    }

    const waypointProvider = RoninWaypointWallet.create({
      idOrigin: DEFAULT_ID_ORIGIN,
      clientId: CLIENT_ID,
      chainId: chainId || SupportedChainIds.RoninMainet,
    });

    if (!waypointProvider) {
      throw new ConnectorError(ConnectorErrorType.PROVIDER_NOT_FOUND);
    }

    this.provider = waypointProvider;
    return this.provider;
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async switchChain(chain: number) {
    // TODO: Create new ConnectorErrorType for this case
    throw new ConnectorError(ConnectorErrorType.UNKNOWN, 'Switch chain is not supported');
    return false; // This is to prevent TS error
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
    const provider = await this.getProvider(chainId);

    if (!provider) {
      throw new ConnectorError(ConnectorErrorType.PROVIDER_NOT_FOUND);
    }

    const accounts = await this.requestAccounts();
    const currentChainId = await this.getChainId();

    if (chainId && currentChainId !== chainId) {
      await this.switchChain(chainId);
    }

    return {
      provider,
      chainId: chainId ?? currentChainId,
      account: accounts[0],
    };
  }

  async disconnect() {
    this.removeAllListeners();
    this.removeProviderListeners();
  }

  protected setupProviderListeners() {
    this.removeProviderListeners();
    if (this.provider) {
      this.provider.on(EIP1193Event.CONNECT, this.onConnect);
      this.provider.on(EIP1193Event.DISCONNECT, this.onDisconnect);
    }
  }

  protected removeProviderListeners() {
    if (this.provider) {
      this.provider.removeListener(EIP1193Event.CONNECT, this.onConnect);
      this.provider.removeListener(EIP1193Event.DISCONNECT, this.onDisconnect);
    }
  }
}

import { RoninWaypointWallet } from '@sky-mavis/waypoint';

import { DEFAULT_CONNECTORS_CONFIG } from '../../common/connectors';
import { IConnectorConfigs } from '../../types/connector';
import { ConnectorError, ConnectorErrorType } from '../../types/connector-error';
import { EIP1193Event } from '../../types/eip1193';
import { BaseConnector } from '../base/BaseConnector';

export class WaypointConnector extends BaseConnector {
  constructor(provider: RoninWaypointWallet, configs?: IConnectorConfigs) {
    super(provider, { ...DEFAULT_CONNECTORS_CONFIG.WAYPOINT, ...configs });
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async switchChain(chain: number) {
    // TODO: Create new ConnectorErrorType for this case
    throw new ConnectorError(ConnectorErrorType.SWITCH_CHAIN_NOT_SUPPORTED);
    return false; // This is to prevent TS error
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

    if (chainId && currentChainId !== chainId) {
      await this.switchChain(chainId);
    }

    return {
      provider,
      chainId: chainId ?? currentChainId,
      account: accounts[0],
    };
  }

  async disconnect() {
    this.removeAllListeners();
    this.removeProviderListeners();
  }

  protected setupProviderListeners() {
    this.removeProviderListeners();
    if (this.provider) {
      this.provider.on(EIP1193Event.CONNECT, this.onConnect);
      this.provider.on(EIP1193Event.DISCONNECT, this.onDisconnect);
    }
  }

  protected removeProviderListeners() {
    if (this.provider) {
      this.provider.removeListener(EIP1193Event.CONNECT, this.onConnect);
      this.provider.removeListener(EIP1193Event.DISCONNECT, this.onDisconnect);
    }
  }
}
