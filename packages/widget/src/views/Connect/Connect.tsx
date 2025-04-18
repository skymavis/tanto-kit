import styled from '@emotion/styled';
import * as m from 'motion/react-m';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useConnect } from 'wagmi';

import { SuccessIcon } from '../../assets/SuccessIcon';
import { WarningIcon } from '../../assets/WarningIcon';
import { AppearContainer } from '../../components/appear-container/AppearContainer';
import { Box } from '../../components/box/Box';
import { Button } from '../../components/button/Button';
import SquircleSpinner from '../../components/squircle-spinner/SquircleSpinner';
import { TransitionContainer } from '../../components/transition-container/TransitionContainer';
import { useTanto } from '../../hooks/useTanto';
import { useWidget } from '../../hooks/useWidget';
import { outlineKeyframes, shakeKeyframes } from '../../styles/animations';

const DELAY_CONNECT = 600;
const DELAY_HIDE = 900;

type ConnectState = 'connected' | 'connecting' | 'failed';

const CONNECT_STATES: Record<Uppercase<ConnectState>, ConnectState> = {
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
  FAILED: 'failed',
} as const;

const LogoSection = styled(m.div, {
  shouldForwardProp: propName => propName !== 'failed' && propName !== 'connected',
})<{ failed: boolean; connected: boolean }>(
  {
    userSelect: 'none',
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      inset: 1,
      opacity: 0,
    },
  },
  ({ failed, connected }) => {
    if (failed)
      return {
        animation: `${shakeKeyframes} 220ms ease-out both`,
        '&:before': {
          background: '#FFC34D',
          animation: `${outlineKeyframes} 220ms ease-out 800ms both`,
        },
      };
    if (connected)
      return {
        '&:before': {
          background: '#52E08D',
          animation: `${outlineKeyframes} 220ms ease-out 800ms both`,
        },
      };
  },
);

const StatusIconSection = styled.div({
  position: 'absolute',
  bottom: 5,
  right: -9,
  zIndex: 5,
});

const ContentSection = styled(Box)({
  textAlign: 'center',
  flexDirection: 'column',
  gap: 4,
});

const Title = styled.h3({
  fontSize: 20,
  fontWeight: 500,
});

const Description = styled.p({
  fontSize: 14,
  fontWeight: 400,
  color: 'rgba(205, 213, 229, 0.75)',
});

interface ConnectViewsProps {
  walletName: string;
  onRetry: () => void;
}

const ConnectViews = ({ walletName, onRetry }: ConnectViewsProps) => ({
  [CONNECT_STATES.CONNECTING]: (
    <ContentSection>
      <Title>{`Opening ${walletName}`}</Title>
      <Description>{`Confirm connection in ${walletName}.`}</Description>
    </ContentSection>
  ),
  [CONNECT_STATES.FAILED]: (
    <Box fullWidth vertical gap={32}>
      <ContentSection>
        <Title>Could not connect</Title>
        <Description>There is a problem with connecting your wallet.</Description>
      </ContentSection>
      <Button fullWidth intent="secondary" onClick={onRetry}>
        Try again
      </Button>
    </Box>
  ),
  [CONNECT_STATES.CONNECTED]: (
    <ContentSection>
      <Title>Success</Title>
      <Description>{`Connected to ${walletName} successfully.`}</Description>
    </ContentSection>
  ),
});

export function Connect() {
  const [status, setStatus] = useState<ConnectState>(CONNECT_STATES.CONNECTING);
  const { wallet, connector } = useTanto();
  const { hide } = useWidget();

  const triggerConnect = useCallback(() => {
    if (connector) {
      connect({ connector });
    }
  }, [connector]);

  const { connect } = useConnect({
    mutation: {
      onMutate: () => setStatus(CONNECT_STATES.CONNECTING),
      onError: () => setStatus(CONNECT_STATES.FAILED),
      onSuccess: () => {
        setStatus(CONNECT_STATES.CONNECTED);
        setTimeout(() => hide(), DELAY_HIDE);
      },
    },
  });

  useEffect(() => {
    const timer = setTimeout(triggerConnect, DELAY_CONNECT);
    return () => clearTimeout(timer);
  }, [triggerConnect]);

  if (!wallet || !connector) return null;

  const views = useMemo(
    () => ConnectViews({ walletName: wallet.name, onRetry: triggerConnect }),
    [wallet.name, triggerConnect],
  );

  const isFailed = status === CONNECT_STATES.FAILED;
  const isConnecting = status === CONNECT_STATES.CONNECTING;
  const isConnected = status === CONNECT_STATES.CONNECTED;

  return (
    <Box vertical align="center" justify="center" gap={32} pt={20}>
      <LogoSection failed={isFailed} connected={isConnected}>
        <SquircleSpinner logo={wallet.icon} connecting={isConnecting} />

        <StatusIconSection>
          {isFailed && (
            <AppearContainer>
              <WarningIcon />
            </AppearContainer>
          )}
          {isConnected && (
            <AppearContainer>
              <SuccessIcon />
            </AppearContainer>
          )}
        </StatusIconSection>
      </LogoSection>

      <TransitionContainer viewKey={status}>{views[status]}</TransitionContainer>
    </Box>
  );
}
