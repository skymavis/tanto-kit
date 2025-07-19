import styled from '@emotion/styled';

import { HighFive } from '../../../assets/HighFive';
import { Box } from '../../../components/box/Box';

const StyledTitle = styled.div(({ theme }) => ({
  fontSize: 20,
  color: theme.bodyText,
  fontWeight: 600,
  textAlign: 'center',
}));

const StyledDescription = styled.div(({ theme }) => ({
  fontSize: 14,
  color: theme.mutedText,
  textAlign: 'center',
}));

export function StepSuccess() {
  return (
    <Box fullWidth vertical align="center" mb={12} gap={30}>
      <HighFive />
      <Box vertical align="center" gap={4}>
        <StyledTitle>All set!</StyledTitle>
        <StyledDescription>You can now fully enjoy your wallet.</StyledDescription>
      </Box>
    </Box>
  );
}
