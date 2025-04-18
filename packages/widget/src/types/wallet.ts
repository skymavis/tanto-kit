import { ReactNode } from 'react';
import { Connector } from 'wagmi';

export interface WalletConfig {
  id: string;
  name: string;
  icon: string | ReactNode;
  iconOnList?: ReactNode;
  descriptionOnList?: string;
  highlightOnList?: boolean;
  downloadUrls?: {
    download?: string;
    website?: string;
  };
}

export type Wallet = WalletConfig & {
  connector: Connector | null;
  isInstalled?: boolean;
  // In case of navigate to In-app Ronin Wallet
  alternativeConnectAction?: () => void;
};
