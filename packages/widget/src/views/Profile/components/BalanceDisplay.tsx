import styled from '@emotion/styled';

import { formatBalance } from '../../../utils';

const BalanceText = styled.p(({ theme }) => ({
  fontSize: '1em',
  lineHeight: '1.375em',
  color: theme.colors.neutral,
}));

interface BalanceDisplayProps {
  isLoading: boolean;
  balanceData?: { value: bigint };
}

export function BalanceDisplay({ isLoading, balanceData }: BalanceDisplayProps) {
  return <BalanceText>{`${isLoading || !balanceData ? '--' : formatBalance(balanceData.value)} RON`}</BalanceText>;
}
