import styled from '@emotion/styled';
import { useCallback } from 'react';

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
});

const RoninBadge = styled(RoninBadgeSvg)({
  position: 'absolute',
  right: -6,
  bottom: -6,
});

export const WalletItem = ({ wallet }: WalletItemProps) => {
  const { id, name, icon, connector, homepage, isInstalled, displayOptions = {} } = wallet;
  const { thumbnail, description, highlightBackground, showRoninBadge } = displayOptions;
  const { markKeylessWalletConnected } = useWidgetUIConfig();
  const { setSelectedWallet } = useWidgetConnect();
  const { goTo } = useWidgetRouter();
  const isMobile = useIsMobileView();

  const walletLogo = thumbnail ?? icon;
  const markWaypointConnected = isWaypointConnector(connector?.id) && markKeylessWalletConnected;
  const isInjected = isInjectedConnector(connector?.type);
  const highlightContent = highlightBackground ? (isMobile ? 'Fastest' : 'Fastest to start') : undefined;

  const handleClick = useCallback(() => {
    if (!isInstalled) {
      window.open(homepage, '_blank', 'noopener,noreferrer');
      return;
    }
    setSelectedWallet(wallet);
    goTo(isWCConnector(id) ? Route.CONNECT_WC : Route.CONNECT_INJECTOR, { title: name });
  }, [wallet, setSelectedWallet, goTo, isInstalled, homepage, id, name]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  return (
    <Container
      role="button"
      aria-label={`Connect to ${name}`}
      highlight={highlightBackground}
      disabled={markWaypointConnected}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {walletLogo && (
        <WalletLogoWrapper>
          {walletLogo}
          {showRoninBadge && <RoninBadge />}
        </WalletLogoWrapper>
      )}

      <Box vertical flex={1}>
        <WalletName disabled={markWaypointConnected}>{name}</WalletName>
        {description && <WalletDescription>{description}</WalletDescription>}
      </Box>
      {markWaypointConnected && <Badge>Connected</Badge>}
      {!markWaypointConnected && highlightContent && <Badge intent="highlight">{highlightContent}</Badge>}
      {isInjected && <Badge>Detected</Badge>}
    </Container>
  );
};
