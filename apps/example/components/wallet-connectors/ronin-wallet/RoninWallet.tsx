import { Button, User } from '@nextui-org/react';
import { IBaseConnector, RoninWalletConnector } from '@sky-mavis/tanto-connect';
import { EIP1193Event } from '@sky-mavis/tanto-connect/src';
import { isNil } from 'lodash';
import React, { FC, useEffect } from 'react';

import WillRender from '../../will-render/WillRender';

interface IPropsType {
  setConnector: (connector: IBaseConnector) => void;
}

const roninWalletConnector = new RoninWalletConnector();
const RoninWallet: FC<IPropsType> = ({ setConnector }) => {
  const [connecting, setConnecting] = React.useState<boolean>(false);
  const [account, setAccount] = React.useState<string | null>(null);
  const [chainId, setChainId] = React.useState<number | null>(null);

  const connectWallet = () => {
    setConnecting(true);
    roninWalletConnector
      .connect()
      .then(res => res?.account && setAccount(res?.account))
      .catch(console.error)
      .finally(() => setConnecting(false));
  };

  const disconnectWallet = () => {
    roninWalletConnector
      .disconnect()
      .then(() => setAccount(null))
      .catch(console.error);
  };

  const fetchChainId = () => {
    roninWalletConnector
      .getChainId()
      .then(chainId => setChainId(chainId))
      .catch(console.error);
  };

  useEffect(() => {
    roninWalletConnector.on(EIP1193Event.DISCONNECT, () => setAccount(null));
    roninWalletConnector.on(EIP1193Event.CHAIN_CHANGED, chainId => setChainId(Number(chainId)));
    roninWalletConnector.on(EIP1193Event.ACCOUNTS_CHANGED, accounts =>
      accounts.length > 0 ? setAccount(accounts[0]) : setAccount(null),
    );
    roninWalletConnector.on(EIP1193Event.CONNECT, () => {
      setConnector(roninWalletConnector);
      roninWalletConnector
        .getAccounts()
        .then(accounts => setAccount(accounts[0]))
        .catch(console.error);
    });
  }, []);

  return (
    <div className={'w-full flex flex-col justify-center gap-6'}>
      <WillRender when={isNil(account)}>
        <Button onClick={connectWallet} isLoading={connecting} size={'lg'}>
          <img src={'https://cdn.skymavis.com/wallet/logo.png'} height={20} width={20} />
          Connect to Ronin Wallet!
        </Button>
      </WillRender>
      <WillRender when={!isNil(account)}>
        <User name="Account Wallet" description={account} />
        <div className={'flex gap-6 justify-center'}>
          <Button onClick={fetchChainId} fullWidth>
            {chainId ? `Chain Id: ${chainId}` : 'Get ChainId'}
          </Button>
          <Button onClick={disconnectWallet} fullWidth color={'secondary'}>
            Disconnect
          </Button>
        </div>
      </WillRender>
    </div>
  );
};

export default RoninWallet;
