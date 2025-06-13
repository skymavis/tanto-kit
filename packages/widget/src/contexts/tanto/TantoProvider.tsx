import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import { type ReactNode, useEffect, useMemo } from 'react';
import { useAccount, useChains } from 'wagmi';

import { analytic } from '../../analytic';
import { RONIN_WALLET_APP_DEEPLINK } from '../../constants';
import { useConnectCallback } from '../../hooks/useConnectCallback';
import { useConnectorRequestInterceptor } from '../../hooks/useConnectorRequestInterceptor';
import { usePreloadTantoImages } from '../../hooks/usePreloadImages';
import { useSolveRoninConnectionConflict } from '../../hooks/useSolveRoninConnectionConflict';
import { AccountConnectionCallback } from '../../types/connect';
import { isMobile, isWCConnector } from '../../utils';
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
  const { connector } = useAccount();
  useSolveRoninConnectionConflict();
  usePreloadTantoImages();
  useConnectCallback({
    onConnect: data => {
      onConnect?.(data);
      analytic.updateSession({
        userAddress: data.address,
        force: true,
      });
      analytic.sendEvent('wallet_connect_success', {
        wallet_id: data.connectorId,
        address: data.address,
        chain_id: data.chainId,
      });
    },
    onDisconnect: () => {
      onDisconnect?.();
      analytic.sendEvent('sdk_disconnect').then(() => {
        analytic.updateSession({
          userAddress: undefined,
          force: true,
        });
      });
    },
  });
  useConnectorRequestInterceptor({
    beforeRequest: () => {
      if (isMobile() && !!connector && isWCConnector(connector.id)) openWindow(RONIN_WALLET_APP_DEEPLINK);
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
    analytic.updateSession({});
    analytic.sendEvent('sdk_init');
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
