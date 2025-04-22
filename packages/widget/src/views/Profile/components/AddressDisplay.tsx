import styled from '@emotion/styled';

import { Box } from '../../../components/box/Box';
import { CopyButton } from '../../../components/copy-button/CopyButton';
import { truncate } from '../../../utils';

const AddressText = styled.p({
  fontSize: 18,
  lineHeight: '28px',
});

interface AddressDisplayProps {
  address?: string;
}

export function AddressDisplay({ address }: AddressDisplayProps) {
  const normalizedAddress = address?.toLowerCase();

  return (
    <Box align="center" gap={4}>
      <AddressText>{truncate(normalizedAddress)}</AddressText>
      <CopyButton variant="plain" value={address} />
    </Box>
  );
}
