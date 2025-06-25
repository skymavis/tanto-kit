import { useEffect, useRef } from 'react';
import { useAccountEffect as useWagmiAccountEffect, UseAccountEffectParameters } from 'wagmi';

import { useAuthEvents } from '../contexts/auth/AuthProvider';
import { WagmiOnConnectParameters } from '../types/connect';
import { useAuth } from './useAuth';

export function useAccountEffect({ onConnect, onDisconnect }: UseAccountEffectParameters) {
  const { onSignInSuccess } = useAuthEvents();
  const { enable: enableAuth } = useAuth();
  const pendingConnectionRef = useRef<WagmiOnConnectParameters | null>(null);

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
