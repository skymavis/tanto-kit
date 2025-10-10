import { Button, User } from '@nextui-org/react';
import { TantoConnectButton, TantoEmbeddedWidget, useAuthEffect } from '@sky-mavis/tanto-widget';
import { useState } from 'react';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

import WillRender from '../will-render/WillRender';

export const WalletAccount = () => {
  const { address, chainId, isConnected, connector } = useAccount();
  const { signMessage } = useSignMessage();
  const { disconnect } = useDisconnect();
  const [show, setShow] = useState(false);

  useAuthEffect({
    onSuccess: data => {
      console.log('onSuccess', data);
    },
    onError: error => {
      console.log('onError', error);
    },
  });

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
        <Button
          onClick={async () => {
            signMessage(
              { message: 'Hello Ronin Wallet!' },
              {
                onSuccess: data => {
                  alert(JSON.stringify(data, null, 2));
                },
                onError: error => {
                  alert(JSON.stringify(error, null, 2));
                },
              },
            );
          }}
        >
          Sign Message
        </Button>
        <Button onClick={() => disconnect()}>Disconnect</Button>
      </WillRender>
    </div>
  );
};
