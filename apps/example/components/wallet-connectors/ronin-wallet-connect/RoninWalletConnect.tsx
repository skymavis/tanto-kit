import { Spinner } from '@nextui-org/react';
import { ConnectorEvent, IConnectResult, requestRoninWalletConnectConnector } from '@sky-mavis/tanto-connect';
import { isNil } from 'lodash';
import { QRCodeSVG } from 'qrcode.react';
import React, { FC, useEffect } from 'react';

import { useConnectorStore } from '../../../hooks/useConnectorStore';
import WillRender from '../../will-render/WillRender';
import ConnectorActions from '../connector-actions/ConnectorActions';

const wcOptions = {
  projectId: 'd2ef97836db7eb390bcb2c1e9847ecdc',
  metadata: {
    name: 'Ronin Wallet',
    description: 'Ronin Wallet Example',
    icons: ['https://cdn.skymavis.com/explorer-cdn/asset/favicon/apple-touch-icon.png'],
    url: 'https://wallet.roninchain.com',
  },
};

const RoninWalletConnect: FC = () => {
  const { setConnector, setIsConnected, isConnected, setChainId, setAccount } = useConnectorStore();
  const [uri, setUri] = React.useState<string | null>(null);

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
    requestRoninWalletConnectConnector(wcOptions).then(connector => {
      setConnector(connector);
      connector.on(ConnectorEvent.CONNECT, onConnect);
      connector.on(ConnectorEvent.ACCOUNTS_CHANGED, onAccountChange);
      connector.on(ConnectorEvent.CHAIN_CHANGED, chainId => setChainId(chainId));
      connector.on(ConnectorEvent.DISPLAY_URI, uri => setUri(uri));
      connector.on(ConnectorEvent.DISCONNECT, async () => {
        setUri(null);
        setIsConnected(false);
        connector.connect(2021);
      });
      connector.connect(2021);
    });
  }, []);

  return (
    <div className={'flex flex-col gap-2'}>
      <WillRender when={!isConnected && isNil(uri)}>
        <Spinner label="Loading" color="default" labelColor="foreground" />
      </WillRender>
      <WillRender when={!isConnected && !isNil(uri)}>
        <div className={'w-full flex flex-col items-center gap-2 p-6'}>
          <QRCodeSVG
            value={uri as string}
            size={200}
            fgColor={'#111417'}
            imageSettings={{
              src: 'https://cdn.skymavis.com/explorer-cdn/asset/favicon/apple-touch-icon.png',
              height: 24,
              width: 24,
              excavate: true,
            }}
          />
          <p>Scan with Ronin Wallet Mobile!</p>
        </div>
      </WillRender>

      <WillRender when={isConnected}>
        <ConnectorActions />
      </WillRender>
    </div>
  );
};

export default RoninWalletConnect;
