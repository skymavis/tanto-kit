import styled from '@emotion/styled';
import { memo } from 'react';

import { RoninLogo } from '../../assets/RoninLogo';
import { WEB_WALLET_LINK } from '../../constants';
import { Box } from '../box/Box';
import { Button } from '../button/Button';

const Container = styled(Box)({
  backgroundColor: 'rgba(205, 213, 229, 0.07)',
});

const Description = styled.p({
  fontSize: 14,
  fontWeight: 400,
  color: '#F1F3F9',
  flex: 1,
});

const DownloadButton = styled(Button)({
  width: 48,
});

export const GetWalletCTA = memo(() => {
  return (
    <Container fullWidth align="center" gap={8} p={12} radius={12}>
      <RoninLogo />
      <Description>Don't have Ronin Mobile wallet?</Description>
      <a target="_blank" href={WEB_WALLET_LINK}>
        <DownloadButton size="xsmall">Get</DownloadButton>
      </a>
    </Container>
  );
});
