import { WaypointProvider } from '@sky-mavis/waypoint';

import { ChainIds } from '../common/chain';
import { ConnectorError, ConnectorErrorType } from '../types/connector-error';
import { getVersionInfo } from '../utils';

export type WaypointScope = 'openid' | 'profile' | 'email' | 'wallet';

export interface IWaypointProviderConfigs {
  chainId?: number;
  clientId?: string;
  waypointOrigin?: string;
  scopes?: WaypointScope[];
  popupCloseDelay?: number;
  source?: string;
}

export const requestWaypointProvider = (configs?: IWaypointProviderConfigs) => {
  const { chainId, clientId, waypointOrigin, scopes, popupCloseDelay, source } = configs || {};

  const waypointProvider = WaypointProvider.create({
    clientId: clientId as string,
    chainId: chainId || ChainIds.RoninMainnet,
    waypointOrigin,
    scopes,
    popupCloseDelay,
    source: source ?? getVersionInfo(),
  });

  if (!waypointProvider) {
    throw new ConnectorError(ConnectorErrorType.PROVIDER_NOT_FOUND);
  }

  return waypointProvider;
};
