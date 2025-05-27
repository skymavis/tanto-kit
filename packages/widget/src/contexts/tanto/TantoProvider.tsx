import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import { type ReactNode, useEffect, useMemo } from 'react';
import { useChains } from 'wagmi';

import { analytic } from '../../analytic';
import { RONIN_WALLET_APP_DEEPLINK } from '../../constants';
import { useConnectCallback } from '../../hooks/useConnectCallback';
import { usePreloadTantoImages } from '../../hooks/usePreloadImages';
import { useSolveRoninConnectionConflict } from '../../hooks/useSolveRoninConnectionConflict';
import { useWalletConnectListener } from '../../hooks/useWalletConnectListener';
import { AccountConnectionCallback } from '../../types/connect';
import { isMobile } from '../../utils';
import { openWindow } from '../../utils/openWindow';
import { ThemeProvider, ThemeProviderProps } from '../theme/ThemeProvider';
import { WidgetModalProvider } from '../widget-modal/WidgetModalProvider';
import { TantoConfig, TantoContext } from './TantoContext';

export type TantoProviderProps = AccountConnectionCallback & {
  children?: ReactNode;
  config?: TantoConfig;
} & ThemeProviderProps;

export function TantoProvider({
  config: customConfig,
  theme,
  customThemeToken,
  onConnect,
  onDisconnect,
  children,
}: TantoProviderProps) {
  useSolveRoninConnectionConflict();
  usePreloadTantoImages();
  useConnectCallback({
    onConnect,
    onDisconnect,
  });
  useWalletConnectListener({
    onSignRequest: () => {
      if (isMobile()) openWindow(RONIN_WALLET_APP_DEEPLINK);
    },
  });

  const chains = useChains();

  const defaultTantoConfig: TantoConfig = {
    reducedMotion: false,
    disableProfile: false,
    hideConnectSuccessPrompt: false,
    initialChainId: chains?.[0]?.id,
  };

  const config = useMemo<TantoConfig>(() => Object.assign({}, defaultTantoConfig, customConfig), [customConfig]);
  const contextValue = useMemo(() => ({ config }), [config]);

  /* Start Analytic Session */
  useEffect(() => {
    analytic.updateSession({
      buildVersion: __sdkVersion,
    });
  }, []);

  return (
    <TantoContext.Provider value={contextValue}>
      <ThemeProvider theme={theme} customThemeToken={customThemeToken}>
        <MotionConfig reducedMotion={config.reducedMotion ? 'always' : 'never'}>
          <LazyMotion features={domAnimation} strict>
            <WidgetModalProvider>{children}</WidgetModalProvider>
          </LazyMotion>
        </MotionConfig>
      </ThemeProvider>
    </TantoContext.Provider>
  );
}
