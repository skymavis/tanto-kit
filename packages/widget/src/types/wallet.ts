import { ReactNode } from 'react';
import { Connector } from 'wagmi';

export interface Wallet {
  id: string;
  name: string;
  icon: string | ReactNode;
  downloadUrls?: {
    download?: string;
    website?: string;
  };
  connector: Connector;
}
