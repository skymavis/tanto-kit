import { useCallback, useEffect, useState } from 'react';
import type { Connector } from 'wagmi';
import { useConfig, useConnect as useWagmiConnect } from 'wagmi';

import { useTantoConfig } from '../contexts/tanto/useTantoConfig';
import { ConnectState } from '../types/connect';
import { isMobile } from '../utils/userAgent';
import { isWCConnector } from '../utils/walletDetection';

type WagmiConnectCallbacks = Pick<
  NonNullable<NonNullable<Parameters<typeof useWagmiConnect>[0]>['mutation']>,
  'onSuccess' | 'onError'
>;

type UseConnectParameters = WagmiConnectCallbacks & {
  connector?: Connector;
};

export function useConnect({ connector, onSuccess, onError }: UseConnectParameters) {
  const { setState } = useConfig();
  const { initialChainId, disableProfile, hideConnectSuccessPrompt } = useTantoConfig();
  const {
    status: wagmiStatus,
    connect: wagmiConnect,
    error,
  } = useWagmiConnect({
    mutation: {
      onSuccess,
      onError,
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

  return { status, connector, connect, error };
}
