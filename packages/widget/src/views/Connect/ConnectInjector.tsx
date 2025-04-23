import { useEffect } from 'react';

import { DELAY_CONNECT } from '../../constants';
import { useTanto } from '../../hooks/useTanto';
import { useTriggerConnect } from '../../hooks/useTriggerConnect';
import { ConnectLayout } from './components/ConnectLayout';

export function ConnectInjector() {
  const { wallet, connector } = useTanto();
  const { connect, status } = useTriggerConnect({ connector });

  useEffect(() => {
    const timer = setTimeout(connect, DELAY_CONNECT);
    return () => clearTimeout(timer);
  }, [connect, connector]);

  if (!wallet || !connector) return null;

  return <ConnectLayout status={status} walletIcon={wallet.icon} walletName={wallet.name} onRetry={connect} />;
}
