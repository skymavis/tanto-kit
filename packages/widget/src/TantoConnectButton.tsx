import { useAccount, useDisconnect } from 'wagmi';

import { Button } from './components/button/Button';
import { useWidget } from './hooks/useWidget';

export function TantoConnectButton() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { show, reset } = useWidget();

  return isConnected ? (
    <Button onClick={() => disconnect()}>Disconnect</Button>
  ) : (
    <Button
      onClick={() => {
        reset();
        show();
      }}
    >
      Connect
    </Button>
  );
}
