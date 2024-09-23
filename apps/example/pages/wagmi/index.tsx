import { Button, User } from '@nextui-org/react';
import { roninWallet, waypoint } from '@sky-mavis/tanto-wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { FC } from 'react';
import { ronin, saigon } from 'viem/chains';
import {
  Connector,
  createConfig,
  http,
  useAccount,
  useConnect,
  useDisconnect,
  useSignMessage,
  WagmiProvider,
} from 'wagmi';

import WillRender from '../../components/will-render/WillRender';

const config = createConfig({
  chains: [ronin, saigon],
  transports: {
    [ronin.id]: http(),
    [saigon.id]: http(),
  },
  connectors: [roninWallet(), waypoint()],
  multiInjectedProviderDiscovery: false,
  ssr: true,
});

const queryClient = new QueryClient();

const WagmiExample: FC = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Account />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

const Account = () => {
  const { address, chainId, isConnected, connector } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessage } = useSignMessage();

  const handleClickConnector = (connector: Connector) => {
    if (isConnected) {
      disconnect();
    } else {
      connect({ connector });
    }
  };

  return (
    <div className={'w-full min-h-screen flex items-center flex-col gap-4 p-10'}>
      <User name={connector?.name} description={address} />
      <p>ChainId: {chainId}</p>
      {connectors.map(connector => (
        <Button onClick={() => handleClickConnector(connector)} key={connector.id}>
          {isConnected ? 'Disconnect' : 'Connect'} to {connector.name}
        </Button>
      ))}
      <WillRender when={isConnected}>
        <Button onClick={() => signMessage({ message: 'Hello Ronin Wallet!' })}>Sign Message</Button>
      </WillRender>
    </div>
  );
};

export default WagmiExample;
