import styled from '@emotion/styled';
import { memo } from 'react';

import { ScanWalletsIcon } from '../../../assets/ScanWalletsIcon';
import { SmallTransparentWC } from '../../../assets/SmallTransparentWC';

const Container = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 8,
  fontSize: '0.875em',
  whiteSpace: 'nowrap',
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
