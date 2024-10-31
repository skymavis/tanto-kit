import { ConnectorEvent, IConnectResult, RoninWalletConnector } from '@sky-mavis/tanto-connect';
import { createConnector } from '@wagmi/core';
import { getAddress } from 'viem';

type ConnectParams = {
  chainId?: number;
  isReconnecting?: boolean;
};

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
