import { useAccount } from 'wagmi';

import { Button } from './components/button/Button';
import { useWidget } from './hooks/useWidget';

export function TantoConnectButton() {
  const { isConnected, isConnecting } = useAccount();
  const { show } = useWidget();

  return (
    <Button disabled={isConnecting} onClick={show}>
      {isConnected ? 'Profile' : 'Connect'}
    </Button>
  );
}
