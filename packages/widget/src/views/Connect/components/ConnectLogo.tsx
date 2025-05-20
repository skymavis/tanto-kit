import styled from '@emotion/styled';
import * as m from 'motion/react-m';
import { ReactNode } from 'react';

import { SuccessIcon } from '../../../assets/SuccessIcon';
import { WarningIcon } from '../../../assets/WarningIcon';
import { Fade } from '../../../components/animated-containers/Fade';
import SquircleSpinner from '../../../components/squircle-spinner/SquircleSpinner';
import { fadeIn, fadeOut, shake } from '../../../styles/animations';
import { ConnectState } from '../../../types/connect';

interface ConnectLogoProps {
  walletIcon: ReactNode;
  status: ConnectState;
}

const LogoSection = styled(m.div)<{ status: ConnectState }>(
  {
    width: 'fit-content',
    userSelect: 'none',
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      inset: 1,
      opacity: 0,
    },
  },
  ({ theme, status }) => {
    if (status === ConnectState.ERROR) {
      return {
        animation: `${shake} 240ms ease-out both`,
        '&:before': {
          background: theme.warningColor,
          animation: `${fadeOut} 240ms ease-out 1200ms both`,
        },
      };
    }
    if (status === ConnectState.SUCCESS) {
      return {
        '&:before': {
          background: theme.successColor,
          animation: `${fadeIn} 150ms linear forwards`,
        },
      };
    }
    return {};
  },
);

const StatusIconSection = styled.div({
  position: 'absolute',
  bottom: 5,
  right: -9,
  zIndex: 5,
});

interface ConnectLogoProps {
  walletIcon: ReactNode;
  status: ConnectState;
}

const StatusIcon = ({ status }: { status: ConnectLogoProps['status'] }) => {
  return (
    <>
      <Fade show={status === ConnectState.ERROR}>
        <WarningIcon />
      </Fade>
      <Fade show={status === ConnectState.SUCCESS}>
        <SuccessIcon />
      </Fade>
    </>
  );
};

export const ConnectLogo = ({ walletIcon, status }: ConnectLogoProps) => {
  const isConnecting = [ConnectState.PENDING, ConnectState.OPENING_WALLET].includes(status);

  return (
    <LogoSection status={status}>
      <SquircleSpinner logo={walletIcon} connecting={isConnecting} />
      <StatusIconSection>
        <StatusIcon status={status} />
      </StatusIconSection>
    </LogoSection>
  );
};
