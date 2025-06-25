import { useAccount as useWagmiAccount } from 'wagmi';

import { useAuth } from './useAuth';

export function useAccount() {
  const wagmiAccount = useWagmiAccount();
  const { enable: enableAuth, isSigningIn } = useAuth();

  if (!enableAuth) return wagmiAccount;

  return {
    ...wagmiAccount,
    isConnected: wagmiAccount.isConnected && !isSigningIn,
    isConnecting: wagmiAccount.isConnecting || isSigningIn,
  };
}
