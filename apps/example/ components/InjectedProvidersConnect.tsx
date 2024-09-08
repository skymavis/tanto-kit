import { Button } from '@nextui-org/react';
import { InjectedConnector, requestEIP6963Providers } from '@sky-mavis/tanto-kit-connect';
import { IBaseConnector } from '@sky-mavis/tanto-kit-connect/src/types/connector';
import React, { FC, useEffect, useState } from 'react';

const InjectedProviderConnect: FC = () => {
  const [connectors, setConnectors] = useState<IBaseConnector[]>([]);
  const [connetorIdConnected, setConnectorIdConnected] = useState<string[]>([]);

  useEffect(() => {
    const fetchConnectors = async () => {
      const providers = await requestEIP6963Providers(100);
      const connectors = Array.from(providers.values()).map(
        provider =>
          new InjectedConnector(provider.provider, {
            name: provider.info.name,
            id: provider.info.uuid,
            icon: provider.info.icon,
            type: 'injected',
          }),
      );
      setConnectors(connectors);
    };

    fetchConnectors();
  }, []);

  const checkAuthorized = async (connector: IBaseConnector) => {
    const isAuthorized = await connector.isAuthorized();
    if (isAuthorized) {
      setConnectorIdConnected([...connetorIdConnected, connector.id]);
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
          color={connetorIdConnected.includes(connector.id) ? 'success' : 'default'}
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
