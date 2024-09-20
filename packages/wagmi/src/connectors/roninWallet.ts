import { ConnectorEvent, RoninWalletConnector } from '@sky-mavis/tanto-connect';
import { getAddress } from 'viem';
import { createConnector } from 'wagmi';

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

  const onChainChanged = (config: any, chainId: number) => {
    config.emitter.emit('change', { chainId });
  };

  const onAccountsChanged = (config: any, accounts: string[]) => {
    config.emitter.emit('change', { accounts: _mapAccounts(accounts) });
  };

  const onConnect = async (config: any, results: any) => {
    const accounts = await _getAccounts();
    config.emitter.emit('connect', { accounts, chainId: results.chainId });
  };

  const onDisconnect = (config: any) => {
    config.emitter.emit('disconnect');
  };

  return createConnector((config: any) => {
    roninWalletConnector.on(ConnectorEvent.CONNECT, (results: any) => onConnect(config, results));
    roninWalletConnector.on(ConnectorEvent.DISCONNECT, () => onDisconnect(config));
    roninWalletConnector.on(ConnectorEvent.ACCOUNTS_CHANGED, (accounts: string[]) =>
      onAccountsChanged(config, accounts),
    );
    roninWalletConnector.on(ConnectorEvent.CHAIN_CHANGED, (chain: number) => onChainChanged(config, Number(chain)));

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
