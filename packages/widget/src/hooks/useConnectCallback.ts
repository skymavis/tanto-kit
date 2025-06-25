import type { AccountConnectionCallback } from '../types/connect';
import { useAccountEffect } from './useAccountEffect';

export const useConnectCallback = ({ onConnect, onDisconnect }: AccountConnectionCallback) => {
  useAccountEffect({
    onConnect: ({ address, chainId, connector, isReconnected }) => {
      if (isReconnected) return;
      onConnect?.({
        address,
        chainId,
        connectorId: connector?.id,
      });
    },
    onDisconnect,
  });
};
