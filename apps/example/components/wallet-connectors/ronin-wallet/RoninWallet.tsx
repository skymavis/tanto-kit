import { Button } from '@nextui-org/react';
import { EIP1193Event, RoninWalletConnector } from '@sky-mavis/tanto-connect';
import { isNil } from 'lodash';
import React, { FC, useEffect } from 'react';

import { useConnectorStore } from '../../../hooks/useConnectorStore';
import WillRender from '../../will-render/WillRender';
import ConnectorActions from '../connector-actions/ConnectorActions';

const roninWalletConnector = new RoninWalletConnector();
const RoninWallet: FC = () => {
  const { connector, setConnector } = useConnectorStore();

  const [connecting, setConnecting] = React.useState<boolean>(false);
  const isConnected = !isNil(connector) && connector.id === roninWalletConnector.id;

  const connectWallet = () => {
    setConnecting(true);
    roninWalletConnector
      .connect()
      .then(() => {
        setConnector(roninWalletConnector);
      })
      .catch(console.error)
      .finally(() => setConnecting(false));
  };

  useEffect(() => {
    const setupConnect = () => {
      setConnector(roninWalletConnector);
    };

    roninWalletConnector.on(EIP1193Event.CONNECT, () => setupConnect);
  }, []);

  return (
    <div className={'w-full flex flex-col justify-center gap-6'}>
      <WillRender when={!isConnected}>
        <Button onClick={connectWallet} isLoading={connecting} size={'lg'}>
          <img src={'https://cdn.skymavis.com/wallet/logo.png'} height={20} width={20} />
          Connect to Ronin Wallet!
        </Button>
      </WillRender>
      <WillRender when={isConnected && !isNil(connector)}>
        <ConnectorActions />
      </WillRender>
    </div>
  );
};

export default RoninWallet;
