import { WaypointProvider } from '@sky-mavis/waypoint';

import { ChainIds } from '../common/chain';
import { ConnectorError, ConnectorErrorType } from '../types/connector-error';

export type WaypointScope = 'openid' | 'profile' | 'email' | 'wallet';

export interface IWaypointProviderConfigs {
  chainId?: number;
  clientId?: string;
  waypointOrigin?: string;
  scopes?: WaypointScope[];
}

export const requestWaypointProvider = (configs?: IWaypointProviderConfigs) => {
  const { chainId, clientId, waypointOrigin, scopes } = configs || {};

  const waypointProvider = WaypointProvider.create({
    clientId: clientId as string,
    chainId: chainId || ChainIds.RoninMainnet,
    waypointOrigin,
    scopes,
  });

  if (!waypointProvider) {
    throw new ConnectorError(ConnectorErrorType.PROVIDER_NOT_FOUND);
  }

  return waypointProvider;
};
