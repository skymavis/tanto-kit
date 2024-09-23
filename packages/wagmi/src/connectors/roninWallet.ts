import { ConnectorEvent, IConnectResult, RoninWalletConnector } from '@sky-mavis/tanto-connect';
import { createConnector } from '@wagmi/core';
import { getAddress } from 'viem';

type ConnectParams = {
  chainId?: number;
  isReconnecting?: boolean;
};

export function roninWallet() {
  const roninWalletConnector = new RoninWalletConnector({});

  const _mapAccounts = (accounts: string[]) => accounts.map(getAddress);

  const _connect = async (params?: ConnectParams) => {
    const { chainId } = await roninWalletConnector.connect(params?.chainId);
    const accounts = await roninWalletConnector.getAccounts();
    return {
      accounts: _mapAccounts(accounts),
      chainId,
    };
  };

  const _getAccounts = async () => {
    const accounts = await roninWalletConnector.getAccounts();
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

    roninWalletConnector.on(ConnectorEvent.CONNECT, onConnect);
    roninWalletConnector.on(ConnectorEvent.DISCONNECT, onDisconnect);
    roninWalletConnector.on(ConnectorEvent.ACCOUNTS_CHANGED, onAccountsChanged);
    roninWalletConnector.on(ConnectorEvent.CHAIN_CHANGED, onChainChanged);

    return {
      icon: roninWalletConnector.icon,
      id: roninWalletConnector.id,
      name: roninWalletConnector.name,
      type: roninWalletConnector.type,

      connect: _connect,
      getAccounts: _getAccounts,
      disconnect: roninWalletConnector.disconnect.bind(roninWalletConnector),
      getChainId: roninWalletConnector.getChainId.bind(roninWalletConnector),
      getProvider: roninWalletConnector.getProvider.bind(roninWalletConnector),
      isAuthorized: roninWalletConnector.isAuthorized.bind(roninWalletConnector),
      onAccountsChanged: roninWalletConnector.onAccountsChanged.bind(roninWalletConnector),
      onChainChanged: roninWalletConnector.onChainChanged.bind(roninWalletConnector),
      onDisconnect: roninWalletConnector.onDisconnect.bind(roninWalletConnector),
    };
  });
}
