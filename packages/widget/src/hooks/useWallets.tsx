import styled from '@emotion/styled';
import { useConnectors } from 'wagmi';

import { roninMobileCustomLogoUri } from '../assets/data-uris';
import { walletConfigs } from '../configs/walletConfigs';
import { Wallet } from '../types/wallet';
import {
  generateInAppBrowserLink,
  isClient,
  isMobile,
  isRoninExtensionInstalled,
  isRoninWallet,
  notEmpty,
} from '../utils';

const WalletIcon = styled('img', {
  shouldForwardProp: propName => propName !== 'size',
})<{ size: number }>(({ size }) => ({
  width: size,
  height: size,
  borderRadius: 8,
  objectFit: 'contain',
}));

const createWalletIcon = (src: string, alt: string, size = 32) => <WalletIcon src={src} alt={alt} size={size} />;

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
    const walletId = Object.keys(walletConfigs).find(id => id.split(', ').includes(connector.id));
    const baseWallet: Wallet = {
      id: connector.id,
      name: connector.name ?? connector.id ?? connector.type,
      icon: connector.icon ? createWalletIcon(connector.icon, connector.name) : undefined,
      isInstalled:
        (connector.id === 'RONIN_WALLET' && isRoninExtensionInstalled(connectors)) ||
        connector.id === 'WAYPOINT' ||
        connector.id === 'walletConnect' ||
        connector.type === 'injected',
      connector,
    };

    if (!walletId) return baseWallet;

    const walletOverrides = walletConfigs[walletId];
    if (!walletOverrides) return baseWallet;

    return {
      ...baseWallet,
      ...walletOverrides,
      ...(typeof walletOverrides.icon === 'string'
        ? { icon: createWalletIcon(walletOverrides.icon, connector.name) }
        : {}),
    };
  });

  const walletMap = new Map(wallets.map(wallet => [wallet.id, wallet]));

  const waypointWallet = walletMap.get('WAYPOINT');
  const roninExtensionWallet = walletMap.get('RONIN_WALLET') ?? walletMap.get('com.roninchain.wallet');
  const wcWallet = walletMap.get('walletConnect');
  const injectedWallets = wallets.filter(
    wallet => wallet.connector?.type === 'injected' && !['RONIN_WALLET', 'com.roninchain.wallet'].includes(wallet.id),
  );

  const roninNavigateToInApp: Wallet = {
    id: 'custom::ronin-open-in-app',
    name: 'Ronin Wallet',
    descriptionOnList: 'Sign in with the app',
    isInstalled: true,
    connector: null,
    icon: createWalletIcon(roninMobileCustomLogoUri, 'Ronin Wallet', 38),
    alternativeConnectAction: () => {
      if (isClient()) {
        window.open(generateInAppBrowserLink('https://wallet.roninchain.com/app'), '_self');
      }
    },
  };

  const inAppWallet = roninExtensionWallet
    ? {
        ...roninExtensionWallet,
        id: 'custom::ronin-in-app',
        name: 'Ronin Wallet',
        descriptionOnList: 'Sign in with the app',
        isInstalled: true,
        icon: createWalletIcon(roninMobileCustomLogoUri, 'Ronin Wallet', 38),
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
