import { useEffect, useRef } from 'react';
import { useAccountEffect as useWagmiAccountEffect, UseAccountEffectParameters } from 'wagmi';

import { useAuth } from '../contexts/auth/useAuth';
import { useAuthEvents } from './useAuthEvents';

type WagmiAccountEffectOnConnectParameters = Parameters<Required<UseAccountEffectParameters>['onConnect']>[0];

export function useAccountEffect({ onConnect, onDisconnect }: UseAccountEffectParameters) {
  const { onSignInSuccess } = useAuthEvents();
  const { enable: enableAuth } = useAuth();
  const pendingConnectionRef = useRef<WagmiAccountEffectOnConnectParameters | null>(null);

  useWagmiAccountEffect({
    onConnect: data => {
      if (!enableAuth) {
        onConnect?.(data);
        return;
      }
      pendingConnectionRef.current = data;
    },
    onDisconnect: () => {
      pendingConnectionRef.current = null;
      onDisconnect?.();
    },
  });

  useEffect(() => {
    const unsubscribe = onSignInSuccess(() => {
      const pendingConnection = pendingConnectionRef.current;
      if (pendingConnection) {
        onConnect?.(pendingConnection);
        pendingConnectionRef.current = null;
      }
    });
    return unsubscribe;
  }, [onConnect]);
}
