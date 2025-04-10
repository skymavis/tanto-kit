import { roninWallet, waypoint } from '@sky-mavis/tanto-wagmi';
import { ronin, saigon } from 'viem/chains';
import { Config, createConfig, http } from 'wagmi';

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
        clientId: 'id',
        chainId: 2021,
      }),
    ],
    multiInjectedProviderDiscovery: false,
    ssr: true,
  });
};
