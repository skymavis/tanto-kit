import { useAccount } from 'wagmi';

import { Wallet } from '../types/wallet';
import { useWallets } from './useWallets';

export function useConnectedWallet(): Wallet | undefined {
  const { connector } = useAccount();
  const { wallets } = useWallets();
  return connector ? wallets.find(wallet => wallet.connector?.id === connector?.id) : undefined;
}
