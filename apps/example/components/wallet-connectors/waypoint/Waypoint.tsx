import { Button } from '@nextui-org/react';
import { requestWaypointConnector } from '@sky-mavis/tanto-connect';
import { isNil } from 'lodash';
import React, { FC } from 'react';

import { useConnectorStore } from '../../../hooks/useConnectorStore';
import WillRender from '../../will-render/WillRender';
import ConnectorActions from '../connector-actions/ConnectorActions';

const Waypoint: FC = () => {
  const { connector, setConnector } = useConnectorStore();

  const [connecting, setConnecting] = React.useState<boolean>(false);
  const isConnected = !isNil(connector);

  const connectWallet = async () => {
    setConnecting(true);
    const provider = requestWaypointConnector({});
    setConnector(provider);
    setConnecting(false);
  };

  return (
    <div className={'w-full flex flex-col justify-center gap-6'}>
      <WillRender when={!isConnected}>
        <Button onClick={connectWallet} isLoading={connecting} size={'lg'}>
          <img src={'https://cdn.skymavis.com/wallet/logo.png'} height={20} width={20} />
          Connect to Waypoint
        </Button>
      </WillRender>
      <WillRender when={isConnected && !isNil(connector)}>
        <ConnectorActions />
      </WillRender>
    </div>
  );
};

export default Waypoint;
