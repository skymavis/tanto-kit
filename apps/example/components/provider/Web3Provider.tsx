import { getDefaultConfig } from '@sky-mavis/tanto-widget';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const config = getDefaultConfig({
  ssr: true,
  keylessWalletConfig: {
    clientId: 'dbe1e3ff-e145-422f-84c4-e0beb4972f69',
    waypointOrigin: 'https://id.skymavis.one',
  },
  coinbaseWalletConfig: {
    enable: true,
  },
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: React.PropsWithChildren) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
