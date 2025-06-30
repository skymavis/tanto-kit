import styled from '@emotion/styled';

import { formatBalance } from '../../../utils/balance';

const BalanceText = styled.p(({ theme }) => ({
  fontSize: '1em',
  lineHeight: '1.375em',
  color: theme.mutedText,
}));

interface BalanceDisplayProps {
  isLoading: boolean;
  balanceData?: { value: bigint };
}

export function BalanceDisplay({ isLoading, balanceData }: BalanceDisplayProps) {
  return <BalanceText>{`${isLoading ? '--' : !balanceData ? 0 : formatBalance(balanceData.value)} RON`}</BalanceText>;
}
