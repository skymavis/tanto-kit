import styled from '@emotion/styled';
import * as m from 'motion/react-m';
import { memo } from 'react';

import { SuccessIcon } from '../../../assets/SuccessIcon';
import { WarningIcon } from '../../../assets/WarningIcon';
import { AppearContainer } from '../../../components/appear-container/AppearContainer';
import SquircleSpinner from '../../../components/squircle-spinner/SquircleSpinner';
import { outline, shake } from '../../../styles/animations';
import { CONNECT_STATES, ConnectLogoProps } from '../types';

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
        animation: `${shake} 220ms ease-out both`,
        '&:before': {
          background: '#FFC34D',
          animation: `${outline} 220ms ease-out 800ms both`,
        },
      };
    if (connected)
      return {
        '&:before': {
          background: '#52E08D',
          animation: `${outline} 220ms ease-out 800ms both`,
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

export const ConnectLogo = memo(({ walletIcon, status }: ConnectLogoProps) => (
  <LogoSection failed={status === CONNECT_STATES.FAILED} connected={status === CONNECT_STATES.CONNECTED}>
    <SquircleSpinner logo={walletIcon} connecting={status === CONNECT_STATES.CONNECTING} />
    <StatusIconSection>
      {status === CONNECT_STATES.FAILED && (
        <AppearContainer>
          <WarningIcon />
        </AppearContainer>
      )}
      {status === CONNECT_STATES.CONNECTED && (
        <AppearContainer>
          <SuccessIcon />
        </AppearContainer>
      )}
    </StatusIconSection>
  </LogoSection>
));

ConnectLogo.displayName = 'ConnectLogo';
