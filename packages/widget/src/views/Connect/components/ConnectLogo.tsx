import styled from '@emotion/styled';
import * as m from 'motion/react-m';
import { memo } from 'react';

import { SuccessIcon } from '../../../assets/SuccessIcon';
import { WarningIcon } from '../../../assets/WarningIcon';
import { AppearContainer } from '../../../components/appear-container/AppearContainer';
import SquircleSpinner from '../../../components/squircle-spinner/SquircleSpinner';
import { CONNECT_WIDGET_HIDE_DELAY } from '../../../constants';
import { fadeIn, fadeOut, shake } from '../../../styles/animations';
import { CONNECT_STATES, ConnectLogoProps } from '../types';

const LogoSection = styled(m.div, {
  shouldForwardProp: propName => propName !== 'failed' && propName !== 'success',
})<{ failed: boolean; success: boolean }>(
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
  ({ failed, success }) => {
    if (failed)
      return {
        animation: `${shake} 240ms ease-out both`,
        '&:before': {
          background: '#FFC34D',
          animation: `${fadeOut} 240ms ease-out ${CONNECT_WIDGET_HIDE_DELAY}ms both`,
        },
      };
    if (success)
      return {
        '&:before': {
          background: '#52E08D',
          animation: `${fadeIn} 150ms linear forwards`,
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

export const ConnectLogo = memo(({ walletIcon, status }: ConnectLogoProps) => {
  const isFailed = status === CONNECT_STATES.FAILED;
  const isConnected = status === CONNECT_STATES.CONNECTED;
  const isConnecting = [CONNECT_STATES.CONNECTING, CONNECT_STATES.OPENING_WALLET].includes(status);

  return (
    <LogoSection failed={isFailed} success={isConnected}>
      <SquircleSpinner logo={walletIcon} connecting={isConnecting} />
      <StatusIconSection>
        <AppearContainer show={isFailed}>
          <WarningIcon />
        </AppearContainer>
        <AppearContainer show={isConnected}>
          <SuccessIcon />
        </AppearContainer>
      </StatusIconSection>
    </LogoSection>
  );
});
