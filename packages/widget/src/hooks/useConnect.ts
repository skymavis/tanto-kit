import { useCallback, useEffect, useState } from 'react';
import { Connector, useConfig, useConnect as useWagmiConnect } from 'wagmi';

import { ConnectState } from '../types/connect';
import { isMobile, isWCConnector } from '../utils';
import { useTantoConfig } from './useTantoConfig';

interface UseConnectParameters {
  connector?: Connector;
}

export function useConnect({ connector }: UseConnectParameters) {
  const { setState } = useConfig();
  const { initialChainId, disableProfile, hideConnectSuccessPrompt } = useTantoConfig();
  const { status: wagmiStatus, connect: wagmiConnect } = useWagmiConnect({
    mutation: {
      onError(error) {
        console.debug(error);
      },
    },
  });
  const [status, setStatus] = useState<ConnectState>(ConnectState.PENDING);

  const connect = useCallback(() => {
    if (!connector) return;
    if (disableProfile) setState(prev => ({ ...prev, current: null }));
    wagmiConnect({ connector, chainId: initialChainId });
  }, [connector, disableProfile, wagmiConnect]);

  useEffect(() => {
    setStatus(prevStatus => {
      switch (wagmiStatus) {
        case 'idle':
        case 'pending':
          return isWCConnector(connector?.id) && isMobile() ? ConnectState.OPENING_WALLET : ConnectState.PENDING;
        case 'success':
          return hideConnectSuccessPrompt ? prevStatus : ConnectState.SUCCESS;
        case 'error':
          return ConnectState.ERROR;
        default:
          return ConnectState.PENDING;
      }
    });
  }, [wagmiStatus, connector?.id, disableProfile, hideConnectSuccessPrompt]);

  return { status, connector, connect };
}
