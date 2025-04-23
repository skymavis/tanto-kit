import { useAccount } from 'wagmi';

import { Avatar } from './components/avatar/Avatar';
import { Box } from './components/box/Box';
import { Button } from './components/button/Button';
import { useWidget } from './hooks/useWidget';
import { truncate } from './utils';

export function TantoConnectButton() {
  const { address, isConnected } = useAccount();
  const { show } = useWidget();
  const normalizedAddress = address?.toLocaleLowerCase();

  return (
    <Button intent={isConnected ? 'secondary' : 'primary'} onClick={show}>
      {isConnected ? (
        <Box gap={8}>
          <Avatar seed={normalizedAddress} size={'S'} />
          <p>{truncate(normalizedAddress)}</p>
        </Box>
      ) : (
        'Connect Wallet'
      )}
    </Button>
  );
}
