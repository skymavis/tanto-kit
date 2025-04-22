import { ReactNode } from 'react';

import { Box } from '../../../components/box/Box';
import { ConnectState } from '../../../types';
import { ConnectContent } from './ConnectContent';
import { ConnectLogo } from './ConnectLogo';

interface ConnectLayoutProps {
  children?: ReactNode;
  status: ConnectState;
  walletIcon: ReactNode;
  walletName: string;
  wcUri?: string;
  onRetry?: () => void;
}

export const ConnectLayout = ({ status, walletIcon, walletName, children, wcUri, onRetry }: ConnectLayoutProps) => {
  return (
    <Box vertical align="center" justify="center" gap={20} pt={20}>
      <ConnectLogo walletIcon={walletIcon} status={status} />
      <ConnectContent walletName={walletName} status={status} wcUri={wcUri} onRetry={onRetry} />
      {children}
    </Box>
  );
};
