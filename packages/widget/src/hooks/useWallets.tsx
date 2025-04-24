import styled from '@emotion/styled';
import { useConnectors } from 'wagmi';

import { RoninExtensionCustomSquareLogo } from '../assets/RoninExtensionCustomSquareLogo';
import { RoninMobileCustomLogo } from '../assets/RoninMobileCustomLogo';
import { RoninMobileCustomSquareLogo } from '../assets/RoninMobileCustomSquareLogo';
import { walletConfigs } from '../configs/walletConfigs';
import { Wallet } from '../types/wallet';
import {
  isDesktop,
  isInjectedConnector,
  isMobile,
  isRoninExtensionInstalled,
  isRoninWallet,
  isWCConnector,
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

interface UseConnectReturnType {
  wallets: Wallet[];
  primaryWallets: Wallet[];
  secondaryWallets: Wallet[];
}

export function useWallets(): UseConnectReturnType {
  const connectors = useConnectors();
  const isMobileDevice = isMobile();
  const isDesktopDevice = isDesktop();
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
        isWCConnector(connector.id) ||
        isInjectedConnector(connector.type),
      connector,
    };

    if (!walletId || !walletConfigs[walletId]) return baseWallet;

    const walletOverrides = walletConfigs[walletId];
    return {
      ...baseWallet,
      ...walletOverrides,
      icon: walletOverrides.icon
        ? typeof walletOverrides.icon === 'string'
          ? createWalletIcon(walletOverrides.icon, connector.name)
          : walletOverrides.icon
        : baseWallet.icon,
    };
  });

  const walletMap = new Map(wallets.map(wallet => [wallet.id, wallet]));
  const waypointWallet = walletMap.get('WAYPOINT');
  const wcWallet = walletMap.get('walletConnect');
  const roninExtensionWallet = walletMap.get('RONIN_WALLET') ?? walletMap.get('com.roninchain.wallet');
  const injectedWallets = wallets.filter(
    wallet =>
      isInjectedConnector(wallet.connector?.type) && !['RONIN_WALLET', 'com.roninchain.wallet'].includes(wallet.id),
  );

  const roninMobileWallet = wcWallet
    ? {
        ...wcWallet,
        name: 'Ronin Wallet Mobile',
        descriptionOnList: 'Sign in with the app',
        isInstalled: true,
        icon: <RoninMobileCustomSquareLogo />,
        iconOnList: <RoninMobileCustomLogo />,
      }
    : undefined;

  const inAppWallet = roninExtensionWallet
    ? {
        ...roninExtensionWallet,
        name: 'Ronin Wallet Mobile',
        descriptionOnList: 'Sign in with the app',
        isInstalled: true,
        icon: <RoninExtensionCustomSquareLogo />,
        iconOnList: <RoninMobileCustomLogo />,
      }
    : undefined;

  const primaryWallets = (() => {
    if (isDesktopDevice) return [waypointWallet, roninExtensionWallet].filter(notEmpty);
    if (isMobileDevice && !isInApp) return [waypointWallet, roninMobileWallet].filter(notEmpty);
    if (isInApp) return [inAppWallet].filter(notEmpty);
    return [];
  })();

  const secondaryWallets = (() => {
    const filteredWallets = isDesktopDevice ? [wcWallet, ...injectedWallets].filter(notEmpty) : [];
    return filteredWallets.sort(wallet => (isWCConnector(wallet.id) ? -1 : 1));
  })();

  return {
    wallets: [...primaryWallets, ...secondaryWallets],
    primaryWallets,
    secondaryWallets,
  };
}
