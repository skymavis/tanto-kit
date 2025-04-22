import styled from '@emotion/styled';
import { memo } from 'react';

import { AppearContainer } from '../../../components/appear-container/AppearContainer';
import { Box } from '../../../components/box/Box';
import { Button } from '../../../components/button/Button';
import { TransitionContainer } from '../../../components/transition-container/TransitionContainer';
import { CONNECT_STATES, ConnectState } from '../../../types';
import { generateRoninMobileWCLink } from '../../../utils';

const STATUS_CONTENT = {
  [CONNECT_STATES.CONNECTING]: {
    title: (walletName: string) => `Opening ${walletName}`,
    description: (walletName: string) => `Confirm connection in ${walletName}.`,
  },
  [CONNECT_STATES.FAILED]: {
    title: 'Could not connect',
    description: 'There is a problem with connecting your wallet.',
  },
  [CONNECT_STATES.CONNECTED]: {
    title: 'Success',
    description: (walletName: string) => `Connected to ${walletName} successfully.`,
  },
  [CONNECT_STATES.OPENING_WALLET]: {
    title: (walletName: string) => walletName,
    description: (wcUri?: string) => (wcUri ? "Tap 'Open' to continue." : 'Preparing connection'),
  },
};

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
  title: string | ((walletName: string) => string);
  description: string | ((walletName: string) => string);
  walletName: string;
}>(({ title, description, walletName }) => {
  const titleText = typeof title === 'function' ? title(walletName) : title;
  const descText = typeof description === 'function' ? description(walletName) : description;

  return (
    <ContentSection>
      <Title>{titleText}</Title>
      <Description>{descText}</Description>
    </ContentSection>
  );
});

const ActionButton = memo<{
  status: ConnectState;
  walletName: string;
  wcUri?: string;
  onRetry?: () => void;
}>(({ status, walletName, wcUri, onRetry }) => {
  if (status === CONNECT_STATES.FAILED && onRetry) {
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
  const content = STATUS_CONTENT[status];

  return (
    <TransitionContainer viewKey={status}>
      <Box fullWidth vertical gap={32}>
        <StatusContent title={content.title} description={content.description} walletName={walletName} />
        <ActionButton status={status} walletName={walletName} wcUri={wcUri} onRetry={onRetry} />
      </Box>
    </TransitionContainer>
  );
});
