import { analytic } from '../../analytic';
import { useConnectCallback } from '../../hooks/useConnectCallback';
import type { AccountConnectData } from '../../types/connect';

export function useConnectionAnalytics() {
  useConnectCallback({
    onConnect: (data: AccountConnectData) => {
      analytic.updateSession({
        userAddress: data.address,
        force: true,
      });
      analytic.sendEvent('wallet_connect_success', {
        wallet_id: data.connectorId,
        address: data.address,
        chain_id: data.chainId,
      });
    },
    onDisconnect: () => {
      analytic.sendEvent('sdk_disconnect').then(() => {
        analytic.updateSession({
          userAddress: undefined,
          force: true,
        });
      });
    },
  });
}
