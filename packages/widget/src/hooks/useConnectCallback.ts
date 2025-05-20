import { useAccountEffect } from 'wagmi';

import { AccountConnectionCallback } from '../types/connect';

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
    },
    onDisconnect: () => onDisconnect?.(),
  });
};
