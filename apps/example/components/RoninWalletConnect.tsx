import { Button, User } from '@nextui-org/react';
import { EIP1193Event, RoninWalletConnector } from '@sky-mavis/tanto-connect/src';
import { ethers } from 'ethers';
import React, { FC, useEffect } from 'react';

import WillRender from './will-render/WillRender';

const roninConnector = new RoninWalletConnector();
const RoninWalletConnect: FC = () => {
  const [account, setAccount] = React.useState<string | null>(null);
  const [chainId, setChainId] = React.useState<number | null>(null);

  const connectWallet = () => {
    roninConnector
      .connect()
      .then(res => res?.account && setAccount(res?.account))
      .catch(console.error);
  };

  const disconnectWallet = () => {
    roninConnector
      .disconnect()
      .then(() => setAccount(null))
      .catch(console.error);
  };

  const signMessage = async () => {
    const provider = await roninConnector.getProvider();
    if (!provider) return;
    const web3Provider = new ethers.providers.Web3Provider(provider as ethers.providers.ExternalProvider);
    const signer = web3Provider.getSigner();
    const message = 'Hello Ronin Wallet!';
    const signature = await signer.signMessage(message);
    alert(signature);
  };

  const getChainId = async () => {
    const chainId = await roninConnector.getChainId();
    chainId && setChainId(chainId);
  };

  useEffect(() => {
    roninConnector.on(EIP1193Event.CONNECT, () =>
      roninConnector
        .getAccounts()
        .then(accounts => setAccount(accounts[0]))
        .catch(console.error),
    );
    roninConnector.on(EIP1193Event.DISCONNECT, () => setAccount(null));
    roninConnector.on(
      EIP1193Event.ACCOUNTS_CHANGED,
      accounts =>
        accounts.length > 0 &&
        roninConnector
          .getAccounts()
          .then(accounts => setAccount(accounts[0]))
          .catch(console.error),
    );
    roninConnector.on(EIP1193Event.CHAIN_CHANGED, chainId => setChainId(Number(chainId)));
  }, []);

  return (
    <div className={'w-60 flex-col flex mx-auto items-center gap-4'}>
      <WillRender when={!account}>
        <Button color="primary" onClick={connectWallet}>
          Connect To Ronin Wallet
        </Button>
      </WillRender>
      <WillRender when={!!account}>
        <User name="Your Address" description={account} />
        <div className={'flex gap-6'}>
          <Button color="primary" onClick={signMessage}>
            Sign Message
          </Button>
          <Button color="primary" onClick={getChainId}>
            {chainId ? `Chain Id: ${chainId}` : 'Get ChainId'}
          </Button>
          <Button color="danger" onClick={disconnectWallet}>
            Disconnect
          </Button>
        </div>
      </WillRender>
    </div>
  );
};

export default RoninWalletConnect;
