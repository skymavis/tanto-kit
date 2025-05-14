import { Button, User } from '@nextui-org/react';
import { TantoConnectButton, TantoEmbeddedWidget } from '@sky-mavis/tanto-widget';
import { useState } from 'react';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

import WillRender from '../will-render/WillRender';

export const WalletAccount = () => {
  const { address, chainId, isConnected, connector } = useAccount();
  const { signMessage } = useSignMessage();
  const { disconnect } = useDisconnect();
  const [show, setShow] = useState(false);

  return (
    <div className={'w-full min-h-screen flex items-center flex-col gap-4 p-10'}>
      <TantoConnectButton />
      <Button onClick={() => setShow(!show)}>Show/Hide embeded</Button>
      {show && (
        <div className="w-full max-w-[500px]">
          <TantoEmbeddedWidget />
        </div>
      )}

      <WillRender when={isConnected}>
        <User name={connector?.name} description={address} />
        <p>ChainId: {chainId}</p>
        <Button onClick={() => signMessage({ message: 'Hello Ronin Wallet!' })}>Sign Message</Button>
        <Button onClick={() => disconnect()}>Disconnect</Button>
      </WillRender>
    </div>
  );
};
