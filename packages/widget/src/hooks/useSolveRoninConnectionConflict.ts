import { useEffect } from 'react';
import { useConfig } from 'wagmi';

import { isRoninWallet, isRoninWalletInjected } from '../utils/walletDetection';

// Resolve conflicts caused by having two Ronin connectors with different IDs (RONIN_WALLET and com.roninchain.wallet)
export const useSolveRoninConnectionConflict = () => {
  const { subscribe, setState } = useConfig();
  useEffect(() => {
    const unsubscribe = subscribe(
      state => state,
      (_, prevState) => {
        setState(state => {
          const { connections, current: currentUID } = state;
          if (!currentUID || connections.size <= 1) return state;
          const currentConnection = connections.get(currentUID);
          if (!currentConnection) return state;
          if (isRoninWallet(currentConnection.connector.id)) return state;
          if (isRoninWalletInjected(currentConnection.connector.id)) {
            const tantoConnection = Array.from(connections.values()).find(({ connector }) =>
              isRoninWallet(connector.id),
            );
            if (!tantoConnection) return state;
            return prevState;
          }
          return state;
        });
      },
    );
    return () => unsubscribe();
  }, [subscribe]);
};
