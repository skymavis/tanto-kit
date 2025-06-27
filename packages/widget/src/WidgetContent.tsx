import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { useBalance } from 'wagmi';

import { ArrowLeftIcon } from './assets/ArrowLeftIcon';
import { SmoothHeight } from './components/animated-containers/SmoothHeight';
import { TransitionedView } from './components/animated-containers/TransitionedView';
import { Box } from './components/box/Box';
import { IconButton } from './components/button/Button';
import { CSSReset } from './components/css-reset/CSSReset';
import { WidgetConnectProvider } from './contexts/widget-connect/WidgetConnectProvider';
import { useWidgetRouter } from './contexts/widget-router/useWidgetRouter';
import { useAccount } from './hooks/useAccount';

const ActionSection = styled.div({
  minWidth: 44,
  width: 44,
});

const Title = styled.div({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.25em',
  fontWeight: 500,
  wordBreak: 'break-word',
});

interface WidgetContentProps {
  close?: ReactNode;
}

export const WidgetContent = ({ close }: WidgetContentProps) => {
  const { view, goBack } = useWidgetRouter();
  const { address, chainId } = useAccount();
  const headerMarginBottom = (() => {
    if (view.showBackButton || close) return 8;
    if (!view.showBackButton && !close) return 6;
    return 12;
  })();

  useBalance({ address, chainId });

  return (
    <CSSReset>
      <SmoothHeight>
        <Box align="stretch" gap={8} mb={headerMarginBottom}>
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
