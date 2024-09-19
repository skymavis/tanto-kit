import { Button } from '@nextui-org/react';
import { ConnectorEvent, requestWaypointConnector } from '@sky-mavis/tanto-connect';
import { isNil } from 'lodash';
import React, { FC, useEffect } from 'react';

import { useConnectorStore } from '../../../hooks/useConnectorStore';
import WillRender from '../../will-render/WillRender';
import ConnectorActions from '../connector-actions/ConnectorActions';

const Waypoint: FC = () => {
  const { connector, setConnector, isConnected, setIsConnected, setAccount, setChainId } = useConnectorStore();

  const [connecting, setConnecting] = React.useState<boolean>(false);

  const connectWallet = async () => {
    connector
      ?.connect()
      .then(() => setIsConnected(true))
      .catch(console.error)
      .finally(() => setConnecting(false));
  };

  useEffect(() => {
    const waypointConnector = requestWaypointConnector({}, 2021);
    waypointConnector.autoConnect();
    setIsConnected(false);
    setConnector(waypointConnector);
    waypointConnector.on(ConnectorEvent.CONNECT, payload => {
      setIsConnected(true);
      setAccount(payload.account);
      setChainId(payload.chainId);
    });
    waypointConnector.on(ConnectorEvent.CHAIN_CHANGED, chainId => setChainId(chainId));
    waypointConnector.on(ConnectorEvent.DISCONNECT, () => setIsConnected(false));
  }, []);

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
