import styled from '@emotion/styled';

import { ScanWalletsIcon } from '../../../assets/ScanWalletsIcon';
import { SmallTransparentWC } from '../../../assets/SmallTransparentWC';
import { Box } from '../../../components/box/Box';

const Container = styled(Box)({
  gap: 8,
  fontSize: 14,
  alignItems: 'center',
  '& > img': {
    transform: 'translateY(-4px)',
  },
  '& > svg': {
    display: 'inline',
  },
});

export const ScanGuideline = () => {
  return (
    <Container>
      <ScanWalletsIcon />
      Scan with a <SmallTransparentWC /> WalletConnect-supported wallet
    </Container>
  );
};
