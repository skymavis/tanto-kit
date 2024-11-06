import { ConnectorEvent, IConnectResult, RoninWalletConnector } from '@sky-mavis/tanto-connect';
import { ChainNotConfiguredError, createConnector } from '@wagmi/core';
import { getAddress, SwitchChainError } from 'viem';

import { ConnectParams, SwitchChainParams } from '../types';

export function roninWallet() {
  const connector = new RoninWalletConnector();

  const _connect = async (params?: ConnectParams) => {
    const { chainId } = await connector.connect(params?.chainId);
    const accounts = await connector.getAccounts();
    return {
      accounts: accounts.map(getAddress),
      chainId,
    };
  };

  const _getAccounts = async () => {
    const accounts = await connector.getAccounts();
    return accounts.map(getAddress);
  };

  return createConnector(config => {
    const _switchChain = async ({ chainId }: SwitchChainParams) => {
      const chain = config.chains.find(chain => chain.id === chainId);
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError());

      try {
        await connector.switchChain(chainId);
        return chain;
      } catch (error) {
        throw new SwitchChainError(error as Error);
      }
    };

    const onChainChanged = (chainId: number) => {
      config.emitter.emit('change', { chainId });
    };

    const onAccountsChanged = (accounts: string[]) => {
      config.emitter.emit('change', { accounts: accounts.map(getAddress) });
    };

    const onConnect = async (results: IConnectResult) => {
      const accounts = await _getAccounts();
      config.emitter.emit('connect', { accounts, chainId: results.chainId });
    };

    const onDisconnect = () => {
      config.storage?.removeItem('injected.connected');
      config.emitter.emit('disconnect');
    };

    connector.on(ConnectorEvent.CONNECT, onConnect);
    connector.on(ConnectorEvent.DISCONNECT, onDisconnect);
    connector.on(ConnectorEvent.ACCOUNTS_CHANGED, onAccountsChanged);
    connector.on(ConnectorEvent.CHAIN_CHANGED, onChainChanged);

    return {
      icon: connector.icon,
      id: connector.id,
      name: connector.name,
      type: connector.type,

      connect: _connect,
      getAccounts: _getAccounts,
      switchChain: _switchChain,
      disconnect: connector.disconnect.bind(connector),
      getChainId: connector.getChainId.bind(connector),
      getProvider: connector.getProvider.bind(connector),
      isAuthorized: connector.isAuthorized.bind(connector),
      onAccountsChanged: connector.onAccountsChanged.bind(connector),
      onChainChanged: connector.onChainChanged.bind(connector),
      onDisconnect: connector.onDisconnect.bind(connector),
    };
  });
}
