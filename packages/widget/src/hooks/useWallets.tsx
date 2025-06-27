import styled from '@emotion/styled';
import { useMemo } from 'react';
import { Connector, CreateConnectorFn, useConnectors } from 'wagmi';

import { walletConfigs } from '../configs/walletConfigs';
import { WALLET_IDS } from '../constants';
import { Wallet } from '../types/wallet';
import { notEmpty } from '../utils/common';
import { isDesktop, isMobile } from '../utils/userAgent';
import {
  isCoinbaseConnector,
  isInjectedConnector,
  isRoninExtensionInstalled,
  isRoninInAppBrowser,
  isSafeConnector,
  isWaypointConnector,
  isWCConnector,
} from '../utils/walletDetection';
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

const getWalletInstallationStatus = (
  connector: Connector<CreateConnectorFn>,
  connectors: readonly Connector<CreateConnectorFn>[],
) => {
  const { id, type } = connector;
  if (id === WALLET_IDS.RONIN_WALLET) return isRoninExtensionInstalled(connectors);
  return (
    isSafeConnector(id) ||
    isCoinbaseConnector(id) ||
    isWaypointConnector(id) ||
    isWCConnector(id) ||
    isInjectedConnector(type)
  );
};

const createBaseWallet = (
  connector: Connector<CreateConnectorFn>,
  connectors: readonly Connector<CreateConnectorFn>[],
): Wallet => ({
  id: connector.id,
  name: connector.name ?? connector.id ?? connector.type,
  icon: connector.icon ? <WalletIcon src={connector.icon} alt={connector.name} /> : undefined,
  isInstalled: getWalletInstallationStatus(connector, connectors),
  connector,
});

const createWalletWithConfig = (baseWallet: Wallet): Wallet => {
  const walletConfig = walletConfigs[baseWallet.id];
  return walletConfig ? { ...baseWallet, ...walletConfig } : baseWallet;
};

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
    () => connectors.map(connector => createBaseWallet(connector, connectors)).map(createWalletWithConfig),
    [connectors],
  );

  const walletsByType = useMemo(() => {
    const walletMap = new Map(wallets.map(wallet => [wallet.id, wallet]));
    const safeWallet = isSafe ? walletMap.get(WALLET_IDS.SAFE) : null;
    const waypointWallet = walletMap.get(WALLET_IDS.WAYPOINT);
    const coinbaseWallet = walletMap.get(WALLET_IDS.COINBASE_WALLET);
    const wcWallet = walletMap.get(WALLET_IDS.WALLET_CONNECT);
    const roninExtensionWallet =
      walletMap.get(WALLET_IDS.RONIN_WALLET) ?? walletMap.get(WALLET_IDS.RONIN_WALLET_INJECTED);

    const injectedWallets = wallets.filter(
      wallet =>
        isInjectedConnector(wallet.connector?.type) &&
        wallet.id !== WALLET_IDS.RONIN_WALLET &&
        wallet.id !== WALLET_IDS.RONIN_WALLET_INJECTED,
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
      coinbaseWallet,
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
    const { injectedWallets, wcWallet, safeWallet, coinbaseWallet } = walletsByType;
    if (!deviceInfo.isDesktop) return [coinbaseWallet, safeWallet].filter(notEmpty);
    const filteredWallets = [wcWallet, safeWallet, coinbaseWallet, ...injectedWallets].filter(notEmpty);
    // Move WalletConnect to top
    const wcWallets = filteredWallets.filter(wallet => isWCConnector(wallet.id));
    const otherWallets = filteredWallets.filter(wallet => !isWCConnector(wallet.id));
    return [...wcWallets, ...otherWallets];
  }, [walletsByType, deviceInfo]);

  return useMemo(
    () => ({
      wallets: [...primaryWallets, ...secondaryWallets],
      primaryWallets,
      secondaryWallets,
    }),
    [primaryWallets, secondaryWallets],
  );
}
