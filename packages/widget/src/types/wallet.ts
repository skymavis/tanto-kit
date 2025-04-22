import { ReactNode } from 'react';
import { Connector } from 'wagmi';

export interface WalletConfig {
  id: string;
  name: string;
  icon: string | ReactNode;
  iconOnList?: ReactNode;
  descriptionOnList?: string;
  highlightOnList?: boolean;
  downloadUrl?: string;
}

export type Wallet = WalletConfig & {
  connector: Connector | null;
  isInstalled?: boolean;
};
