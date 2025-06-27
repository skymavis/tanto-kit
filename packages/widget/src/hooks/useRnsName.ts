import { Address, namehash } from 'viem';
import { useChainId, useReadContract } from 'wagmi';

import { RNS_PUBLIC_RESOLVER_ADDRESS } from '../constants';
import { getReverseNode } from '../utils/string';

export interface UseRnsNameParameters {
  address?: Address;
  chainId?: number;
}

export function useRnsName({ address, chainId: targetChainId }: UseRnsNameParameters) {
  const currentChainId = useChainId();
  const chainId = targetChainId ?? currentChainId;
  const contractAddress = RNS_PUBLIC_RESOLVER_ADDRESS[chainId];

  return useReadContract(
    address && contractAddress
      ? {
          address: contractAddress,
          abi: [
            {
              inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }],
              name: 'name',
              outputs: [{ internalType: 'string', name: '', type: 'string' }],
              stateMutability: 'view',
              type: 'function',
            },
          ],
          functionName: 'name',
          args: [namehash(getReverseNode(address))],
          query: {
            staleTime: Infinity,
          },
        }
      : undefined,
  );
}
