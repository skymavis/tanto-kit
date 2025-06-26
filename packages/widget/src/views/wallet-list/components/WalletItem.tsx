import styled from '@emotion/styled';
import { useCallback, useMemo } from 'react';

import { analytic } from '../../../analytic';
import { highlightedWalletItemBackgroundUri } from '../../../assets/data-uris';
import { RoninBadge as RoninBadgeSvg } from '../../../assets/RoninBadge';
import { Badge } from '../../../components/badge/Badge';
import { Box } from '../../../components/box/Box';
import { WALLET_ITEM_HEIGHT } from '../../../constants';
import { useIsMobileView } from '../../../hooks/useIsMobileView';
import { useWidgetConnect } from '../../../hooks/useWidgetConnect';
import { useWidgetRouter } from '../../../hooks/useWidgetRouter';
import { useWidgetUIConfig } from '../../../hooks/useWidgetUIConfig';
import { Route } from '../../../types/route';
import { Wallet } from '../../../types/wallet';
import { isInjectedConnector, isWaypointConnector, isWCConnector } from '../../../utils';

interface WalletItemProps {
  wallet: Wallet;
}

const Container = styled.div<{
  highlight?: boolean;
  disabled?: boolean;
}>(
  {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    minHeight: WALLET_ITEM_HEIGHT,
    gap: 12,
    padding: 16,
    cursor: 'pointer',
    outline: 'none',
    transition: 'background 100ms ease',
  },
  ({ theme }) => ({
    backgroundColor: theme.listItemBackground,
    '&:hover': {
      backgroundColor: theme.listItemHoverBackground,
    },
  }),
  ({ disabled, highlight, theme }) => {
    if (disabled)
      return {
        pointerEvents: 'none',
        backgroundColor: 'rgba(205, 213, 229, 0.03)',
      };
    if (highlight)
      return {
        backgroundColor: 'unset',
        backgroundImage: `url("${
          theme.mode === 'dark' ? highlightedWalletItemBackgroundUri.dark : highlightedWalletItemBackgroundUri.light
        }")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '&:hover': {
          backgroundColor: 'unset',
          backgroundImage: `url("${
            theme.mode === 'dark'
              ? highlightedWalletItemBackgroundUri.darkHover
              : highlightedWalletItemBackgroundUri.lightHover
          }")`,
        },
      };
  },
);

const WalletName = styled.p<{ disabled?: boolean }>(
  {
    fontSize: '1em',
    lineHeight: '1.25em',
    margin: 0,
  },
  ({ disabled, theme }) => disabled && { color: theme.mutedText },
);

const WalletDescription = styled.p(({ theme }) => ({
  fontSize: '0.75em',
  lineHeight: '1em',
  color: theme.mutedText,
  margin: 0,
}));

const WalletLogoWrapper = styled.div({
  position: 'relative',
  '> svg:not(.ronin-badge), > img': {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
});

const RoninBadge = styled(RoninBadgeSvg)({
  position: 'absolute',
  right: -6,
  bottom: -6,
});

export const WalletItem = ({ wallet }: WalletItemProps) => {
  const { id, name, icon, connector, homepage, isInstalled, displayOptions = {} } = wallet;
  const { thumbnail, description, highlightBackground, showRoninBadge } = displayOptions;
  const { markKeylessWalletConnected, markWCConnected } = useWidgetUIConfig();
  const { setSelectedWallet } = useWidgetConnect();
  const { goTo } = useWidgetRouter();
  const isMobile = useIsMobileView();

  const walletState = useMemo(() => {
    const isWaypointWallet = isWaypointConnector(connector?.id);
    const isWCWallet = isWCConnector(connector?.id);
    const isInjected = isInjectedConnector(connector?.type);
    const isMarkedConnected = (isWaypointWallet && markKeylessWalletConnected) || (isWCWallet && markWCConnected);

    return {
      walletLogo: thumbnail ?? icon,
      isMarkedConnected,
      isInjected,
      isWCWallet,
      highlightContent: highlightBackground ? (isMobile ? 'Fastest' : 'Fastest to start') : undefined,
    };
  }, [
    thumbnail,
    icon,
    connector?.id,
    connector?.type,
    markKeylessWalletConnected,
    markWCConnected,
    highlightBackground,
    isMobile,
  ]);

  const sendAnalyticEvent = useCallback(() => {
    analytic.sendEvent('wallet_open', {
      wallet_id: id,
      is_extension_detected: walletState.isInjected,
      wallet_type: name,
      chain_id: connector?.chainId,
    });
  }, [id, walletState.isInjected, name, connector?.chainId]);

  const navigateToWallet = useCallback(() => {
    if (!isInstalled) {
      window.open(homepage, '_blank', 'noopener,noreferrer');
      return;
    }
    setSelectedWallet(wallet);
    sendAnalyticEvent();
    const route = walletState.isWCWallet ? Route.CONNECT_WC : Route.CONNECT_INJECTOR;
    goTo(route, { title: name });
  }, [isInstalled, homepage, setSelectedWallet, wallet, sendAnalyticEvent, walletState.isWCWallet, goTo, name]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        navigateToWallet();
      }
    },
    [navigateToWallet],
  );

  const renderBadge = () => {
    if (walletState.isMarkedConnected) return <Badge key="connected">Connected</Badge>;
    if (!walletState.isMarkedConnected && walletState.highlightContent)
      return (
        <Badge key="highlight" intent="highlight">
          {walletState.highlightContent}
        </Badge>
      );
    if (walletState.isInjected) return <Badge key="detected">Detected</Badge>;
    return null;
  };

  return (
    <Container
      role="button"
      aria-label={`Connect to ${name}`}
      highlight={highlightBackground}
      disabled={walletState.isMarkedConnected}
      onClick={navigateToWallet}
      onKeyDown={handleKeyDown}
    >
      {walletState.walletLogo && (
        <WalletLogoWrapper>
          {walletState.walletLogo}
          {showRoninBadge && <RoninBadge className="ronin-badge" />}
        </WalletLogoWrapper>
      )}
      <Box vertical flex={1}>
        <WalletName disabled={walletState.isMarkedConnected}>{name}</WalletName>
        {description && <WalletDescription>{description}</WalletDescription>}
      </Box>
      {renderBadge()}
    </Container>
  );
};
