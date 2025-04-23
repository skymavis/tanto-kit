import { roninWallet, waypoint } from '@sky-mavis/tanto-wagmi';
import { ronin, saigon } from 'viem/chains';
import { Config, createConfig, http } from 'wagmi';
import { walletConnect } from 'wagmi/connectors';

import { WEB_WALLET_LINK } from './constants';

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
        waypointOrigin: 'https://id.skymavis.one',
        clientId: 'dbe1e3ff-e145-422f-84c4-e0beb4972f69',
        chainId: 2021,
      }),
      walletConnect({
        showQrModal: false,
        projectId: 'd2ef97836db7eb390bcb2c1e9847ecdc',
        metadata: {
          name: 'Ronin Wallet',
          description: 'Your passport into a digital nation',
          icons: ['https://cdn.skymavis.com/wallet/web-app/logo/ronin.png'],
          url: WEB_WALLET_LINK,
        },
      }),
    ],
    multiInjectedProviderDiscovery: true,
    ssr: true,
  });
};
