import styled from '@emotion/styled';
import { useMemo } from 'react';

import { Fade } from '../../../components/animated-containers/Fade';
import { TransitionedView } from '../../../components/animated-containers/TransitionedView';
import { Box } from '../../../components/box/Box';
import { Button } from '../../../components/button/Button';
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

const Description = styled.p(props => ({
  fontSize: 14,
  fontWeight: 400,
  color: props.theme.neutralColor,
}));

interface StatusContentProps {
  status: ConnectState;
  walletName: string;
  wcUri?: string;
}

const StatusContent = ({ status, walletName, wcUri }: StatusContentProps) => {
  const statusMessages = useMemo(
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

  const { title, description } = statusMessages[status] || {};

  return (
    <ContentSection>
      {title && <Title>{title}</Title>}
      {description && <Description>{description}</Description>}
    </ContentSection>
  );
};

interface ActionButtonProps {
  status: ConnectState;
  walletName: string;
  wcUri?: string;
  onRetry?: () => void;
}

const ActionButton = ({ status, walletName, wcUri, onRetry }: ActionButtonProps) => {
  if (status === CONNECT_STATES.ERROR && onRetry) {
    return (
      <Fade show initial={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.2 }}>
        <Button fullWidth intent="secondary" onClick={onRetry}>
          Try again
        </Button>
      </Fade>
    );
  }

  if (status === CONNECT_STATES.OPENING_WALLET && wcUri) {
    return (
      <Fade show initial={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.2 }}>
        <a href={generateRoninMobileWCLink(wcUri)}>
          <Button fullWidth>Open {walletName}</Button>
        </a>
      </Fade>
    );
  }

  return null;
};

interface ConnectContentProps {
  walletName: string;
  status: ConnectState;
  wcUri?: string;
  onRetry?: () => void;
}

export const ConnectContent = ({ walletName, status, wcUri, onRetry }: ConnectContentProps) => {
  return (
    <TransitionedView viewKey={status}>
      <Box fullWidth vertical gap={32}>
        <StatusContent status={status} walletName={walletName} wcUri={wcUri} />
        <ActionButton status={status} walletName={walletName} wcUri={wcUri} onRetry={onRetry} />
      </Box>
    </TransitionedView>
  );
};
