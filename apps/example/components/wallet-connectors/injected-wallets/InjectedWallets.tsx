import { Button, Spinner } from '@nextui-org/react';
import { ConnectorEvent, IBaseConnector, IConnectResult, requestInjectedConnectors } from '@sky-mavis/tanto-connect';
import React, { FC, useEffect, useState } from 'react';

import { useConnectorStore } from '../../../hooks/useConnectorStore';
import WillRender from '../../will-render/WillRender';
import ConnectorActions from '../connector-actions/ConnectorActions';

const InjectedWallets: FC = () => {
  const { setConnector, setIsConnected, isConnected, setChainId, setAccount } = useConnectorStore();
  const [connectors, setConnectors] = useState<IBaseConnector[]>([]);
  const [connectorIdLoading, setConnectorIdLoading] = React.useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    setIsConnected(false);
    requestInjectedConnectors()
      .then(connectors => setConnectors(connectors))
      .catch(console.error)
      .finally(() => setFetching(false));
  }, []);

  const onConnect = (payload: IConnectResult) => {
    setIsConnected(true);
    setAccount(payload.account);
    setChainId(payload.chainId);
  };

  const onAccountChange = (accounts: string[]) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  };

  const connectWallet = (connector: IBaseConnector) => {
    setConnector(connector);
    setConnectorIdLoading(connector.id);
    connector.on(ConnectorEvent.CONNECT, onConnect);
    connector.on(ConnectorEvent.ACCOUNTS_CHANGED, onAccountChange);
    connector.on(ConnectorEvent.CHAIN_CHANGED, chainId => setChainId(chainId));
    connector.on(ConnectorEvent.DISCONNECT, () => setIsConnected(false));

    connector
      .connect()
      .then(() => setIsConnected(true))
      .catch(console.error)
      .finally(() => setConnectorIdLoading(null));
  };

  return (
    <div className={'flex flex-col gap-2 '}>
      <WillRender when={fetching}>
        <Spinner label="Loading" color="default" labelColor="foreground" />
      </WillRender>
      <WillRender when={!fetching && !isConnected}>
        {connectors.map(connector => (
          <Button
            key={connector.id}
            fullWidth
            onClick={() => connectWallet(connector)}
            isLoading={connectorIdLoading === connector.id}
          >
            <img src={connector.icon} height={20} width={20} />
            Connect to {connector.name}!
          </Button>
        ))}
      </WillRender>

      <WillRender when={!fetching && isConnected}>
        <ConnectorActions />
      </WillRender>
    </div>
  );
};

export default InjectedWallets;
