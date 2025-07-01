import { useEffect } from 'react';
import { useConfig } from 'wagmi';

import { WAYPOINT_ORIGINS } from '../../constants';
import { authEventEmitter } from '../../hooks/useAuthEffect';
import { isWaypointConnector } from '../../utils/walletDetection';

export interface WaypointMessageData {
  method: string;
  type: 'success' | 'fail';
  data?: {
    address: string;
    id_token: string;
  };
  error?: Error;
}

export function useWaypointMessageHandler(enableAuth: boolean) {
  const { connectors } = useConfig();

  const waypointConnector = connectors.find(connector => isWaypointConnector(connector.id));

  useEffect(() => {
    if (!enableAuth) return;

    const handleMessage = async ({ data, origin }: MessageEvent<WaypointMessageData>) => {
      if (!WAYPOINT_ORIGINS.includes(origin as any)) return;
      if (data.method !== 'auth') return;

      const chainId = (await waypointConnector?.getChainId()) ?? 2020;

      if (data.type === 'success' && data.data) {
        const { address, id_token } = data.data;
        authEventEmitter.emit('success', {
          address,
          chainId,
          token: id_token,
        });
      }

      if (data.type === 'fail' && data.error) {
        authEventEmitter.emit('failed', { error: data.error });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [enableAuth, waypointConnector]);
}
