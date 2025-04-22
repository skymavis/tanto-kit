import { useCallback, useState } from 'react';
import { Connector, useAccountEffect, useConnect } from 'wagmi';

import { CONNECT_STATES, ConnectState } from '../types';
import { isMobile } from '../utils';

export function useConnectStatus({ connector, onConnect }: { connector: Connector | null; onConnect?: () => void }) {
  const [status, setStatus] = useState<ConnectState>(() => {
    if (connector?.id === 'walletConnect' && isMobile()) return CONNECT_STATES.OPENING_WALLET;
    return CONNECT_STATES.CONNECTING;
  });

  const { connect } = useConnect({
    mutation: {
      onMutate: () => setStatus(CONNECT_STATES.CONNECTING),
      onError: () => setStatus(CONNECT_STATES.FAILED),
      onSuccess: () => setStatus(CONNECT_STATES.CONNECTED),
    },
  });

  useAccountEffect({
    onConnect: () => {
      setStatus(CONNECT_STATES.CONNECTED);
      onConnect?.();
    },
  });

  const triggerConnect = useCallback(() => {
    if (connector) {
      connect({ connector });
    }
  }, [connector, connect]);

  return { status, triggerConnect };
}
