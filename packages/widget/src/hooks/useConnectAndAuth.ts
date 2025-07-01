import { useCallback, useEffect, useMemo } from 'react';
import { type Connector, useDisconnect } from 'wagmi';

import { analytic } from '../analytic';
import { useAuth } from '../contexts/auth/useAuth';
import { ConnectState } from '../types/connect';
import { useConnect } from './useConnect';
import { useUnmount } from './useUnmount';

interface UseConnectAndAuthParameters {
  connector?: Connector;
}

export function useConnectAndAuth({ connector }: UseConnectAndAuthParameters) {
  const { signIn, isSigningIn, enable: enableAuth, error: authError, reset: resetAuth } = useAuth();
  const { disconnect } = useDisconnect();

  const {
    status: connectStatus,
    connect: baseConnect,
    error: connectError,
  } = useConnect({
    connector,
    onError: error => {
      console.debug('Connect error:', error);
    },
    onSuccess: () => {
      if (enableAuth) signIn();
    },
  });

  const error = useMemo(() => connectError || authError, [connectError, authError]);

  const connect = useCallback(() => {
    if (!connector) return;

    resetAuth();

    analytic.sendEvent('wallet_connect_attempt', {
      chain_id: connector.chainId,
      wallet_type: connector.name,
    });

    baseConnect();
  }, [connector, resetAuth, baseConnect]);

  const status = useMemo(() => {
    if (isSigningIn) return ConnectState.AUTHENTICATING;
    if (authError) return ConnectState.FAILED;
    if (connectStatus === ConnectState.SUCCESS && enableAuth && isSigningIn) return ConnectState.AUTHENTICATING;
    return connectStatus;
  }, [connectStatus, enableAuth, isSigningIn, authError]);

  useEffect(() => {
    resetAuth();
  }, []);

  useUnmount(() => {
    resetAuth();
    if (isSigningIn) disconnect();
  });

  useEffect(() => {
    if (status === ConnectState.FAILED && error) {
      analytic.sendEvent('wallet_connect_fail', {
        chain_id: connector?.chainId,
        wallet_type: connector?.name,
        error_reason: error.message,
      });
    }
  }, [status, error, connector]);

  return {
    status,
    connector,
    connect,
    error,
  };
}
