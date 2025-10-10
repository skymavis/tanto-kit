import { createConnector } from '@wagmi/core';
import { ronin, saigon } from 'viem/chains';

import { headlessInjector } from './headlessInjector';
import { HeadlessProvider } from './HeadlessProvider';

interface headlessConnectorOptions {
  chainId?: number;
}

export function headlessConnector(options: headlessConnectorOptions) {
  const chain = options.chainId === saigon.id ? saigon : ronin;
  headlessInjector.resolve('headlessConfig').chain = chain;
  const provider = headlessInjector.resolve('headlessProvider');

  return createConnector<HeadlessProvider>(config => {
    return {
      icon: '',
      id: 'RONIN_WALLET_HEADLESS',
      name: 'Ronin Wallet Headless',
      type: 'keyless',
      getProvider: async () => provider,
      getAccounts: async () => provider.getAccounts(),
      getChainId: async () => provider.getChainId(),
      connect: async () => {
        const { address } = await provider.connect();
        config.emitter.emit('connect', { accounts: [address], chainId: provider.getChainId() });
        return {
          accounts: [address],
          chainId: provider.getChainId(),
        };
      },
      isAuthorized: async () => provider.isSignable(),
      disconnect: async () => provider.disconnect(),

      // TODO
      onAccountsChanged: () => {},
      onChainChanged: () => {},
      onDisconnect: () => {},
    };
  });
}
