import { DEFAULT_CONNECTORS_CONFIG } from '../../common/connectors';
import { ReconnectStorage } from '../../common/storage';
import { requestRoninProvider } from '../../providers';
import { IConnectorConfigs } from '../../types/connector';
import { EIP1193Event, IEIP1193Provider } from '../../types/eip1193';
import { numberToHex } from '../../utils';
import { BaseConnector } from '../base/BaseConnector';

export class RoninWalletConnector extends BaseConnector {
  readonly isRonin: boolean;

  constructor(configs?: Partial<IConnectorConfigs>, provider?: IEIP1193Provider) {
    super({ ...DEFAULT_CONNECTORS_CONFIG.RONIN_WALLET, ...configs }, provider);
    this.isRonin = true;
  }

  async connect(chainId?: number) {
    const provider = await this.getProvider();
    const accounts = await this.requestAccounts();
    const currentChainId = await this.getChainId();

    if (chainId && currentChainId !== chainId) {
      await this.switchChain(chainId);
    }

    const connectResults = {
      provider,
      chainId: chainId || currentChainId,
      account: accounts[0],
    };

    this.setupProviderListeners();
    this.onConnect(connectResults);
    ReconnectStorage.add(this.id);
    return connectResults;
  }

  async disconnect() {
    ReconnectStorage.remove(this.id);
    const provider = await this.getProvider();
    await provider?.request<void>({
      method: 'wallet_disconnectSession',
    });

    this.removeProviderListeners();
    this.onDisconnect();
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
    return provider.request<void>({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: numberToHex(chain) }],
    });
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

  async requestProvider() {
    return requestRoninProvider();
  }

  protected setupProviderListeners() {
    this.removeProviderListeners();
    if (this.provider) {
      this.provider.on(EIP1193Event.DISCONNECT, this.onDisconnect);
      this.provider.on(EIP1193Event.ACCOUNTS_CHANGED, this.onAccountsChanged);
      this.provider.on(EIP1193Event.CHAIN_CHANGED, this.onChainChanged);
    }
  }

  protected removeProviderListeners() {
    if (this.provider) {
      this.provider.removeListener(EIP1193Event.DISCONNECT, this.onDisconnect);
      this.provider.removeListener(EIP1193Event.ACCOUNTS_CHANGED, this.onAccountsChanged);
      this.provider.removeListener(EIP1193Event.CHAIN_CHANGED, this.onChainChanged);
    }
  }
}
