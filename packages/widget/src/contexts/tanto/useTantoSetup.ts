import { useEffect } from 'react';
import { useChains } from 'wagmi';

import { analytic } from '../../analytic';
import { usePreloadTantoImages } from '../../hooks/usePreloadImages';
import { useSolveRoninConnectionConflict } from '../../hooks/useSolveRoninConnectionConflict';
import type { TantoConfig } from './TantoContext';

export function useTantoSetup(customConfig: TantoConfig) {
  const chains = useChains();

  useSolveRoninConnectionConflict();
  usePreloadTantoImages();

  useEffect(() => {
    analytic.updateSession({});
    analytic.sendEvent('sdk_init', { tantoConfig: customConfig });
  }, [customConfig]);

  const config: TantoConfig = {
    reducedMotion: false,
    disableProfile: false,
    hideConnectSuccessPrompt: false,
    createAccountOnConnect: false,
    initialChainId: chains?.[0]?.id,
    ...customConfig,
  };

  return config;
}
