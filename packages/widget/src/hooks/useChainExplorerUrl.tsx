import { useAccount } from 'wagmi';

export function useChainExplorerUrl() {
  const { chain } = useAccount();
  return chain?.blockExplorers?.default.url;
}
