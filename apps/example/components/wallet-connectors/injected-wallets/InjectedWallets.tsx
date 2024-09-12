import { Button, Spinner } from '@nextui-org/react';
import { IBaseConnector, InjectedConnector, requestInjectedConnectors } from '@sky-mavis/tanto-connect';
import React, { FC, useEffect, useState } from 'react';

import WillRender from '../../will-render/WillRender';

interface IPropsType {
  setConnector: (connector: IBaseConnector) => void;
}

const InjectedWallets: FC<IPropsType> = ({ setConnector }) => {
  const [connectors, setConnectors] = useState<InjectedConnector[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    requestInjectedConnectors()
      .then(connectors => setConnectors(connectors))
      .catch(console.error)
      .finally(() => setFetching(false));
  }, []);

  const connectWallet = (connector: InjectedConnector) => {
    connector
      .connect()
      .then(() => setConnector(connector))
      .catch(console.error);
  };

  return (
    <div className={'flex flex-col gap-2'}>
      <WillRender when={fetching}>
        <Spinner label="Loading" color="default" labelColor="foreground" />
      </WillRender>
      <WillRender when={!fetching}>
        {connectors.map(connector => (
          <Button key={connector.id} fullWidth onClick={() => connectWallet(connector)}>
            <img src={connector.icon} height={20} width={20} />
            Connect to {connector.name}!
          </Button>
        ))}
      </WillRender>
    </div>
  );
};

export default InjectedWallets;
