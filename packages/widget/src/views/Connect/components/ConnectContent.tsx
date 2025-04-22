import styled from '@emotion/styled';
import { memo, useMemo } from 'react';

import { AppearContainer } from '../../../components/appear-container/AppearContainer';
import { Box } from '../../../components/box/Box';
import { Button } from '../../../components/button/Button';
import { TransitionContainer } from '../../../components/transition-container/TransitionContainer';
import { generateRoninMobileWCLink } from '../../../utils';
import { CONNECT_STATES, ConnectContentProps } from '../types';

const ContentSection = styled(Box)({
  textAlign: 'center',
  flexDirection: 'column',
  gap: 4,
});

const Title = styled.h3({
  fontSize: 20,
  fontWeight: 500,
});

const Description = styled.p({
  fontSize: 14,
  fontWeight: 400,
  color: 'rgba(205, 213, 229, 0.75)',
});

export const ConnectContent = memo(({ walletName, status, wcUri, onRetry }: ConnectContentProps) => {
  const views = useMemo(() => {
    return {
      [CONNECT_STATES.CONNECTING]: (
        <ContentSection>
          <Title>{`Opening ${walletName}`}</Title>
          <Description>{`Confirm connection in ${walletName}.`}</Description>
        </ContentSection>
      ),
      [CONNECT_STATES.FAILED]: (
        <Box fullWidth vertical gap={32}>
          <ContentSection>
            <Title>Could not connect</Title>
            <Description>There is a problem with connecting your wallet.</Description>
          </ContentSection>
          {onRetry && (
            <Button fullWidth intent="secondary" onClick={onRetry}>
              Try again
            </Button>
          )}
        </Box>
      ),
      [CONNECT_STATES.CONNECTED]: (
        <ContentSection>
          <Title>Success</Title>
          <Description>{`Connected to ${walletName} successfully.`}</Description>
        </ContentSection>
      ),
      [CONNECT_STATES.OPENING_WALLET]: (
        <Box fullWidth vertical gap={32}>
          <ContentSection>
            <Title>{walletName}</Title>
            <Description>{wcUri ? "Tap 'Open' to continue." : 'Preparing connection'}</Description>
          </ContentSection>
          <AppearContainer show={Boolean(wcUri)} initial={{ opacity: 0, scale: 0.85 }}>
            <a href={generateRoninMobileWCLink(wcUri!)}>
              <Button fullWidth>Open {walletName}</Button>
            </a>
          </AppearContainer>
        </Box>
      ),
    };
  }, [walletName, wcUri, onRetry]);

  return <TransitionContainer viewKey={status}>{views[status]}</TransitionContainer>;
});
