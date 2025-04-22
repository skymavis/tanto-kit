import styled from '@emotion/styled';
import * as m from 'motion/react-m';
import { memo, ReactNode } from 'react';

import { SuccessIcon } from '../../../assets/SuccessIcon';
import { WarningIcon } from '../../../assets/WarningIcon';
import { AppearContainer } from '../../../components/appear-container/AppearContainer';
import SquircleSpinner from '../../../components/squircle-spinner/SquircleSpinner';
import { CONNECT_WIDGET_HIDE_DELAY } from '../../../constants';
import { fadeIn, fadeOut, shake } from '../../../styles/animations';
import { CONNECT_STATES, ConnectState } from '../../../types';

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
  ({ status }) => {
    if (status === CONNECT_STATES.FAILED) {
      return {
        animation: `${shake} 240ms ease-out both`,
        '&:before': {
          background: '#FFC34D',
          animation: `${fadeOut} 240ms ease-out ${CONNECT_WIDGET_HIDE_DELAY}ms both`,
        },
      };
    }
    if (status === CONNECT_STATES.CONNECTED) {
      return {
        '&:before': {
          background: '#52E08D',
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

const StatusIcon = memo<{ status: ConnectState }>(({ status }) => {
  return (
    <>
      <AppearContainer show={status === CONNECT_STATES.FAILED}>
        <WarningIcon />
      </AppearContainer>
      <AppearContainer show={status === CONNECT_STATES.CONNECTED}>
        <SuccessIcon />
      </AppearContainer>
    </>
  );
});

export const ConnectLogo = memo(({ walletIcon, status }: ConnectLogoProps) => {
  const isConnecting = [CONNECT_STATES.CONNECTING, CONNECT_STATES.OPENING_WALLET].includes(status);

  return (
    <LogoSection status={status}>
      <SquircleSpinner logo={walletIcon} connecting={isConnecting} />
      <StatusIconSection>
        <StatusIcon status={status} />
      </StatusIconSection>
    </LogoSection>
  );
});
