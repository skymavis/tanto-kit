import { Button, Spinner, User } from '@nextui-org/react';
import { InjectedConnector, requestInjectedConnectors } from '@sky-mavis/tanto-connect';
import { isNil } from 'lodash';
import React, { FC, useEffect, useState } from 'react';

import { useConnectorStore } from '../../../hooks/useConnectorStore';
import WillRender from '../../will-render/WillRender';
import ConnectorActions from '../connector-actions/ConnectorActions';

const InjectedWallets: FC = () => {
  const { connector, setConnector } = useConnectorStore();

  const [connectors, setConnectors] = useState<InjectedConnector[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const [connectorIdLoading, setConnectorIdLoading] = React.useState<string | null>(null);
  const isConnected = !isNil(connector) && connectors.map(i => i.id).includes(connector?.id);

  useEffect(() => {
    requestInjectedConnectors()
      .then(connectors => setConnectors(Array.from(new Set(connectors))))
      .catch(console.error)
      .finally(() => setFetching(false));
  }, []);

  const connectWallet = (connector: InjectedConnector) => {
    setConnectorIdLoading(connector.id);
    connector
      .connect()
      .then(() => setConnector(connector))
      .catch(console.error)
      .finally(() => setConnectorIdLoading(null));
  };

  return (
    <div className={'flex flex-col gap-2'}>
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
