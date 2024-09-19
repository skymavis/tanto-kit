import { Button } from '@nextui-org/react';
import { ConnectorEvent, IConnectResult, requestRoninWalletConnector } from '@sky-mavis/tanto-connect';
import { isNil } from 'lodash';
import React, { FC, useEffect } from 'react';

import { useConnectorStore } from '../../../hooks/useConnectorStore';
import WillRender from '../../will-render/WillRender';
import ConnectorActions from '../connector-actions/ConnectorActions';

const RoninWallet: FC = () => {
  const { connector, setConnector, isConnected, setIsConnected, setAccount, setChainId } = useConnectorStore();
  const [connecting, setConnecting] = React.useState<boolean>(false);

  const connectWallet = () => {
    setConnecting(true);
    connector
      ?.connect()
      .then(({ account }) => !isNil(account) && setIsConnected(true))
      .catch(console.error)
      .finally(() => setConnecting(false));
  };

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

  useEffect(() => {
    setIsConnected(false);
    requestRoninWalletConnector().then(connector => {
      setConnector(connector);
      connector.on(ConnectorEvent.CONNECT, onConnect);
      connector.on(ConnectorEvent.ACCOUNTS_CHANGED, onAccountChange);
      connector.on(ConnectorEvent.CHAIN_CHANGED, chainId => setChainId(chainId));
      connector.on(ConnectorEvent.DISCONNECT, () => setIsConnected(false));
      connector.autoConnect();
    });
  }, []);

  return (
    <div className={'w-full flex flex-col justify-center gap-6'}>
      <WillRender when={!isConnected}>
        <Button onClick={connectWallet} isLoading={connecting} size={'lg'}>
          <img src={'https://cdn.skymavis.com/wallet/logo.png'} height={20} width={20} />
          Connect to Ronin Wallet!
        </Button>
      </WillRender>
      <WillRender when={isConnected}>
        <ConnectorActions />
      </WillRender>
    </div>
  );
};

export default RoninWallet;
