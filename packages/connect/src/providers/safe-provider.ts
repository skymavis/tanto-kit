import { SafeAppProvider } from '@safe-global/safe-apps-provider';
import SafeAppsSDK from '@safe-global/safe-apps-sdk/dist/types/sdk';

import { DEFAULT_DELAY_TIME } from '../common/constant';
import { SafeConnector } from '../connectors/safe/SafeConnector';
import { ConnectorError, ConnectorErrorType } from '../types/connector-error';

const safeSDK = new SafeAppsSDK();

export const requestSafeProvider = async () => {
  const safeInfo = await Promise.race([
    safeSDK.safe.getInfo(),
    new Promise<undefined>(resolve => setTimeout(resolve, DEFAULT_DELAY_TIME)),
  ]);

  if (!safeInfo) {
    throw new ConnectorError(ConnectorErrorType.PROVIDER_NOT_FOUND);
  }

  const safeProvider = new SafeAppProvider(safeInfo, safeSDK);
  return new SafeConnector(safeProvider);
};
