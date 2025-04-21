import styled from '@emotion/styled';
import { useCallback } from 'react';

import { highlightedWalletItemBackgroundUri } from '../../assets/data-uris';
import { Badge } from '../../components/badge/Badge';
import { Box } from '../../components/box/Box';
import { useIsMobileView } from '../../hooks/useIsMobileView';
import { useTanto } from '../../hooks/useTanto';
import { useWidget } from '../../hooks/useWidget';
import { Route } from '../../types/route';
import { Wallet } from '../../types/wallet';

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
    height: 68,
    gap: 12,
    padding: 16,
    backgroundColor: 'rgba(205, 213, 229, 0.07)',
    cursor: 'pointer',
  },
  ({ highlight }) =>
    highlight && {
      background: `url("${highlightedWalletItemBackgroundUri}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
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
  const { name, icon, iconOnList, descriptionOnList, isInstalled, downloadUrl, highlightOnList = false } = wallet;
  const { setWallet } = useTanto();
  const { goTo } = useWidget();
  const isMobile = useIsMobileView();

  const walletLogo = iconOnList ?? icon;
  const isInjected = wallet.connector?.type === 'injected' ? 'Detected' : undefined;
  const highlighContent = highlightOnList ? (isMobile ? 'Fastest' : 'Fastest to start') : undefined;

  const handleClick = useCallback(() => {
    if (!isInstalled) {
      window.open(downloadUrl, '_blank');
      return;
    }
    if (typeof wallet.alternativeConnectAction === 'function') {
      wallet.alternativeConnectAction();
      return;
    }
    setWallet(wallet);
    if (wallet.id === 'walletConnect') {
      goTo(Route.CONNECT_WC, { title: name });
      return;
    }
    goTo(Route.CONNECT_INJECTOR, { title: name });
  }, [wallet, setWallet, goTo, name]);

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
      highlight={highlightOnList}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div>{walletLogo}</div>
      <Box vertical flex={1}>
        <WalletName>{name}</WalletName>
        {descriptionOnList && <WalletDescription>{descriptionOnList}</WalletDescription>}
      </Box>
      {isInjected && <Badge>Detected</Badge>}
      {highlighContent && <Badge intent="highlight">{highlighContent}</Badge>}
    </Container>
  );
};
