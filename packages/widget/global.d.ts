import type { EIP1193Provider } from 'viem';

declare global {
  interface Window {
    ronin?: {
      provider: EIP1193Provider;
    };
    ethereum?: EIP1193Provider;
    isWalletApp?: boolean;
  }

  type DeepPartial<T> = T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;
}
