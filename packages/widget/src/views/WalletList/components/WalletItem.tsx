import styled from '@emotion/styled';
import { useCallback } from 'react';

import { getHighlightedWalletItemBackgroundUri } from '../../../assets/data-uris';
import { Badge } from '../../../components/badge/Badge';
import { Box } from '../../../components/box/Box';
import { WALLET_ITEM_HEIGHT } from '../../../constants';
import { useIsMobileView } from '../../../hooks/useIsMobileView';
import { useTanto } from '../../../hooks/useTanto';
import { useWidget } from '../../../hooks/useWidget';
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
    transition: 'background 150ms ease',
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
      backgroundImage: `url("${getHighlightedWalletItemBackgroundUri()}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      '&:hover': {
        backgroundColor: 'unset',
        backgroundImage: `url("${getHighlightedWalletItemBackgroundUri(true)}")`,
      },
    },
);

const WalletName = styled.p({
  fontSize: 16,
  lineHeight: '20px',
  margin: 0,
});

const WalletDescription = styled.p({
  fontSize: 12,
  lineHeight: '16px',
  color: 'rgba(205, 213, 229, 0.75)',
  margin: 0,
});

export const WalletItem = ({ wallet }: WalletItemProps) => {
  const { id, name, icon, connector, homepage, isInstalled, displayOptions = {} } = wallet;
  const { thumbnail, description, highlight } = displayOptions;
  const { setWallet } = useTanto();
  const { goTo } = useWidget();
  const isMobile = useIsMobileView();

  const walletLogo = thumbnail ?? icon;
  const isInjected = isInjectedConnector(connector?.type);
  const highlightContent = highlight ? (isMobile ? 'Fastest' : 'Fastest to start') : undefined;

  const handleClick = useCallback(() => {
    if (!isInstalled) {
      window.open(homepage, '_blank', 'noopener,noreferrer');
      return;
    }
    setWallet(wallet);
    goTo(isWCConnector(id) ? Route.CONNECT_WC : Route.CONNECT_INJECTOR, { title: name });
  }, [wallet, setWallet, goTo, isInstalled, homepage, id, name]);

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
      {walletLogo && <div>{walletLogo}</div>}
      <Box vertical flex={1}>
        <WalletName>{name}</WalletName>
        {description && <WalletDescription>{description}</WalletDescription>}
      </Box>
      {isInjected && <Badge>Detected</Badge>}
      {highlightContent && <Badge intent="highlight">{highlightContent}</Badge>}
    </Container>
  );
};
