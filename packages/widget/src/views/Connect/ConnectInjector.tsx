import { useEffect } from 'react';

import { DELAY_CONNECT } from '../../constants';
import { useConnectStatus } from '../../hooks/useConnectStatus';
import { useTanto } from '../../hooks/useTanto';
import { ConnectLayout } from './components/ConnectLayout';

export function ConnectInjector() {
  const { wallet, connector } = useTanto();
  const { status, triggerConnect } = useConnectStatus({ connector });

  useEffect(() => {
    const timer = setTimeout(triggerConnect, DELAY_CONNECT);
    return () => clearTimeout(timer);
  }, [triggerConnect]);

  if (!wallet || !connector) return null;

  return <ConnectLayout status={status} walletIcon={wallet.icon} walletName={wallet.name} onRetry={triggerConnect} />;
}
