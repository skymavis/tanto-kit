import { ExternalProvider } from '@ethersproject/providers';

declare global {
  interface Window {
    ronin?: {
      provider: ExternalProvider;
    };
    ethereum?: ExternalProvider;
    isWalletApp?: boolean;
  }
  interface WindowEventMap {
    'eip6963:announceProvider': CustomEvent;
  }
}
