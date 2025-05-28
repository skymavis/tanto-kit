import type { EIP1193Provider } from 'viem';

declare global {
  interface Window {
    ronin?: {
      provider: EIP1193Provider;
    };
    ethereum?: EIP1193Provider;
    isWalletApp?: boolean;
  }

  const __sdkVersion: string;
}
