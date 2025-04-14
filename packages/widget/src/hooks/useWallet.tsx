import { useConnectors } from 'wagmi';

import { roninExtensionIds, walletCustomizations } from '../configs/walletConfigs';
import { Wallet } from '../types/wallet';

export function useWallets(): Wallet[] {
  const connectors = useConnectors();

  const wallets = connectors.map((connector): Wallet => {
    const customWalletId = Object.keys(walletCustomizations).find(id => id.split(', ').indexOf(connector.id) !== -1);
    const wallet: Wallet = {
      id: connector.id,
      name: connector.name ?? connector.id ?? connector.type,
      icon: <img src={connector.icon} alt={connector.name} width={'100%'} height={'100%'} />,
      connector,
    };
    if (customWalletId) {
      const walletOverrides = walletCustomizations[customWalletId];
      if (walletOverrides) {
        return {
          ...wallet,
          ...walletOverrides,
        };
      }
    }
    return wallet;
  });

  // Remove duplicate Ronin wallets
  const walletMap = new Map(wallets.map(wallet => [wallet.id, wallet]));
  const duplicateRoninIds = roninExtensionIds.slice(1);
  duplicateRoninIds.forEach(id => walletMap.delete(id));

  const uniqueWallets = Array.from(walletMap.values());

  return uniqueWallets;
}
