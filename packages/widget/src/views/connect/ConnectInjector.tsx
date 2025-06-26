import { useEffect } from 'react';

import { analytic } from '../../analytic';
import { DELAY_CONNECT } from '../../constants';
import { useConnect } from '../../hooks/useConnect';
import { useWidgetConnect } from '../../hooks/useWidgetConnect';
import { ConnectState } from '../../types/connect';
import { ConnectLayout } from './components/ConnectLayout';

export function ConnectInjector() {
  const { selectedWallet, selectedConnector } = useWidgetConnect();
  const { status, connect, error } = useConnect({ connector: selectedConnector });

  useEffect(() => {
    const timer = setTimeout(() => {
      connect();
      analytic.sendEvent('wallet_connect_attempt', {
        chain_id: selectedConnector?.chainId,
        wallet_type: selectedWallet?.name,
      });
    }, DELAY_CONNECT);
    return () => clearTimeout(timer);
  }, [connect, selectedConnector, selectedWallet]);

  useEffect(() => {
    if (status === ConnectState.ERROR && error) {
      analytic.sendEvent('wallet_connect_fail', {
        chain_id: selectedConnector?.chainId,
        wallet_type: selectedWallet?.name,
        error_reason: error.message,
      });
    }
  }, [status, error, selectedConnector, selectedWallet]);

  if (!selectedWallet) return null;

  return <ConnectLayout wallet={selectedWallet} status={status} onRetry={connect} />;
}
