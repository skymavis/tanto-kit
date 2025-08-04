import styled from '@emotion/styled';
import { useMemo } from 'react';

import { Fade } from '../../../components/animated-containers/Fade';
import { TransitionedView } from '../../../components/animated-containers/TransitionedView';
import { Box } from '../../../components/box/Box';
import { Button } from '../../../components/button/Button';
import { ConnectState } from '../../../types/connect';
import type { Wallet } from '../../../types/wallet';
import { generateRoninMobileWCLink } from '../../../utils/url';

const TextSection = styled(Box)({
  textAlign: 'center',
});

const Title = styled.h3({
  fontSize: '1.25em',
  fontWeight: 500,
});

const Description = styled.p(({ theme }) => ({
  fontSize: '0.875em',
  fontWeight: 400,
  color: theme.mutedText,
}));

interface ActionButtonProps {
  status: ConnectState;
  walletName: string;
  wcUri?: string;
  onRetry?: () => void;
}

interface ConnectContentProps {
  wallet: Wallet;
  status: ConnectState;
  wcUri?: string;
  onRetry?: () => void;
}

interface ConnectText {
  title: string;
  description: string;
}

type ConnectTextMap = Record<ConnectState, ConnectText>;

const FADE_ANIMATION_CONFIG = {
  initial: { opacity: 0, scale: 0.85 },
  transition: { duration: 0.2 },
} as const;

function ActionButton({ status, walletName, wcUri, onRetry }: ActionButtonProps) {
  if (status === ConnectState.FAILED && onRetry) {
    return (
      <Fade show {...FADE_ANIMATION_CONFIG}>
        <Button fullWidth intent="secondary" onClick={onRetry}>
          Try again
        </Button>
      </Fade>
    );
  }

  if (status === ConnectState.OPEN_MOBILE_WALLET && wcUri) {
    return (
      <Fade show {...FADE_ANIMATION_CONFIG}>
        <a href={generateRoninMobileWCLink(wcUri)}>
          <Button fullWidth>Open {walletName}</Button>
        </a>
      </Fade>
    );
  }

  return null;
}

function getConnectingText(wallet: Wallet): ConnectText {
  const defaultTitle = 'Waiting for connection';
  const defaultDescription = `Confirm connection in ${wallet.name}.`;

  return {
    title: wallet.displayOptions?.connectingTitle ?? defaultTitle,
    description: wallet.displayOptions?.connectingDescription ?? defaultDescription,
  };
}

export function ConnectContent({ wallet, status, wcUri, onRetry }: ConnectContentProps) {
  const connectTextMap = useMemo<ConnectTextMap>(() => {
    const connectingText = getConnectingText(wallet);

    return {
      [ConnectState.CONNECTING]: connectingText,
      [ConnectState.AUTHENTICATING]: {
        title: 'Waiting for Signature',
        description: 'Open your wallet and sign to verify you own this address.',
      },
      [ConnectState.FAILED]: {
        title: 'Could not connect',
        description: 'There is a problem with connecting your wallet.',
      },
      [ConnectState.SUCCESS]: {
        title: 'Success',
        description: `Connected to ${wallet.name} successfully.`,
      },
      [ConnectState.OPEN_MOBILE_WALLET]: {
        title: wallet.name,
        description: wcUri ? "Tap 'Open' to continue" : 'Preparing connection',
      },
    };
  }, [wallet, wcUri]);

  const { title, description } = connectTextMap[status];

  return (
    <TransitionedView viewKey={status}>
      <Box fullWidth vertical gap={32}>
        <TextSection vertical gap={4}>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TextSection>
        <ActionButton status={status} walletName={wallet.name} wcUri={wcUri} onRetry={onRetry} />
      </Box>
    </TransitionedView>
  );
}
