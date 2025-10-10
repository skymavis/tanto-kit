import { Deposit } from '@sky-mavis/waypoint/deposit';

import { getConfig } from '../utils/storage';

export * from '@sky-mavis/waypoint/deposit';

export const createDeposit = () => {
  const config = getConfig();

  return new Deposit({
    clientId: config?.keylessWalletConfig?.clientId ?? '',
    waypointOrigin: config?.keylessWalletConfig?.waypointOrigin,
  });
};
