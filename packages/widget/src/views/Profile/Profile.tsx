import { useAccount, useBalance } from 'wagmi';

import { Avatar } from '../../components/avatar/Avatar';
import { Box } from '../../components/box/Box';
import { AddressDisplay } from './components/AddressDisplay';
import { BalanceDisplay } from './components/BalanceDisplay';
import { DisconnectButton } from './components/DisconnectButton';

export function Profile() {
  const { address, isConnected } = useAccount();
  const { data: balanceData, isLoading } = useBalance({ address });
  const normalizedAddress = address?.toLowerCase();

  return (
    <Box vertical align="center" gap={32}>
      <Box vertical align="center" gap={20}>
        <Avatar seed={normalizedAddress} size="XXL" showDot={isConnected} />
        <Box vertical align="center" gap={8}>
          <AddressDisplay address={address} />
          <BalanceDisplay isLoading={isLoading} balanceData={balanceData} />
        </Box>
      </Box>
      <DisconnectButton />
    </Box>
  );
}
