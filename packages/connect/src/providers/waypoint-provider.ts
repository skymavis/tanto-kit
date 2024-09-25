import { WaypointProvider } from '@sky-mavis/waypoint';

import { ChainIds } from '../common/chain';
import { WAYPOINT_CLIENT_ID } from '../common/constant';
import { ConnectorError, ConnectorErrorType } from '../types/connector-error';

export interface IWaypointProviderConfigs {
  chainId?: number;
  clientId?: string;
  waypointOrigin?: string;
}

export const requestWaypointProvider = (configs?: IWaypointProviderConfigs) => {
  const { chainId, clientId, waypointOrigin } = configs || {};

  const waypointProvider = WaypointProvider.create({
    clientId: clientId || WAYPOINT_CLIENT_ID,
    chainId: chainId || ChainIds.RoninMainnet,
    waypointOrigin,
  });

  if (!waypointProvider) {
    throw new ConnectorError(ConnectorErrorType.PROVIDER_NOT_FOUND);
  }

  return waypointProvider;
};
