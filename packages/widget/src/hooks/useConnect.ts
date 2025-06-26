import { useCallback, useEffect, useMemo, useState } from 'react';
import { Connector, useConfig, useConnect as useWagmiConnect } from 'wagmi';

import { analytic } from '../analytic';
import { ConnectState } from '../types/connect';
import { isMobile, isWCConnector } from '../utils';
import { useAuth } from './useAuth';
import { useTantoConfig } from './useTantoConfig';

interface UseConnectParameters {
  connector?: Connector;
}

export function useConnect({ connector }: UseConnectParameters) {
  const { setState } = useConfig();
  const { initialChainId, disableProfile, hideConnectSuccessPrompt } = useTantoConfig();
  const { signIn, isSigningIn, enable: enableAuth, error: authError, resetError: resetAuthError } = useAuth();
  const [status, setStatus] = useState<ConnectState>(ConnectState.PENDING);

  const {
    status: wagmiStatus,
    connect: wagmiConnect,
    error: connectError,
  } = useWagmiConnect({
    mutation: {
      onError(error) {
        console.debug(error);
      },
      onSuccess() {
        if (enableAuth) signIn();
      },
    },
  });

  const connect = useCallback(() => {
    if (!connector) return;
    if (disableProfile) setState(prev => ({ ...prev, current: null }));

    resetAuthError();

    analytic.sendEvent('wallet_connect_attempt', {
      chain_id: connector?.chainId,
      wallet_type: connector?.name,
    });

    wagmiConnect({ connector, chainId: initialChainId });
  }, [connector, disableProfile, resetAuthError, wagmiConnect, initialChainId]);

  const getConnectionStatus = useCallback(
    (wagmiStatus: string, prevStatus: ConnectState): ConnectState => {
      if (authError) return ConnectState.ERROR;

      switch (wagmiStatus) {
        case 'idle':
        case 'pending':
          return isWCConnector(connector?.id) && isMobile() ? ConnectState.OPENING_WALLET : ConnectState.PENDING;

        case 'success':
          if (enableAuth && isSigningIn) return ConnectState.PENDING;
          return hideConnectSuccessPrompt ? prevStatus : ConnectState.SUCCESS;

        case 'error':
          return ConnectState.ERROR;

        default:
          return ConnectState.PENDING;
      }
    },
    [connector?.id, hideConnectSuccessPrompt, enableAuth, isSigningIn, authError],
  );

  const error = useMemo(() => connectError || authError, [connectError, authError]);

  useEffect(() => {
    setStatus(prevStatus => getConnectionStatus(wagmiStatus, prevStatus));
  }, [wagmiStatus, getConnectionStatus]);

  useEffect(() => {
    if (status === ConnectState.ERROR && error) {
      analytic.sendEvent('wallet_connect_fail', {
        chain_id: connector?.chainId,
        wallet_type: connector?.name,
        error_reason: error.message,
      });
    }
  }, [status, error]);

  return {
    status,
    connector,
    connect,
    error,
  };
}
