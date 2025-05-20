import styled from '@emotion/styled';

import { RONIN_WALLET_WEB_LINK } from '../../constants';
import { Box } from '../box/Box';

const Container = styled.div(props => ({
  maxWidth: 378,
  fontSize: '0.75em',
  fontWeight: 400,
  lineHeight: '1em',
  textAlign: 'center',
  color: props.theme.mutedText,
  '& > a': {
    color: props.theme.linkColor,
    '&:hover': {
      opacity: 0.8,
    },
  },
}));

export const Disclaimer = () => {
  return (
    <Box fullWidth justify="center">
      <Container>
        By connecting a wallet, you agree to Ronin's{' '}
        <a href={`${RONIN_WALLET_WEB_LINK}/terms`} target="_blank" rel="noopener">
          Terms of Service
        </a>{' '}
        and consent to its{' '}
        <a href={`${RONIN_WALLET_WEB_LINK}/privacy`} target="_blank" rel="noopener">
          Privacy Policy
        </a>
        .
      </Container>
    </Box>
  );
};
