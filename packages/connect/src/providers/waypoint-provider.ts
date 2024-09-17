import { RoninWaypointWallet } from '@sky-mavis/waypoint';

import { ChainIds } from '../common/chain';
import { WAYPOINT_CLIENT_ID, WAYPOINT_URL } from '../common/constant';
import { WaypointConnector } from '../connectors/waypoint/WaypointConnector';
import { ConnectorError, ConnectorErrorType } from '../types/connector-error';

export const requestWaypointProvider = (chainId?: number) => {
  const waypointProvider = RoninWaypointWallet.create({
    idOrigin: WAYPOINT_URL,
    clientId: WAYPOINT_CLIENT_ID,
    chainId: chainId || ChainIds.RoninMainet,
  });

  if (!waypointProvider) {
    throw new ConnectorError(ConnectorErrorType.PROVIDER_NOT_FOUND);
  }

  return new WaypointConnector(waypointProvider);
};
