import { useAccount } from 'wagmi';

import { Button } from './components/button/Button';
import { useWidget } from './hooks/useWidget';

export function TantoConnectButton() {
  const { isConnected } = useAccount();
  const { show } = useWidget();

  return <Button onClick={show}>{isConnected ? 'Profile' : 'Connect'}</Button>;
}
