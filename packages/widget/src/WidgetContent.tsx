import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { useAccount, useBalance } from 'wagmi';

import { ArrowLeftIcon } from './assets/ArrowLeftIcon';
import { SmoothHeight } from './components/animated-containers/SmoothHeight';
import { TransitionedView } from './components/animated-containers/TransitionedView';
import { Box } from './components/box/Box';
import { IconButton } from './components/button/Button';
import { CSSReset } from './components/css-reset/CSSReset';
import { RONIN_WALLET_APP_DEEPLINK } from './constants';
import { WidgetConnectProvider } from './contexts/widget-connect/WidgetConnectProvider';
import { useWalletConnectListener } from './hooks/useWalletConnectListener';
import { useWidgetRouter } from './hooks/useWidgetRouter';
import { isMobile } from './utils';
import { openWindow } from './utils/openWindow';

const ActionSection = styled.div({
  minWidth: 44,
  minHeight: 44,
  width: 44,
  height: 44,
});

const Title = styled.h2({
  flex: 1,
  fontSize: '1.25em',
  fontWeight: 500,
  wordBreak: 'break-word',
});

interface WidgetContentProps {
  close?: ReactNode;
}

export const WidgetContent = ({ close }: WidgetContentProps) => {
  const { view, goBack } = useWidgetRouter();
  const { address, chainId, connector } = useAccount();

  useBalance({ address, chainId });

  useWalletConnectListener({
    connector,
    onSignRequest: () => {
      if (isMobile()) openWindow(RONIN_WALLET_APP_DEEPLINK);
    },
  });

  return (
    <CSSReset>
      <SmoothHeight>
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
          <ActionSection>{close && close}</ActionSection>
        </Box>
        <WidgetConnectProvider>
          <TransitionedView viewKey={view.route}>{view.content}</TransitionedView>
        </WidgetConnectProvider>
      </SmoothHeight>
    </CSSReset>
  );
};
