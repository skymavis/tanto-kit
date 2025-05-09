import styled from '@emotion/styled';
import { useCallback } from 'react';

import { highlightedWalletItemBackgroundUri, highlightedWalletItemHoverBackgroundUri } from '../../../assets/data-uris';
import { Badge } from '../../../components/badge/Badge';
import { Box } from '../../../components/box/Box';
import { WALLET_ITEM_HEIGHT } from '../../../constants';
import { useIsMobileView } from '../../../hooks/useIsMobileView';
import { useWidgetConnect } from '../../../hooks/useWidgetConnect';
import { useWidgetRouter } from '../../../hooks/useWidgetRouter';
import { Route } from '../../../types/route';
import { Wallet } from '../../../types/wallet';
import { isInjectedConnector, isWCConnector } from '../../../utils';

interface WalletItemProps {
  wallet: Wallet;
}

const Container = styled('div', {
  shouldForwardProp: propName => propName !== 'highlight',
})<{ highlight?: boolean }>(
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
    backgroundColor: theme.listItemBackgroundColor,
    '&:hover': {
      backgroundColor: theme.listItemHoverBackgroundColor,
    },
  }),
  ({ highlight }) =>
    highlight && {
      backgroundColor: 'unset',
      backgroundImage: `url("${highlightedWalletItemBackgroundUri}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      '&:hover': {
        backgroundColor: 'unset',
        backgroundImage: `url("${highlightedWalletItemHoverBackgroundUri}")`,
      },
    },
);

const WalletName = styled.p({
  fontSize: 16,
  lineHeight: '20px',
  margin: 0,
});

const WalletDescription = styled.p(props => ({
  fontSize: 12,
  lineHeight: '16px',
  color: props.theme.neutralColor,
  margin: 0,
}));

export const WalletItem = ({ wallet }: WalletItemProps) => {
  const { id, name, icon, connector, homepage, isInstalled, displayOptions = {} } = wallet;
  const { thumbnail, description, highlight } = displayOptions;
  const { setSelectedWallet } = useWidgetConnect();
  const { goTo } = useWidgetRouter();
  const isMobile = useIsMobileView();

  const walletLogo = thumbnail ?? icon;
  const isInjected = isInjectedConnector(connector?.type);
  const highlightContent = highlight ? (isMobile ? 'Fastest' : 'Fastest to start') : undefined;

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
      highlight={highlight}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {walletLogo && walletLogo}
      <Box vertical flex={1}>
        <WalletName>{name}</WalletName>
        {description && <WalletDescription>{description}</WalletDescription>}
      </Box>
      {isInjected && <Badge>Detected</Badge>}
      {highlightContent && <Badge intent="highlight">{highlightContent}</Badge>}
    </Container>
  );
};
