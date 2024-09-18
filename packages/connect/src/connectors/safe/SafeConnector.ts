import { SafeAppProvider } from '@safe-global/safe-apps-provider';

import { DEFAULT_CONNECTORS_CONFIG } from '../../common/connectors';
import { requestSafeProvider } from '../../providers';
import { IConnectorConfigs } from '../../types/connector';
import { ConnectorError, ConnectorErrorType } from '../../types/connector-error';
import { EIP1193Event } from '../../types/eip1193';
import { BaseConnector } from '../base/BaseConnector';

export class SafeConnector extends BaseConnector {
  constructor(configs: Partial<IConnectorConfigs>, provider: SafeAppProvider) {
    super({ ...DEFAULT_CONNECTORS_CONFIG.SAFE, ...configs }, provider);
  }

  async connect(chainId?: number) {
    const provider = await this.getProvider();

    if (!provider) {
      throw new ConnectorError(ConnectorErrorType.PROVIDER_NOT_FOUND);
    }

    const accounts = await this.requestAccounts();
    const currentChainId = await this.getChainId();

    if (chainId && chainId !== currentChainId) {
      await this.switchChain(chainId);
    }

    const connectResults = {
      provider,
      chainId: chainId || currentChainId,
      account: accounts[0],
    };

    this.setupProviderListeners();
    this.onConnect(connectResults);

    return {
      provider,
      chainId: chainId ?? currentChainId,
      account: accounts[0],
    };
  }

  async disconnect() {
    this.onDisconnect();
    this.removeAllListeners();
    this.removeProviderListeners();
  }

  async isAuthorized() {
    const accounts = await this.getAccounts();
    return accounts.length > 0;
  }

  async getAccounts() {
    const provider = await this.getProvider();

    return provider?.request<string[]>({
      method: 'eth_accounts',
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async switchChain(chain: number) {
    // TODO: Add a Connector Error for not allowing switch chain
    throw new ConnectorError(ConnectorErrorType.SWITCH_CHAIN_NOT_SUPPORTED);
    return false; // This is to prevent TS error
  }

  async getChainId() {
    const provider = await this.getProvider();
    const chainId = await provider?.request({
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
    return await requestSafeProvider();
  }

  protected setupProviderListeners() {
    this.removeProviderListeners();
    if (this.provider) {
      this.provider.on(EIP1193Event.DISCONNECT, this.onDisconnect);
      this.provider.on(EIP1193Event.ACCOUNTS_CHANGED, this.onAccountsChanged);
    }
  }

  protected removeProviderListeners() {
    if (this.provider) {
      this.provider.removeListener(EIP1193Event.DISCONNECT, this.onDisconnect);
      this.provider.removeListener(EIP1193Event.ACCOUNTS_CHANGED, this.onAccountsChanged);
    }
  }
}
