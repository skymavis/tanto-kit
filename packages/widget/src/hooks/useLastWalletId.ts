import { useConfig } from 'wagmi';

export const useLastWalletId = () => {
  const { storage } = useConfig();
  return storage?.getItem('recentConnectorId')?.toString() ?? null;
};
