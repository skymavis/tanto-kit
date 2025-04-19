import { useCallback, useEffect, useState } from 'react';
import { useConnect } from 'wagmi';

import { Box } from '../../components/box/Box';
import { useTanto } from '../../hooks/useTanto';
import { useWidget } from '../../hooks/useWidget';
import { ConnectContent } from './components/ConnectContent';
import { ConnectLogo } from './components/ConnectLogo';
import { CONNECT_STATES, ConnectState, DELAY_CONNECT, DELAY_HIDE } from './types';

export function ConnectInjector() {
  const [status, setStatus] = useState<ConnectState>(CONNECT_STATES.CONNECTING);
  const { wallet, connector } = useTanto();
  const { hide } = useWidget();

  const triggerConnect = useCallback(() => {
    if (connector) {
      connect({ connector });
    }
  }, [connector]);

  const { connect } = useConnect({
    mutation: {
      onMutate: () => setStatus(CONNECT_STATES.CONNECTING),
      onError: () => setStatus(CONNECT_STATES.FAILED),
      onSuccess: () => {
        setStatus(CONNECT_STATES.CONNECTED);
        setTimeout(() => hide(), DELAY_HIDE);
      },
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
