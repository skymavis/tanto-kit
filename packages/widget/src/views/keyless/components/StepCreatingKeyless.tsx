import { useTheme } from '@emotion/react';

import { Hourglass } from '../../../assets/Hourglass';
import { Box } from '../../../components/box/Box';
import { DotLoading } from '../../../components/dot-loading/DotLoading';

export function StepCreatingKeyless() {
  const theme = useTheme();

  return (
    <Box fullWidth vertical align="center" css={{ textAlign: 'center' }}>
      <Hourglass css={{ marginBottom: 32 }} />
      <Box gap={4} mb={8} align="flex-end">
        <p css={{ fontSize: 20, fontWeight: 600, lineHeight: '14px' }}>Creating wallet</p>
        <DotLoading />
      </Box>
      <p css={{ fontSize: 14, fontWeight: 400, color: theme.mutedText, maxWidth: 340, marginBottom: 12 }}>
        Please keep this page open.
      </p>
    </Box>
  );
}
