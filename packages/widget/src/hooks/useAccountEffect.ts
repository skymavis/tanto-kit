import { useRef } from 'react';
import type { UseAccountEffectParameters } from 'wagmi';
import { useAccountEffect as useWagmiAccountEffect } from 'wagmi';

import { useAuth } from '../contexts/auth/useAuth';
import { useAuthEffect } from './useAuthEffect';

type WagmiAccountEffectOnConnectParameters = Parameters<Required<UseAccountEffectParameters>['onConnect']>[0];

export function useAccountEffect({ onConnect, onDisconnect }: UseAccountEffectParameters) {
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

  useAuthEffect({
    onSuccess: () => {
      const pendingConnection = pendingConnectionRef.current;
      if (pendingConnection) {
        onConnect?.(pendingConnection);
        pendingConnectionRef.current = null;
      }
    },
  });
}
