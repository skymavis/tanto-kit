import { ConnectorEvent, IConnectResult, WaypointConnector } from '@sky-mavis/tanto-connect';
import { createConnector } from '@wagmi/core';
import { getAddress } from 'viem';

type ConnectParams = {
  chainId?: number;
  isReconnecting?: boolean;
};

export function waypoint() {
  const waypointConnector = new WaypointConnector({});

  const _mapAccounts = (accounts: string[]) => accounts.map(getAddress);

  const _connect = async (params?: ConnectParams) => {
    const { chainId } = await waypointConnector.connect(params?.chainId);
    const accounts = await waypointConnector.getAccounts();
    return {
      accounts: _mapAccounts(accounts),
      chainId,
    };
  };

  const _getAccounts = async () => {
    const accounts = await waypointConnector.getAccounts();
    return _mapAccounts(accounts);
  };

  return createConnector(config => {
    const onChainChanged = (chainId: number) => {
      config.emitter.emit('change', { chainId });
    };

    const onAccountsChanged = (accounts: string[]) => {
      config.emitter.emit('change', { accounts: _mapAccounts(accounts) });
    };

    const onConnect = async (results: IConnectResult) => {
      const accounts = await _getAccounts();
      config.emitter.emit('connect', { accounts, chainId: results.chainId });
    };

    const onDisconnect = () => {
      config.emitter.emit('disconnect');
    };

    waypointConnector.on(ConnectorEvent.CONNECT, onConnect);
    waypointConnector.on(ConnectorEvent.DISCONNECT, onDisconnect);
    waypointConnector.on(ConnectorEvent.ACCOUNTS_CHANGED, onAccountsChanged);
    waypointConnector.on(ConnectorEvent.CHAIN_CHANGED, onChainChanged);

    return {
      icon: waypointConnector.icon,
      id: waypointConnector.id,
      name: waypointConnector.name,
      type: waypointConnector.type,

      connect: _connect,
      getAccounts: _getAccounts,
      disconnect: waypointConnector.disconnect.bind(waypointConnector),
      getChainId: waypointConnector.getChainId.bind(waypointConnector),
      getProvider: waypointConnector.getProvider.bind(waypointConnector),
      isAuthorized: waypointConnector.isAuthorized.bind(waypointConnector),
      onAccountsChanged: waypointConnector.onAccountsChanged.bind(waypointConnector),
      onChainChanged: waypointConnector.onChainChanged.bind(waypointConnector),
      onDisconnect: waypointConnector.onDisconnect.bind(waypointConnector),
    };
  });
}
