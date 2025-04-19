import { useConnectors } from 'wagmi';

import { walletConfigs } from '../configs/walletConfigs';
import { Wallet } from '../types/wallet';
import { generateInAppBrowserLink, isClient, isMobile, isRoninWallet, notEmpty } from '../utils';

export function useWallets(): {
  wallets: Wallet[];
  primaryWallets: Wallet[];
  secondaryWallets: Wallet[];
} {
  const connectors = useConnectors();
  const isMobileDevice = isMobile();
  const isDesktopDevice = !isMobileDevice;
  const isInApp = isRoninWallet();

  const wallets = connectors.map((connector): Wallet => {
    const walletId = Object.keys(walletConfigs).find(id => id.split(', ').indexOf(connector.id) !== -1);
    const wallet: Wallet = {
      id: connector.id,
      name: connector.name ?? connector.id ?? connector.type,
      icon: connector.icon ? (
        <img
          src={connector.icon}
          alt={connector.name}
          css={{
            width: 32,
            height: 32,
            borderRadius: 8,
            objectFit: 'contain',
          }}
        />
      ) : undefined,
      connector,
    };
    if (walletId) {
      const walletOverrides = walletConfigs[walletId];
      if (walletOverrides) {
        return {
          ...wallet,
          ...walletOverrides,
        };
      }
    }
    return wallet;
  });

  const walletMap = new Map(wallets.map(wallet => [wallet.id, wallet]));

  const waypointWallet = walletMap.get('WAYPOINT');
  const roninExtensionWallet = walletMap.get('RONIN_WALLET') ?? walletMap.get('com.roninchain.wallet');
  const wcWallet = walletMap.get('walletConnect');
  const injectedWallets = wallets.filter(
    wallet =>
      wallet.connector?.type === 'injected' && wallet.id !== 'RONIN_WALLET' && wallet.id !== 'com.roninchain.wallet',
  );
  const roninNavigateToInApp: Wallet = {
    id: 'ronin-navigate-to-in-app',
    name: 'Ronin Wallet',
    icon: <div>icon</div>,
    connector: null,
    alternativeConnectAction: () => {
      if (isClient()) window.open(generateInAppBrowserLink(`https://wallet.roninchain.com/app`), '_self');
    },
  };
  const inAppWallet = roninExtensionWallet
    ? {
        ...roninExtensionWallet,
        id: 'ronin-in-app',
        name: 'Ronin Wallet',
        icon: <div>icon</div>,
      }
    : null;

  const primaryWallets = ((): Wallet[] => {
    if (isDesktopDevice) return [waypointWallet, roninExtensionWallet].filter(notEmpty);
    if (isMobileDevice && !isInApp) return [waypointWallet, roninNavigateToInApp].filter(notEmpty);
    if (isInApp) return [inAppWallet].filter(notEmpty);
    return [];
  })();

  const secondaryWallets = ((): Wallet[] => {
    const wallets = isDesktopDevice ? [wcWallet, ...injectedWallets].filter(notEmpty) : [];
    return wallets.sort(a => (a.id === 'walletConnect' ? -1 : 1));
  })();

  return {
    wallets: [...primaryWallets, ...secondaryWallets],
    primaryWallets,
    secondaryWallets,
  };
}
