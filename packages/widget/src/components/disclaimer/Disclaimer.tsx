import styled from '@emotion/styled';
import { memo } from 'react';

import { WEB_WALLET_LINK } from '../../constants';
import { Box } from '../box/Box';

const Container = styled.div({
  maxWidth: 378,
  fontSize: 12,
  fontWeight: 400,
  lineHeight: '16px',
  textAlign: 'center',
  color: 'rgba(205, 213, 229, 0.75)',
  '& > a': {
    color: '#5294F8',
    '&:hover': {
      opacity: 0.8,
    },
  },
});

export const Disclaimer = memo(() => {
  return (
    <Box fullWidth justify="center">
      <Container>
        By connecting a wallet, you agree to Ronin's{' '}
        <a href={`${WEB_WALLET_LINK}/terms`} target="_blank" rel="noopener">
          Terms of Service
        </a>{' '}
        and consent to its{' '}
        <a href={`${WEB_WALLET_LINK}/privacy`} target="_blank" rel="noopener">
          Privacy Policy
        </a>
        .
      </Container>
    </Box>
  );
});
