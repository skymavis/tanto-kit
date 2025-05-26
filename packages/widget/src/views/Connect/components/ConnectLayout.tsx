import { Box } from '../../../components/box/Box';
import { ConnectState } from '../../../types/connect';
import { Wallet } from '../../../types/wallet';
import { ConnectContent } from './ConnectContent';
import { ConnectLogo } from './ConnectLogo';

interface ConnectLayoutProps {
  wallet: Wallet;
  status: ConnectState;
  wcUri?: string;
  onRetry?: () => void;
}

export const ConnectLayout = ({ status, wallet, wcUri, onRetry }: ConnectLayoutProps) => {
  return (
    <Box vertical align="center" justify="center" gap={20} pt={20}>
      <ConnectLogo walletIcon={wallet.icon} status={status} />
      <ConnectContent wallet={wallet} status={status} wcUri={wcUri} onRetry={onRetry} />
    </Box>
  );
};
