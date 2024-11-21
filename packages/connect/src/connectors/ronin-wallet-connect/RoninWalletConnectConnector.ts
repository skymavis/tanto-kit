import EthereumProvider from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';
import { SignClientTypes } from '@walletconnect/types';

import { DEFAULT_CONNECTORS_CONFIG, RONIN_WALLET_CONNECT_PROJECT_ID } from '../../common/connectors';
import { ArrayOneOrMore, WC_SUPPORTED_CHAIN_IDS } from '../../common/constant';
import { ReconnectStorage } from '../../common/storage';
import { requestRoninWalletConnectProvider } from '../../providers';
import { IConnectorConfigs } from '../../types/connector';
import { ConnectorEvent, WCEvent } from '../../types/connector-event';
import { EIP1193Event } from '../../types/eip1193';
import { numberToHex } from '../../utils';
import { BaseConnector } from '../base/BaseConnector';

export interface IRoninWalletConnectConnectorConfigs extends Partial<IConnectorConfigs> {
  projectId?: string;
  metadata?: SignClientTypes.Metadata;
  optionalChains?: ArrayOneOrMore<number>;
}

export class RoninWalletConnectConnector extends BaseConnector<EthereumProvider> {
  private readonly projectId: string;
  private readonly metadata?: SignClientTypes.Metadata;

  readonly isRonin: boolean;

  constructor(configs?: IRoninWalletConnectConnectorConfigs, provider?: EthereumProvider) {
    const { projectId = RONIN_WALLET_CONNECT_PROJECT_ID, metadata, ...restConfigs } = configs ?? {};
    super({ ...DEFAULT_CONNECTORS_CONFIG.RONIN_WC, ...restConfigs }, provider);

    this.metadata = metadata;
    this.projectId = projectId;
    this.isRonin = true;
  }

  getProvider = async () => {
    if (!this.provider) {
      this.provider = await this.requestProvider();
    }
    return this.provider;
  };

  async connect(chainId?: number) {
    const provider = await this.getProvider();
    const isAuthorized = await this.isAuthorized();
    this.setupProviderListeners();

    if (!isAuthorized) {
      await provider.connect();
    } else {
      await provider.enable();
    }

    const currentChainId = await this.getChainId();
    if (chainId && currentChainId !== chainId) {
      await this.switchChain(chainId);
    }

    const connectResults = {
      provider,
      chainId: chainId || currentChainId,
      account: provider.accounts[0],
    };

    ReconnectStorage.add(this.id);
    this.onConnect(connectResults);

    return connectResults;
  }

  async disconnect() {
    const provider = await this.getProvider();
    await provider.disconnect();
    this.onDisconnect();

    ReconnectStorage.remove(this.id);
    this.removeProviderListeners();
  }

  async isAuthorized() {
    const accounts = await this.getAccounts();
    return accounts.length > 0;
  }

  async getAccounts() {
    const provider = await this.getProvider();
    return provider.accounts;
  }

  async switchChain(chain: number) {
    const provider = await this.getProvider();
    return provider.request<void>({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: numberToHex(chain) }],
    });
  }

  async getChainId() {
    const provider = await this.getProvider();
    const chainId = await provider?.request<string>({
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

  async requestProvider() {
    return requestRoninWalletConnectProvider({
      projectId: this.projectId,
      metadata: this.metadata,
      showQrModal: this.isRonin,
      optionalChains: WC_SUPPORTED_CHAIN_IDS,
    });
  }

  protected onDisplayUri = (uri: string) => {
    this.emit(ConnectorEvent.DISPLAY_URI, uri);
  };

  protected setupWalletConnectEvent() {
    this.getProvider().then(provider => {
      provider.on(WCEvent.SESSION_DELETE, this.onDisconnect);
      provider.on(WCEvent.DISPLAY_URI, this.onDisplayUri);
    });
  }

  protected setupProviderListeners() {
    if (this.provider) {
      this.provider.on(EIP1193Event.DISCONNECT, this.onDisconnect);
      this.provider.on(EIP1193Event.ACCOUNTS_CHANGED, this.onAccountsChanged);
      this.provider.on(EIP1193Event.CHAIN_CHANGED, this.onChainChanged);

      this.setupWalletConnectEvent();
    }
  }

  protected removeProviderListeners() {
    if (this.provider) {
      this.provider.removeListener(EIP1193Event.DISCONNECT, this.onDisconnect);
      this.provider.removeListener(EIP1193Event.ACCOUNTS_CHANGED, this.onAccountsChanged);
      this.provider.removeListener(EIP1193Event.CHAIN_CHANGED, this.onChainChanged);

      this.provider.removeListener(WCEvent.DISPLAY_URI, this.onDisplayUri);
      this.provider.removeListener(WCEvent.SESSION_DELETE, this.onDisconnect);
    }
  }
}
