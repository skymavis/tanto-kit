import { Box } from '../../../components/box/Box';
import type { ConnectState } from '../../../types/connect';
import type { Wallet } from '../../../types/wallet';
import { ConnectContent } from './ConnectContent';
import { ConnectLogo } from './ConnectLogo';

interface ConnectLayoutProps {
  wallet: Wallet;
  status: ConnectState;
  wcUri?: string;
  onRetry?: () => void;
}

export function ConnectLayout({ status, wallet, wcUri, onRetry }: ConnectLayoutProps) {
  return (
    <Box vertical align="center" justify="center" gap={32} pt={20}>
      <ConnectLogo walletIcon={wallet.icon} status={status} />
      <ConnectContent wallet={wallet} status={status} wcUri={wcUri} onRetry={onRetry} />
    </Box>
  );
}
