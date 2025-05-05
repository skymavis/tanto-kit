import styled from '@emotion/styled';
import { memo } from 'react';

import { ScanWalletsIcon } from '../../../assets/ScanWalletsIcon';
import { SmallTransparentWC } from '../../../assets/SmallTransparentWC';

const Container = styled.div({
  display: 'flex',
  gap: 8,
  fontSize: 14,
  alignItems: 'center',
  '& > img': {
    display: 'inline',
    transform: 'translateY(-4px)',
  },
  '& > svg': {
    display: 'inline',
  },
});

export const ScanGuideline = memo(() => {
  return (
    <Container>
      <ScanWalletsIcon /> Scan with a <SmallTransparentWC /> WalletConnect-supported wallet
    </Container>
  );
});
