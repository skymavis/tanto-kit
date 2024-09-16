import { DEFAULT_CONNECTORS_CONFIG } from '../../common/connectors';
import { ReconnectStorage } from '../../common/storage';
import { requestCoinbaseProviders, requestLegacyCoinbaseProvider } from '../../providers/coinbase-provider';
import { IConnectorConfigs } from '../../types/connector';
import { ConnectorError, ConnectorErrorType } from '../../types/connector-error';
import { EIP1193Event, IEIP1193Provider } from '../../types/eip1193';
import { numberToHex } from '../../utils';
import { BaseConnector } from '../base/BaseConnector';

interface ICoinbaseWalletConnectorConfigs extends Partial<IConnectorConfigs> {
  isUseEIP6963?: boolean;
}

export class CoinbaseWalletConnector extends BaseConnector {
  readonly isCoinbaseWallet: boolean;
  private provider?: IEIP1193Provider;
  private readonly isUseEIP6963: boolean;

  constructor(config?: ICoinbaseWalletConnectorConfigs) {
    const { isUseEIP6963 = true, ...restConfigs } = config ?? {};
    super({ ...DEFAULT_CONNECTORS_CONFIG.COINBASE_WALLET, ...restConfigs });

    this.isUseEIP6963 = isUseEIP6963;
    this.isCoinbaseWallet = true;
  }

  async getProvider() {
    if (this.provider) {
      return this.provider;
    }

    const coinbaseProvider = this.isUseEIP6963
      ? await requestCoinbaseProviders()
      : await requestLegacyCoinbaseProvider();

    this.provider = coinbaseProvider;
    return this.provider;
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
    this.setupProviderListeners();
    this.emit(EIP1193Event.CONNECT, { chainId: numberToHex(chainId ?? currentChainId) });

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

  protected setupProviderListeners() {
    this.removeProviderListeners();
    if (this.provider) {
      this.provider.on(EIP1193Event.CONNECT, this.onConnect);
      this.provider.on(EIP1193Event.DISCONNECT, this.onDisconnect);
      this.provider.on(EIP1193Event.ACCOUNTS_CHANGED, this.onAccountsChanged);
      this.provider.on(EIP1193Event.CHAIN_CHANGED, this.onChainChanged);
    }
  }

  protected removeProviderListeners() {
    if (this.provider) {
      this.provider.removeListener(EIP1193Event.CONNECT, this.onConnect);
      this.provider.removeListener(EIP1193Event.DISCONNECT, this.onDisconnect);
      this.provider.removeListener(EIP1193Event.ACCOUNTS_CHANGED, this.onAccountsChanged);
      this.provider.removeListener(EIP1193Event.CHAIN_CHANGED, this.onChainChanged);
    }
  }
}