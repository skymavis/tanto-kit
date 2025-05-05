import { Button, User } from '@nextui-org/react';
import { getDefaultConfig, TantoConnectButton, TantoProvider } from '@sky-mavis/tanto-widget';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { useAccount, useSignMessage, WagmiProvider } from 'wagmi';

import WillRender from '../../components/will-render/WillRender';

const config = getDefaultConfig();

const queryClient = new QueryClient();
const WagmiExample: FC = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TantoProvider theme="dark">
          <Account />
        </TantoProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

const Account = () => {
  const { address, chainId, isConnected, connector } = useAccount();
  const { signMessage } = useSignMessage();
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <div className={'w-full min-h-screen flex items-center flex-col gap-4 p-10'}>
      {/* <TantoWidget container={container} /> */}
      <div ref={setContainer} />
      <TantoConnectButton />
      <WillRender when={isConnected}>
        <User name={connector?.name} description={address} />
        <p>ChainId: {chainId}</p>
        <Button onClick={() => signMessage({ message: 'Hello Ronin Wallet!' })}>Sign Message</Button>
      </WillRender>
    </div>
  );
};

export default WagmiExample;
