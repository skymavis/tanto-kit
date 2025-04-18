import styled from '@emotion/styled';

const StyledDisclaimer = styled.div({
  textAlign: 'center',
  maxWidth: 380,
  fontSize: 12,
  fontWeight: 400,
  lineHeight: '16px',
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
    <StyledDisclaimer>
      By connecting a wallet, you agree to Ronin's{' '}
      <a href={'https://wallet.roninchain.com/terms'} target={'_blank'} rel="noopener">
        Terms of Service
      </a>{' '}
      and consent to its{' '}
      <a href={'https://wallet.roninchain.com/privacy'} target={'_blank'} rel="noopener">
        Privacy Policy
      </a>
      .
    </StyledDisclaimer>
  );
};
