import styled from '@emotion/styled';
import * as m from 'motion/react-m';
import { memo } from 'react';

import { SuccessIcon } from '../../../assets/SuccessIcon';
import { WarningIcon } from '../../../assets/WarningIcon';
import { AppearContainer } from '../../../components/appear-container/AppearContainer';
import SquircleSpinner from '../../../components/squircle-spinner/SquircleSpinner';
import { CONNECT_WIDGET_HIDE_DELAY } from '../../../constants';
import { outline, shake } from '../../../styles/animations';
import { CONNECT_STATES, ConnectLogoProps } from '../types';

const LogoSection = styled(m.div, {
  shouldForwardProp: propName => propName !== 'failed' && propName !== 'connected',
})<{ failed: boolean; connected: boolean }>(
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
  ({ failed, connected }) => {
    if (failed)
      return {
        animation: `${shake} 240ms ease-out both`,
        '&:before': {
          background: '#FFC34D',
          animation: `${outline} 240ms ease-out ${CONNECT_WIDGET_HIDE_DELAY - 50}ms both`,
        },
      };
    if (connected)
      return {
        '&:before': {
          background: '#52E08D',
          animation: `${outline} 240ms ease-out ${CONNECT_WIDGET_HIDE_DELAY - 50}ms both`,
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
    <SquircleSpinner
      logo={walletIcon}
      connecting={[CONNECT_STATES.CONNECTING, CONNECT_STATES.OPENING_WALLET].includes(status)}
    />
    <StatusIconSection>
      <AppearContainer show={status === CONNECT_STATES.FAILED}>
        <WarningIcon />
      </AppearContainer>
      <AppearContainer show={status === CONNECT_STATES.CONNECTED}>
        <SuccessIcon />
      </AppearContainer>
    </StatusIconSection>
  </LogoSection>
));
