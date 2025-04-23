import styled from '@emotion/styled';
import { memo, useMemo } from 'react';

import { AppearContainer } from '../../../components/appear-container/AppearContainer';
import { Box } from '../../../components/box/Box';
import { Button } from '../../../components/button/Button';
import { TransitionContainer } from '../../../components/transition-container/TransitionContainer';
import { CONNECT_STATES, ConnectState } from '../../../types';
import { generateRoninMobileWCLink } from '../../../utils';

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

const StatusContent = memo<{
  status: ConnectState;
  walletName: string;
  wcUri?: string;
}>(({ status, walletName, wcUri }) => {
  const content = useMemo(
    () => ({
      [CONNECT_STATES.PENDING]: {
        title: `Opening ${walletName}`,
        description: `Confirm connection in ${walletName}.`,
      },
      [CONNECT_STATES.ERROR]: {
        title: 'Could not connect',
        description: 'There is a problem with connecting your wallet.',
      },
      [CONNECT_STATES.SUCCESS]: {
        title: 'Success',
        description: `Connected to ${walletName} successfully.`,
      },
      [CONNECT_STATES.OPENING_WALLET]: {
        title: walletName,
        description: wcUri ? "Tap 'Open' to continue" : 'Preparing connection',
      },
    }),
    [walletName, wcUri],
  );

  return (
    <ContentSection>
      <Title>{content[status]?.title}</Title>
      <Description>{content[status]?.description}</Description>
    </ContentSection>
  );
});

const ActionButton = memo<{
  status: ConnectState;
  walletName: string;
  wcUri?: string;
  onRetry?: () => void;
}>(({ status, walletName, wcUri, onRetry }) => {
  if (status === CONNECT_STATES.ERROR && onRetry) {
    return (
      <Button fullWidth intent="secondary" onClick={onRetry}>
        Try again
      </Button>
    );
  }

  if (status === CONNECT_STATES.OPENING_WALLET && wcUri) {
    return (
      <AppearContainer show initial={{ opacity: 0, scale: 0.85 }}>
        <a href={generateRoninMobileWCLink(wcUri)}>
          <Button fullWidth>Open {walletName}</Button>
        </a>
      </AppearContainer>
    );
  }

  return null;
});

interface ConnectContentProps {
  walletName: string;
  status: ConnectState;
  wcUri?: string;
  onRetry?: () => void;
}

export const ConnectContent = memo(({ walletName, status, wcUri, onRetry }: ConnectContentProps) => {
  return (
    <TransitionContainer viewKey={status}>
      <Box fullWidth vertical gap={32}>
        <StatusContent status={status} walletName={walletName} wcUri={wcUri} />
        <ActionButton status={status} walletName={walletName} wcUri={wcUri} onRetry={onRetry} />
      </Box>
    </TransitionContainer>
  );
});
