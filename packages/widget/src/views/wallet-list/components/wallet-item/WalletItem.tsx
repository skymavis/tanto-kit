import { useCallback } from 'react';

import { analytic } from '../../../../analytic';
import { Box } from '../../../../components/box/Box';
import { useWidgetConnect } from '../../../../contexts/widget-connect/useWidgetConnect';
import { useWidgetRouter } from '../../../../contexts/widget-router/useWidgetRouter';
import { Route } from '../../../../types/route';
import { Wallet } from '../../../../types/wallet';
import { useWalletState } from './useWalletState';
import { Container, RoninBadge, WalletDescription, WalletLogoWrapper, WalletName } from './WalletItem.styles';
import { WalletItemBadge } from './WalletItemBadge';

interface WalletItemProps {
  wallet: Wallet;
}

export const WalletItem = function WalletItem({ wallet }: WalletItemProps) {
  const { id, name, displayOptions = {}, isInstalled, homepage, connector } = wallet;
  const { showRoninBadge, description } = displayOptions;
  const { setSelectedWallet } = useWidgetConnect();
  const { goTo } = useWidgetRouter();
  const walletState = useWalletState(wallet);

  const navigateToWallet = useCallback(() => {
    if (!isInstalled) {
      window.open(homepage, '_blank', 'noopener,noreferrer');
      return;
    }

    if (walletState.isMarkedConnected) return;

    setSelectedWallet(wallet);

    analytic.sendEvent('wallet_open', {
      wallet_id: id,
      is_extension_detected: walletState.isInjected,
      wallet_type: name,
      chain_id: connector?.chainId,
    });

    const route = walletState.isWCWallet ? Route.CONNECT_WC : Route.CONNECT_INJECTOR;
    goTo(route, { title: name });
  }, [
    isInstalled,
    homepage,
    walletState.isMarkedConnected,
    setSelectedWallet,
    wallet,
    id,
    walletState.isWCWallet,
    walletState.isInjected,
    name,
    connector?.chainId,
    goTo,
  ]);

  return (
    <Container
      role="button"
      highlight={displayOptions.highlightBackground}
      disabled={walletState.isMarkedConnected}
      onClick={navigateToWallet}
    >
      {walletState.walletLogo && (
        <WalletLogoWrapper>
          {walletState.walletLogo}
          {showRoninBadge && <RoninBadge className="ronin-badge" />}
        </WalletLogoWrapper>
      )}
      <Box vertical flex={1}>
        <WalletName disabled={walletState.isMarkedConnected}>{name}</WalletName>
        <WalletDescription>{description}</WalletDescription>
      </Box>
      <WalletItemBadge
        isConnected={walletState.isMarkedConnected}
        isDetected={walletState.isInjected}
        highlightText={walletState.highlightContent}
      />
    </Container>
  );
};
