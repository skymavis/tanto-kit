import { useEffect } from 'react';

import { DELAY_CONNECT } from '../../constants';
import { useConnect } from '../../hooks/useConnect';
import { useWidgetConnect } from '../../hooks/useWidgetConnect';
import { ConnectLayout } from './components/ConnectLayout';

export function ConnectInjector() {
  const { selectedWallet: wallet, selectedConnector: connector } = useWidgetConnect();
  const { status, connect } = useConnect({ connector });

  useEffect(() => {
    const timer = setTimeout(connect, DELAY_CONNECT);
    return () => clearTimeout(timer);
  }, [connect]);

  if (!wallet) return null;

  return <ConnectLayout status={status} walletIcon={wallet.icon} walletName={wallet.name} onRetry={connect} />;
}
