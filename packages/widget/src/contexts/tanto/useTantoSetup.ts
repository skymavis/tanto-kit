import { useEffect } from 'react';
import { useChains } from 'wagmi';

import { analytic } from '../../analytic';
import { MPC_BASE_URL, MPC_BASE_URL_V1, MPC_SOCKET_URL, WAYPOINT_BASE_URL } from '../../constants';
import { usePreloadTantoImages } from '../../hooks/usePreloadImages';
import { useSolveRoninConnectionConflict } from '../../hooks/useSolveRoninConnectionConflict';
import { headlessInjector } from '../../services/headlessInjector';
import { TantoWidgetError, TantoWidgetErrorCodes } from '../../utils/errors';
import type { TantoConfig } from './TantoContext';

export function useTantoSetup(customConfig: TantoConfig) {
  const chains = useChains();

  useSolveRoninConnectionConflict();
  usePreloadTantoImages();

  const config: TantoConfig = {
    reducedMotion: false,
    disableProfile: false,
    hideConnectSuccessPrompt: false,
    createAccountOnConnect: false,
    showConfirmationModal: false,
    initialChainId: chains?.[0]?.id,
    __internal_waypointBaseUrl: WAYPOINT_BASE_URL,
    __internal_mpcBaseUrlV1: MPC_BASE_URL_V1,
    __internal_mpcBaseUrl: MPC_BASE_URL,
    __internal_mpcSocketUrl: MPC_SOCKET_URL,
    excludedWalletIds: [],
    excludedSocialProviders: [],
    ...customConfig,
  };

  if (config.createAccountOnConnect && !config.clientId) {
    throw new TantoWidgetError(
      TantoWidgetErrorCodes.CLIENT_ID_REQUIRED,
      'clientId is required when createAccountOnConnect is enabled',
    );
  }
  const headlessConfig = headlessInjector.resolve('headlessConfig');
  if (config?.__internal_waypointBaseUrl) headlessConfig.waypointBaseUrl = config.__internal_waypointBaseUrl;
  if (config?.__internal_mpcBaseUrlV1) headlessConfig.mpcBaseUrlV1 = config.__internal_mpcBaseUrlV1;
  if (config?.__internal_mpcBaseUrl) headlessConfig.mpcBaseUrl = config.__internal_mpcBaseUrl;
  if (config?.__internal_mpcSocketUrl) headlessConfig.mpcSocketUrl = config.__internal_mpcSocketUrl;
  if (config?.clientId) headlessConfig.clientId = config.clientId;

  useEffect(() => {
    analytic.updateSession({});
    analytic.sendEvent('sdk_init', { config });
  }, []);

  return config;
}
