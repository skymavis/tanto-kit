import EthereumProvider from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';
import { SignClientTypes } from '@walletconnect/types';

import { DEFAULT_CONNECTORS_CONFIG } from '../../common/connectors';
import { ReconnectStorage } from '../../common/storage';
import { createWalletConnectProvider } from '../../providers';
import { IConnectorConfigs } from '../../types/connector';
import { WCEvent } from '../../types/connector-event';
import { EIP1193Event } from '../../types/eip1193';
import { numberToHex } from '../../utils';
import { BaseConnector } from '../base/BaseConnector';
import { WC_RPC_MAP, WC_SUPPORTED_CHAIN_IDS, WC_SUPPORTED_METHODS, WC_SUPPORTED_OPTIONAL_METHODS } from './config';

interface IWCConnectorConfigs extends Partial<IConnectorConfigs> {
  projectId: string;
  clientMeta: SignClientTypes.Metadata;
  autoHandleDisplayUri?: boolean;
  requiredChains?: number[];
}

export class RoninWCConnector extends BaseConnector {
  private provider?: EthereumProvider;
  private readonly projectId: string;
  readonly clientMeta: SignClientTypes.Metadata;

  constructor(configs: IWCConnectorConfigs) {
    const { projectId, clientMeta, ...restConfigs } = configs;
    super({ ...DEFAULT_CONNECTORS_CONFIG.RONIN_WC, ...restConfigs });

    this.clientMeta = clientMeta;
    this.projectId = projectId;
    this.setupProviderListeners();
  }

  async getProvider() {
    if (!this.provider) {
      this.provider = await createWalletConnectProvider({
        projectId: this.projectId,
        metadata: this.clientMeta,
        chains: WC_SUPPORTED_CHAIN_IDS,
        methods: WC_SUPPORTED_METHODS,
        optionalMethods: WC_SUPPORTED_OPTIONAL_METHODS,
        rpcMap: WC_RPC_MAP,
        disableProviderPing: true,
        showQrModal: false,
      });
    }
    return this.provider;
  }

  async connect(chainId?: number) {
    const provider = await this.getProvider();

    await provider.enable();
    const accounts = await this.requestAccounts();
    const currentChainId = await this.getChainId();
    if (chainId && currentChainId !== chainId) {
      await this.switchChain(chainId);
    }
    this.setupProviderListeners();
    ReconnectStorage.add(this.id);

    return {
      provider,
      chainId: chainId ?? currentChainId,
      account: accounts[0],
    };
  }

  async disconnect() {
    ReconnectStorage.remove(this.id);
    this.removeAllListeners();
    this.removeProviderListeners();
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

  async switchChain(chain: number) {
    const provider = await this.getProvider();
    const chainId = provider?.request<number | string>({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: numberToHex(chain) }],
    });
    return !!chainId;
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

  protected onDisplayUri = (uri: string) => {
    this.emit(WCEvent.DISPLAY_URI, uri);
  };

  protected onSessionEvent = (data: any) => {
    this.emit(WCEvent.DISPLAY_URI, data);
  };

  protected setupProviderListeners() {
    this.removeProviderListeners();
    if (this.provider) {
      this.provider.on(EIP1193Event.CONNECT, this.onConnect);
      this.provider.on(EIP1193Event.DISCONNECT, this.onDisconnect);
      this.provider.on(EIP1193Event.ACCOUNTS_CHANGED, this.onAccountsChanged);
      this.provider.on(EIP1193Event.CHAIN_CHANGED, this.onChainChanged);

      this.provider.on(WCEvent.DISPLAY_URI, this.onDisplayUri);
      this.provider.on(WCEvent.SESSION_EVENT, this.onSessionEvent);
    }
  }

  protected removeProviderListeners() {
    if (this.provider) {
      this.provider.removeListener(EIP1193Event.CONNECT, this.onConnect);
      this.provider.removeListener(EIP1193Event.DISCONNECT, this.onDisconnect);
      this.provider.removeListener(EIP1193Event.ACCOUNTS_CHANGED, this.onAccountsChanged);
      this.provider.removeListener(EIP1193Event.CHAIN_CHANGED, this.onChainChanged);

      this.provider.removeListener(WCEvent.DISPLAY_URI, this.onDisplayUri);
      this.provider.removeListener(WCEvent.SESSION_EVENT, this.onSessionEvent);
    }
  }
}
