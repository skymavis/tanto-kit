import { Button } from '@nextui-org/react';
import { ConnectorEvent, IConnectResult, RoninWalletConnector } from '@sky-mavis/tanto-connect';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { FC } from 'react';
import { getAddress, http } from 'viem';
import { mainnet, sepolia } from 'viem/chains';
import { Connector, createConfig, createConnector, useAccount, useConnect, useDisconnect, WagmiProvider } from 'wagmi';

export function roninWallet() {
  const roninWalletConnector = new RoninWalletConnector({});

  const _connect = async (
    parameters?: { chainId?: number | undefined; isReconnecting?: boolean | undefined } | undefined,
  ) => {
    const { chainId } = await roninWalletConnector.connect(parameters?.chainId);
    const accounts = await roninWalletConnector.getAccounts();
    return {
      accounts: accounts.map(i => getAddress(i)),
      chainId: chainId,
    };
  };

  const _getAccounts = async () => {
    const accounts = await roninWalletConnector.getAccounts();
    return accounts.map(i => getAddress(i));
  };

  return createConnector(config => {
    const onChainChanged = (chain: number) => {
      const chainId = Number(chain);
      config.emitter.emit('change', { chainId });
    };

    const onAccountsChanged = (accounts: string[]) => {
      config.emitter.emit('change', {
        accounts: accounts.map(x => getAddress(x)),
      });
    };

    const onConnect = async (results: IConnectResult) => {
      const accounts = await _getAccounts();
      config.emitter.emit('connect', { accounts: accounts, chainId: results.chainId });
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
      disconnect: roninWalletConnector.disconnect,
      getChainId: roninWalletConnector.getChainId,
      getProvider: roninWalletConnector.getProvider,
      isAuthorized: roninWalletConnector.isAuthorized,
      onAccountsChanged: roninWalletConnector.onAccountsChanged,
      onChainChanged: roninWalletConnector.onChainChanged,
      onDisconnect: roninWalletConnector.onDisconnect,
    };
  });
}

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [roninWallet()],
  ssr: true,
});

const queryClient = new QueryClient();

const WagmiExample: FC = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Account />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

const Account = () => {
  const { address, chainId, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleClickConnector = (connector: Connector) => {
    if (isConnected) {
      disconnect();
    } else {
      connect({ connector });
    }
  };

  return (
    <div className={'w-full min-h-screen flex justify-center items-center flex-col'}>
      <p>Account: {address}</p>
      <p>ChainId: {chainId}</p>
      {connectors.map(connector => (
        <Button onClick={() => handleClickConnector(connector)} key={connector.id}>
          {connector.name}
        </Button>
      ))}
    </div>
  );
};

export default WagmiExample;
