import styled from '@emotion/styled';
import { useMemo } from 'react';
import { useConnectors } from 'wagmi';

import { walletConfigs } from '../configs/walletConfigs';
import { Wallet } from '../types/wallet';
import {
  isDesktop,
  isInjectedConnector,
  isMobile,
  isRoninExtensionInstalled,
  isRoninInAppBrowser,
  isSafeConnector,
  isWaypointConnector,
  isWCConnector,
  notEmpty,
} from '../utils';
import { useIsSafeWallet } from './useIsSafeWallet';

const WalletIcon = styled.img({
  width: 32,
  height: 32,
  borderRadius: 8,
  objectFit: 'contain',
});

interface UseWalletsResult {
  wallets: Wallet[];
  primaryWallets: Wallet[];
  secondaryWallets: Wallet[];
}

export function useWallets(): UseWalletsResult {
  const connectors = useConnectors();
  const { isSafe } = useIsSafeWallet();
  const deviceInfo = useMemo(
    () => ({
      isMobile: isMobile(),
      isDesktop: isDesktop(),
      isRoninInAppBrowser: isRoninInAppBrowser(),
    }),
    [],
  );

  const wallets = useMemo(
    () =>
      connectors.map(connector => {
        const baseWallet: Wallet = {
          id: connector.id,
          name: connector.name ?? connector.id ?? connector.type,
          icon: connector.icon ? <WalletIcon src={connector.icon} alt={connector.name} /> : undefined,
          isInstalled:
            (connector.id === 'RONIN_WALLET' && isRoninExtensionInstalled(connectors)) ||
            isSafeConnector(connector.id) ||
            isWaypointConnector(connector.id) ||
            isWCConnector(connector.id) ||
            isInjectedConnector(connector.type),
          connector,
        };

        const walletConfig = walletConfigs[connector.id];
        if (!walletConfig) return baseWallet;

        return {
          ...baseWallet,
          ...walletConfig,
        };
      }),
    [connectors],
  );

  const walletsByType = useMemo(() => {
    const walletMap = new Map(wallets.map(wallet => [wallet.id, wallet]));
    const safeWallet = isSafe ? walletMap.get('safe') : null;
    const waypointWallet = walletMap.get('WAYPOINT');
    const wcWallet = walletMap.get('walletConnect');
    const roninExtensionWallet = walletMap.get('RONIN_WALLET') ?? walletMap.get('com.roninchain.wallet');
    const injectedWallets = wallets.filter(
      wallet =>
        isInjectedConnector(wallet.connector?.type) && !['RONIN_WALLET', 'com.roninchain.wallet'].includes(wallet.id),
    );

    const roninMobileWallet = wcWallet && {
      ...wcWallet,
      ...walletConfigs.CUSTOM_RONIN_MOBILE_WALLET,
      isInstalled: true,
    };

    const roninInAppBrowserWallet = roninExtensionWallet && {
      ...roninExtensionWallet,
      ...walletConfigs.CUSTOM_RONIN_IN_APP_WALLET,
      isInstalled: true,
    };

    return {
      waypointWallet,
      roninExtensionWallet,
      roninMobileWallet,
      roninInAppBrowserWallet,
      injectedWallets,
      wcWallet,
      safeWallet,
    };
  }, [wallets, isSafe]);

  const primaryWallets = useMemo(() => {
    const { waypointWallet, roninExtensionWallet, roninMobileWallet, roninInAppBrowserWallet } = walletsByType;
    if (deviceInfo.isDesktop) return [waypointWallet, roninExtensionWallet].filter(notEmpty);
    if (deviceInfo.isMobile && !deviceInfo.isRoninInAppBrowser)
      return [waypointWallet, roninMobileWallet].filter(notEmpty);
    if (deviceInfo.isRoninInAppBrowser) return [roninInAppBrowserWallet].filter(notEmpty);
    return [];
  }, [walletsByType, deviceInfo]);

  const secondaryWallets = useMemo(() => {
    const { injectedWallets, wcWallet, safeWallet } = walletsByType;
    if (!deviceInfo.isDesktop) return [safeWallet].filter(notEmpty);
    const filteredWallets = [wcWallet, safeWallet, ...injectedWallets].filter(notEmpty);
    // Move WalletConnect to top
    return filteredWallets.sort(wallet => (isWCConnector(wallet.id) ? -1 : 1));
  }, [walletsByType, deviceInfo]);

  return {
    wallets: [...primaryWallets, ...secondaryWallets],
    primaryWallets,
    secondaryWallets,
  };
}
