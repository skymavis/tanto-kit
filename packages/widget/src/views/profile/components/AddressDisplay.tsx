import styled from '@emotion/styled';

import { Box } from '../../../components/box/Box';
import { CopyButton } from '../../../components/copy-button/CopyButton';
import { truncate } from '../../../utils/string';

const AddressText = styled.p({
  fontSize: '1.125em',
  fontWeight: 500,
  lineHeight: '1.75em',
});

interface AddressDisplayProps {
  rns?: string;
  address?: string;
}

export function AddressDisplay({ rns, address }: AddressDisplayProps) {
  const normalizedAddress = address?.toLowerCase();

  return (
    <Box align="center" gap={4} ml={30}>
      <AddressText>{rns ? rns : normalizedAddress ? truncate(normalizedAddress) : '--'}</AddressText>
      <CopyButton variant="plain" value={address} />
    </Box>
  );
}
