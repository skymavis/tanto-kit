import { Button, User } from '@nextui-org/react';
import { RoninWalletConnector } from '@sky-mavis/tanto-kit-connect';
import { ethers } from 'ethers';
import React, { FC } from 'react';

import WillRender from './WillRender';

const RoninWalletConnect: FC = () => {
  const [account, setAccount] = React.useState<string | null>(null);
  const [chainId, setChainId] = React.useState<number | null>(null);
  const roninWalletConnector = new RoninWalletConnector();

  const handleConnectWallet = () => {
    roninWalletConnector
      .connect()
      .then(res => {
        res?.account && setAccount(res?.account);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleDisconnectWallet = () => {
    roninWalletConnector
      .disconnect()
      .then(() => {
        setAccount(null);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const signMessage = async () => {
    const provider = await roninWalletConnector.getProvider();
    if (!provider) return;
    const web3Provider = new ethers.providers.Web3Provider(provider as ethers.providers.ExternalProvider);
    const signer = web3Provider.getSigner();
    const message = 'Hello Ronin Wallet!';
    const signature = await signer.signMessage(message);
    alert(signature);
  };

  const getChainId = async () => {
    const chainId = await roninWalletConnector.getChainId();
    chainId && setChainId(chainId);
  };

  return (
    <div className={'w-60 flex-col flex mx-auto items-center gap-4'}>
      <WillRender when={!account}>
        <Button color="primary" onClick={handleConnectWallet}>
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
          <Button color="danger" onClick={handleDisconnectWallet}>
            Disconnect
          </Button>
        </div>
      </WillRender>
    </div>
  );
};

export default RoninWalletConnect;
