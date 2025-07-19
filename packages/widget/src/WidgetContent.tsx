import styled from '@emotion/styled';
import { useBalance } from 'wagmi';

import { ArrowLeftIcon } from './assets/ArrowLeftIcon';
import { SmoothHeight } from './components/animated-containers/SmoothHeight';
import { TransitionedView } from './components/animated-containers/TransitionedView';
import { Box } from './components/box/Box';
import { IconButton } from './components/button/Button';
import { CSSReset } from './components/css-reset/CSSReset';
import { WidgetConnectProvider } from './contexts/widget-connect/WidgetConnectProvider';
import { useWidgetRouter } from './contexts/widget-router/useWidgetRouter';
import { useIsModal } from './contexts/widget-ui-config/useIsModal';
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

function WidgetContentHeader() {
  const isModal = useIsModal();
  const { view, goBack } = useWidgetRouter();

  const showHeader = view.title || view.showBackButton;

  if (!showHeader) return null;

  // To match design specifications
  const headerPaddingTop = !view.showBackButton && isModal ? 12 : 0;
  const headerMarginBottom = isModal || view.showBackButton ? 8 : 6;

  return (
    <Box align="stretch" gap={8} pt={headerPaddingTop} mb={headerMarginBottom} mr={44}>
      <ActionSection>
        {view.showBackButton && (
          <IconButton aria-label="Back" intent="secondary" variant="plain" icon={<ArrowLeftIcon />} onClick={goBack} />
        )}
      </ActionSection>
      <Title>{view.title}</Title>
    </Box>
  );
}

export function WidgetContent() {
  const { address, chainId } = useAccount();
  const { view } = useWidgetRouter();

  useBalance({ address, chainId });

  return (
    <CSSReset>
      <SmoothHeight>
        <WidgetContentHeader />
        <WidgetConnectProvider>
          <TransitionedView viewKey={view.route}>{view.content}</TransitionedView>
        </WidgetConnectProvider>
      </SmoothHeight>
    </CSSReset>
  );
}
