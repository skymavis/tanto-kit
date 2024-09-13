import { Button, User } from '@nextui-org/react';
import { BaseConnector } from '@sky-mavis/tanto-connect';
import { EIP1193Event } from '@sky-mavis/tanto-connect/src';
import React, { FC, useEffect } from 'react';

import { useConnectorStore } from '../../../hooks/useConnectorStore';

const ConnectorActions: FC = () => {
  const { setConnector } = useConnectorStore();
  const connector = useConnectorStore(state => state.connector) as BaseConnector;

  const [account, setAccount] = React.useState<string | null>(null);
  const [chainId, setChainId] = React.useState<number | null>(null);

  const disconnectWallet = () => {
    connector
      .disconnect()
      .then(() => {
        setAccount(null);
        setConnector(null);
      })
      .catch(console.error);
  };

  const fetchChainId = () => {
    connector
      .getChainId()
      .then(chainId => setChainId(chainId))
      .catch(console.error);
  };

  const switchToSaiGon = () => {
    connector.switchChain(2021).catch(console.error);
  };

  useEffect(() => {
    connector
      .getAccounts()
      .then(accounts => setAccount(accounts[0]))
      .catch(console.error);

    connector.on(EIP1193Event.DISCONNECT, () => {
      setAccount(null);
      setConnector(null);
    });
    connector.on(EIP1193Event.CHAIN_CHANGED, chainId => setChainId(Number(chainId)));
    connector.on(EIP1193Event.ACCOUNTS_CHANGED, accounts =>
      accounts.length > 0 ? setAccount(accounts[0]) : setAccount(null),
    );
    connector.on(EIP1193Event.CONNECT, () => {
      connector
        .getAccounts()
        .then(accounts => setAccount(accounts[0]))
        .catch(console.error);
    });

    return () => {
      connector.removeAllListeners();
    };
  }, []);

  return (
    <React.Fragment>
      <User name={connector.name} description={account} />
      <div className={'flex gap-6 justify-center'}>
        <Button onClick={fetchChainId} fullWidth>
          {chainId ? `Chain Id: ${chainId}` : 'Get ChainId'}
        </Button>
        <Button onClick={switchToSaiGon} fullWidth>
          Switch To SaiGon
        </Button>
        <Button onClick={disconnectWallet} fullWidth color={'secondary'}>
          Disconnect
        </Button>
      </div>
    </React.Fragment>
  );
};

export default ConnectorActions;
