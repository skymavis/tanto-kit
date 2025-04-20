import styled from '@emotion/styled';

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

export const Disclaimer = () => {
  return (
    <Box fullWidth justify="center">
      <Container>
        By connecting a wallet, you agree to Ronin's{' '}
        <a href={'https://wallet.roninchain.com/terms'} target={'_blank'} rel="noopener">
          Terms of Service
        </a>{' '}
        and consent to its{' '}
        <a href={'https://wallet.roninchain.com/privacy'} target={'_blank'} rel="noopener">
          Privacy Policy
        </a>
        .
      </Container>
    </Box>
  );
};
