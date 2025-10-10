import { useAccount } from './useAccount';
import { useRnsName } from './useRnsName';

export function useAccountRns() {
  const account = useAccount();
  const { data: rns } = useRnsName({ address: account.address });

  return {
    ...account,
    rns,
  };
}
