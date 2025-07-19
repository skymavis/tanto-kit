import { useBalance } from 'wagmi';

import { Avatar } from '../../components/avatar/Avatar';
import { Box } from '../../components/box/Box';
import { useAccount } from '../../hooks/useAccount';
import { useRnsName } from '../../hooks/useRnsName';
import { AddressDisplay } from './components/AddressDisplay';
import { BalanceDisplay } from './components/BalanceDisplay';
import { DisconnectButton } from './components/DisconnectButton';

export function Profile() {
  const { isConnected, address, chainId } = useAccount();
  const { data: balanceData, isLoading } = useBalance({ address, chainId });
  const { data: rns } = useRnsName({ address });
  const normalizedAddress = address?.toLowerCase();

  return (
    <Box vertical align="center" gap={32} pt={32}>
      <Box vertical align="center" gap={16}>
        <Avatar seed={normalizedAddress} size="XXL" showDot={isConnected} />
        <Box vertical align="center" gap={4}>
          <AddressDisplay rns={rns} address={address} />
          <BalanceDisplay isLoading={isLoading} balanceData={balanceData} />
        </Box>
      </Box>
      <DisconnectButton />
    </Box>
  );
}
