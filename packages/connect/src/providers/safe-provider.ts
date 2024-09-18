import { SafeAppProvider } from '@safe-global/safe-apps-provider';
import SafeAppsSDK from '@safe-global/safe-apps-sdk';

import { DEFAULT_DELAY_TIME } from '../common/constant';
import { ConnectorError, ConnectorErrorType } from '../types/connector-error';

export const requestSafeProvider = async (delay = DEFAULT_DELAY_TIME) => {
  const safeSDK = new SafeAppsSDK();
  const safeInfo = await Promise.race([
    safeSDK.safe.getInfo(),
    new Promise<undefined>(resolve => setTimeout(resolve, delay)),
  ]);

  if (!safeInfo) {
    throw new ConnectorError(ConnectorErrorType.PROVIDER_NOT_FOUND);
  }

  const safeProvider = new SafeAppProvider(safeInfo, safeSDK);
  return safeProvider;
};
