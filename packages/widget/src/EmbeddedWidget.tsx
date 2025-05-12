import styled from '@emotion/styled';
import { CSSProperties } from 'react';
import { useAccountEffect } from 'wagmi';

import { CONNECT_SUCCESS_DELAY } from './constants';
import { WidgetRouterProvider } from './contexts/widget-router/WidgetRouterProvider';
import { useConnectCallback } from './hooks/useConnectCallback';
import { useTantoConfig } from './hooks/useTantoConfig';
import { useWidgetRouter } from './hooks/useWidgetRouter';
import { AccountConnectionCallback } from './types/connect';
import { WidgetContent } from './WidgetContent';

const EmbeddedContainer = styled.div(({ theme }) => ({
  width: '100%',
  padding: '8px 20px 20px 20px',
  backgroundColor: theme.colors.background,
}));

export type TantoEmbeddedWidgetProps = AccountConnectionCallback & {
  style?: CSSProperties;
  className?: string;
};

function EmbeddedWidget({ onConnect, onDisconnect, ...rest }: TantoEmbeddedWidgetProps) {
  const { reset } = useWidgetRouter();
  const { hideConnectSuccessPrompt } = useTantoConfig();

  useAccountEffect({
    onConnect() {
      setTimeout(reset, hideConnectSuccessPrompt ? 0 : CONNECT_SUCCESS_DELAY);
    },
  });

  useConnectCallback({
    onConnect,
    onDisconnect,
  });

  return (
    <EmbeddedContainer {...rest}>
      <WidgetContent />
    </EmbeddedContainer>
  );
}

export function TantoEmbeddedWidget(props: TantoEmbeddedWidgetProps) {
  return (
    <WidgetRouterProvider>
      <EmbeddedWidget {...props} />
    </WidgetRouterProvider>
  );
}
