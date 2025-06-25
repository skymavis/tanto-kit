import { useCallback, useEffect, useRef } from 'react';
import { useAccountEffect as useWagmiAccountEffect, UseAccountEffectParameters } from 'wagmi';

import { useAuthEvents } from '../contexts/auth/AuthProvider';
import { useAuth } from './useAuth';

type AccountConnectData = Parameters<Required<UseAccountEffectParameters>['onConnect']>[0];

export function useAccountEffect({ onConnect, onDisconnect }: UseAccountEffectParameters) {
  const { onSignInSuccess } = useAuthEvents();
  const { enable: enableAuth } = useAuth();
  const pendingConnectionRef = useRef<AccountConnectData | null>(null);

  const handleConnect = useCallback(
    (data: AccountConnectData) => {
      if (!enableAuth) {
        onConnect?.(data);
        return;
      }

      pendingConnectionRef.current = data;
    },
    [enableAuth, onConnect],
  );

  const handleDisconnect = useCallback(() => {
    pendingConnectionRef.current = null;
    onDisconnect?.();
  }, [onDisconnect]);

  const handleSignInSuccess = useCallback(() => {
    const pendingConnection = pendingConnectionRef.current;

    if (pendingConnection) {
      onConnect?.(pendingConnection);
      pendingConnectionRef.current = null;
    }
  }, [onConnect]);

  useWagmiAccountEffect({
    onConnect: handleConnect,
    onDisconnect: handleDisconnect,
  });

  useEffect(() => {
    const unsubscribe = onSignInSuccess(handleSignInSuccess);
    return unsubscribe;
  }, [onSignInSuccess, handleSignInSuccess]);
}
