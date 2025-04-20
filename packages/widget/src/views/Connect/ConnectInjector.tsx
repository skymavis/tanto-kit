import { useCallback, useEffect, useState } from 'react';
import { useConnect } from 'wagmi';

import { Box } from '../../components/box/Box';
import { DELAY_CONNECT } from '../../constants';
import { useTanto } from '../../hooks/useTanto';
import { ConnectContent } from './components/ConnectContent';
import { ConnectLogo } from './components/ConnectLogo';
import { CONNECT_STATES, ConnectState } from './types';

export function ConnectInjector() {
  const [status, setStatus] = useState<ConnectState>(CONNECT_STATES.CONNECTING);
  const { wallet, connector } = useTanto();

  const triggerConnect = useCallback(() => {
    if (connector) {
      connect({ connector });
    }
  }, [connector]);

  const { connect } = useConnect({
    mutation: {
      onMutate: () => setStatus(CONNECT_STATES.CONNECTING),
      onError: () => setStatus(CONNECT_STATES.FAILED),
      onSuccess: () => setStatus(CONNECT_STATES.CONNECTED),
    },
  });

  useEffect(() => {
    const timer = setTimeout(triggerConnect, DELAY_CONNECT);
    return () => clearTimeout(timer);
  }, [triggerConnect]);

  if (!wallet || !connector) return null;

  return (
    <Box vertical align="center" justify="center" gap={32} pt={20}>
      <ConnectLogo walletIcon={wallet.icon} status={status} />
      <ConnectContent walletName={wallet.name} status={status} onRetry={triggerConnect} />
    </Box>
  );
}
