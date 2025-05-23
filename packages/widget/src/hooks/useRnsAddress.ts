import { namehash } from 'viem';
import { useChainId, useReadContract } from 'wagmi';

import { RNS_UNIFIED_ADDRESS } from '../constants';

interface UseRnsAddressParameters {
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
          abi: [
            {
              inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
              name: 'ownerOf',
              outputs: [{ internalType: 'address', name: '', type: 'address' }],
              stateMutability: 'view',
              type: 'function',
            },
          ],
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
