import { roninWallet, waypoint } from '@sky-mavis/tanto-wagmi';
import { ronin, saigon } from 'viem/chains';
import { Config, createConfig, http } from 'wagmi';
import { walletConnect } from 'wagmi/connectors';

// TODO: Add extra configuration options
export const getDefaultConfig = (): Config => {
  // @ts-ignore
  return createConfig({
    chains: [ronin, saigon],
    transports: {
      [ronin.id]: http(),
      [saigon.id]: http(),
    },
    connectors: [
      roninWallet(),
      waypoint({
        clientId: 'c2345990-c094-4028-91e1-e24138429a59',
        chainId: 2021,
      }),
      walletConnect({
        showQrModal: false,
        projectId: 'd2ef97836db7eb390bcb2c1e9847ecdc',
        metadata: {
          name: 'Ronin Wallet',
          description: 'Your passport into a digital nation',
          icons: ['https://cdn.skymavis.com/wallet/web-app/logo/ronin.png'],
          url: 'https://wallet.roninchain.com',
        },
      }),
    ],
    multiInjectedProviderDiscovery: true,
    ssr: true,
  });
};
