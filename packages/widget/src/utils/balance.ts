import { formatUnits } from 'viem';

export const formatBalance = (amount: bigint) => {
  const remainder = amount % BigInt(1e14);
  return formatUnits(amount - remainder, 18);
};
