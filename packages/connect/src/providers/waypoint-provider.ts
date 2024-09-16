import { RoninWaypointWallet } from '@sky-mavis/waypoint';

import { SupportedChainIds } from '../common/chain';
import { WaypointConnector } from '../connectors/waypoint/WaypointConnector';
import { ConnectorError, ConnectorErrorType } from '../types/connector-error';

const DEFAULT_ID_ORIGIN = 'https://waypoint.roninchain.com';
const CLIENT_ID = 'ced25363-9cab-4e50-b1bc-0e583b93c3a2';

export const requestWaypointProvider = (chainId?: number) => {
  const waypointProvider = RoninWaypointWallet.create({
    idOrigin: DEFAULT_ID_ORIGIN,
    clientId: CLIENT_ID,
    chainId: chainId || SupportedChainIds.RoninMainet,
  });

  if (!waypointProvider) {
    throw new ConnectorError(ConnectorErrorType.PROVIDER_NOT_FOUND);
  }

  return new WaypointConnector(waypointProvider);
};
