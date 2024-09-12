import { Button } from '@nextui-org/react';
import { IBaseConnector } from '@sky-mavis/tanto-connect/src';
import React, { FC, useState } from 'react';

const InjectedProviderConnect: FC = () => {
  const [connectors, setConnectors] = useState<IBaseConnector[]>([]);
  const [connectorIdConnected, setConnectorIdConnected] = useState<string[]>([]);

  const checkAuthorized = async (connector: IBaseConnector) => {
    const isAuthorized = await connector.isAuthorized();
    if (isAuthorized) {
      setConnectorIdConnected([...connectorIdConnected, connector.id]);
    }
  };

  return (
    <div className={'flex flex-col gap-4'}>
      {connectors.map(connector => (
        <Button
          onClick={() => {
            checkAuthorized(connector);
            connector.connect().then(() => checkAuthorized(connector));
          }}
          color={connectorIdConnected.includes(connector.id) ? 'success' : 'default'}
          key={connector.id}
        >
          <img src={connector.icon} width={20} height={20} />
          Connect to {connector.name}
        </Button>
      ))}
    </div>
  );
};

export default InjectedProviderConnect;
