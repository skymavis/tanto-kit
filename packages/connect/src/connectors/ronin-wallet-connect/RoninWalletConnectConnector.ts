import EthereumProvider from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';
import { SignClientTypes } from '@walletconnect/types';

import { DEFAULT_CONNECTORS_CONFIG } from '../../common/connectors';
import { ReconnectStorage } from '../../common/storage';
import { IConnectorConfigs } from '../../types/connector';
import { ConnectorError, ConnectorErrorType } from '../../types/connector-error';
import { WCEvent } from '../../types/connector-event';
import { EIP1193Event } from '../../types/eip1193';
import { numberToHex } from '../../utils';
import { BaseConnector } from '../base/BaseConnector';
import { WC_SUPPORTED_CHAIN_IDS } from './config';

export interface IRoninWalletConnectConnectorConfigs extends Partial<IConnectorConfigs> {
  projectId: string;
  clientMeta: SignClientTypes.Metadata;
  autoHandleDisplayUri?: boolean;
  requiredChains?: number[];
}

export class RoninWalletConnectConnector extends BaseConnector<EthereumProvider> {
  private readonly projectId: string;
  readonly clientMeta: SignClientTypes.Metadata;
  readonly isRonin: boolean;

  constructor(provider: EthereumProvider, configs: IRoninWalletConnectConnectorConfigs) {
    const { projectId, clientMeta, ...restConfigs } = configs;
    super(provider, { ...DEFAULT_CONNECTORS_CONFIG.RONIN_WC, ...restConfigs });

    this.clientMeta = clientMeta;
    this.projectId = projectId;
    this.isRonin = true;

    this.setupWalletConnectEvent();
  }

  async connect(chainId?: number) {
    const provider = await this.getProvider();

    const targetChainId = chainId ?? WC_SUPPORTED_CHAIN_IDS[0];
    const isChainSupported = WC_SUPPORTED_CHAIN_IDS.includes(targetChainId);
    if (!isChainSupported) {
      throw new ConnectorError(ConnectorErrorType.WALLET_IS_LOCKED);
    }

    const isAuthorized = await this.isAuthorized();
    if (!isAuthorized) {
      await provider.connect({ chains: [targetChainId] });
    } else {
      await provider.enable();
    }

    this.setupProviderListeners();
    this.emit(EIP1193Event.CONNECT, { chainId: numberToHex(targetChainId) });

    ReconnectStorage.add(this.id);

    return {
      provider,
      chainId: targetChainId,
      account: provider.accounts[0],
    };
  }

  async disconnect() {
    const provider = await this.getProvider();
    await provider?.disconnect();

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
    return provider.accounts;
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

  protected setupWalletConnectEvent() {
    if (this.provider) {
      this.provider.on(WCEvent.DISPLAY_URI, this.onDisplayUri);
      this.provider.on(WCEvent.SESSION_DELETE, this.onDisconnect);
    }
  }

  protected setupProviderListeners() {
    this.removeProviderListeners();
    if (this.provider) {
      this.provider.on(EIP1193Event.CONNECT, this.onConnect);
      this.provider.on(EIP1193Event.DISCONNECT, this.onDisconnect);
      this.provider.on(EIP1193Event.ACCOUNTS_CHANGED, this.onAccountsChanged);
      this.provider.on(EIP1193Event.CHAIN_CHANGED, this.onChainChanged);

      this.setupWalletConnectEvent();
    }
  }

  protected removeProviderListeners() {
    if (this.provider) {
      this.provider.removeListener(EIP1193Event.CONNECT, this.onConnect);
      this.provider.removeListener(EIP1193Event.DISCONNECT, this.onDisconnect);
      this.provider.removeListener(EIP1193Event.ACCOUNTS_CHANGED, this.onAccountsChanged);
      this.provider.removeListener(EIP1193Event.CHAIN_CHANGED, this.onChainChanged);

      this.provider.removeListener(WCEvent.DISPLAY_URI, this.onDisplayUri);
      this.provider.removeListener(WCEvent.SESSION_DELETE, this.onDisconnect);
    }
  }
}
