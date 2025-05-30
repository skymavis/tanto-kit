import { useAccountEffect } from 'wagmi';

import { analytic } from '../analytic';
import type { AccountConnectionCallback } from '../types/connect';

export const useConnectCallback = ({ onConnect, onDisconnect }: AccountConnectionCallback) => {
  useAccountEffect({
    onConnect: ({ address, chainId, connector, isReconnected }) => {
      if (!isReconnected) {
        onConnect?.({
          address,
          chainId,
          connectorId: connector?.id,
        });
      }
      analytic.updateSession({
        userAddress: address,
        force: true,
      });
    },
    onDisconnect: () => {
      onDisconnect?.();
      analytic.updateSession({
        userAddress: undefined,
        force: true,
      });
    },
  });
};
