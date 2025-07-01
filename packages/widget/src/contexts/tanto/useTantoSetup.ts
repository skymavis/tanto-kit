import { useEffect } from 'react';
import { useChains } from 'wagmi';

import { analytic } from '../../analytic';
import { usePreloadTantoImages } from '../../hooks/usePreloadImages';
import { useSolveRoninConnectionConflict } from '../../hooks/useSolveRoninConnectionConflict';
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
    initialChainId: chains?.[0]?.id,
    ...customConfig,
  };

  if (config.createAccountOnConnect && !config.clientId) {
    throw new TantoWidgetError(
      TantoWidgetErrorCodes.CLIENT_ID_REQUIRED,
      'clientId is required when createAccountOnConnect is enabled',
    );
  }

  useEffect(() => {
    analytic.updateSession({});
    analytic.sendEvent('sdk_init', { tantoConfig: config });
  }, [customConfig]);

  return config;
}
