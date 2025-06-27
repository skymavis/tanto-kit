import { useEffect } from 'react';

import { DELAY_CONNECT } from '../../constants';
import { useConnectAndAuth } from '../../hooks/useConnectAndAuth';
import { useWidgetConnect } from '../../hooks/useWidgetConnect';
import { ConnectLayout } from './components/ConnectLayout';

export function ConnectInjector() {
  const { selectedWallet, selectedConnector } = useWidgetConnect();
  const { status, connect } = useConnectAndAuth({ connector: selectedConnector });

  useEffect(() => {
    const timer = setTimeout(connect, DELAY_CONNECT);
    return () => clearTimeout(timer);
  }, [connect]);

  if (!selectedWallet) return null;

  return <ConnectLayout wallet={selectedWallet} status={status} onRetry={connect} />;
}
