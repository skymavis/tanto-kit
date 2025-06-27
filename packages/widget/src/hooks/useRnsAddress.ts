import { namehash } from 'viem';
import { useChainId, useReadContract } from 'wagmi';

import { RNS_OWNER_OF_ABI, RNS_UNIFIED_ADDRESS } from '../constants';

export interface UseRnsAddressParameters {
  name?: string;
  chainId?: number;
}

export function useRnsAddress({ name, chainId: targetChainId }: UseRnsAddressParameters) {
  const currentChainId = useChainId();
  const chainId = targetChainId ?? currentChainId;
  const contractAddress = RNS_UNIFIED_ADDRESS[chainId];

  return useReadContract(
    name && contractAddress
      ? {
          address: contractAddress,
          abi: RNS_OWNER_OF_ABI,
          functionName: 'ownerOf',
          // Invalid contract type?
          args: [namehash(name) as unknown as bigint],
          query: {
            staleTime: Infinity,
          },
        }
      : undefined,
  );
}
