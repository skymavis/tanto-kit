import styled from '@emotion/styled';
import { forwardRef, useEffect } from 'react';
import { useAccount, useAccountEffect, useBalance } from 'wagmi';

import { ArrowLeftIcon } from './assets/ArrowLeftIcon';
import { XIcon } from './assets/XIcon';
import { SmoothHeight } from './components/animated-containers/SmoothHeight';
import { TransitionedView } from './components/animated-containers/TransitionedView';
import { Box } from './components/box/Box';
import { IconButton } from './components/button/Button';
import { CSSReset } from './components/css-reset/CSSReset';
import { CONNECT_WIDGET_HIDE_DELAY, RONIN_WALLET_DEEEPLINK } from './constants';
import { useWalletConnectListener } from './hooks/useWalletConnectListener';
import { useWidget } from './hooks/useWidget';
import { isMobile } from './utils';
import { openWindow } from './utils/openWindow';
import { views } from './views';

const ActionSection = styled.div({
  minWidth: 44,
  minHeight: 44,
  width: 44,
  height: 44,
});

const Title = styled.h2({
  flex: 1,
  fontSize: 20,
  fontWeight: 500,
  wordBreak: 'break-word',
});

interface TantoWidgetContentProps {
  showCloseButton?: boolean;
}

export const TantoWidgetContent = forwardRef<HTMLDivElement, TantoWidgetContentProps>(({ showCloseButton }, ref) => {
  const { view, hide, goBack } = useWidget();
  const { address, chainId, connector } = useAccount();

  useBalance({ address, chainId });

  useWalletConnectListener({
    connector,
    onSignRequest: () => {
      if (isMobile()) openWindow(RONIN_WALLET_DEEEPLINK);
    },
  });

  useEffect(() => {
    return () => hide();
  }, [hide]);

  useAccountEffect({
    onConnect: () => {
      setTimeout(hide, CONNECT_WIDGET_HIDE_DELAY);
    },
  });

  return (
    <CSSReset ref={ref}>
      {/* TODO: Use theme's variable instead */}
      <SmoothHeight css={{ minWidth: 378 }}>
        <Box align="center" gap={8} mb={8}>
          <ActionSection>
            {view.showBackButton && (
              <IconButton
                aria-label="Back"
                intent="secondary"
                variant="plain"
                icon={<ArrowLeftIcon />}
                onClick={goBack}
              />
            )}
          </ActionSection>
          <Title>{view.title}</Title>
          <ActionSection>
            {showCloseButton && <IconButton intent="secondary" variant="plain" icon={<XIcon />} onClick={hide} />}
          </ActionSection>
        </Box>
        <TransitionedView viewKey={view.route}>{views[view.route]}</TransitionedView>
      </SmoothHeight>
    </CSSReset>
  );
});
