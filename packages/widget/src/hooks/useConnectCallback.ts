import type { AccountConnectionCallback } from '../types/connect';
import { useAccountEffect } from './useAccountEffect';

export function useConnectCallback({ onConnect, onDisconnect }: AccountConnectionCallback) {
  useAccountEffect({
    onConnect: ({ address, chainId, connector, isReconnected }) => {
      if (!isReconnected) {
        onConnect?.({
          address,
          chainId,
          connectorId: connector?.id,
        });
      }
    },
    onDisconnect,
  });
}
