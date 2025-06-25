import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import { type ReactNode, PropsWithChildren, useEffect, useMemo } from 'react';
import { useAccount, useChains } from 'wagmi';

import { analytic } from '../../analytic';
import { RONIN_WALLET_APP_DEEPLINK } from '../../constants';
import { useConnectCallback } from '../../hooks/useConnectCallback';
import { useConnectorRequestInterceptor } from '../../hooks/useConnectorRequestInterceptor';
import { usePreloadTantoImages } from '../../hooks/usePreloadImages';
import { useSolveRoninConnectionConflict } from '../../hooks/useSolveRoninConnectionConflict';
import { useTantoConfig } from '../../hooks/useTantoConfig';
import { AccountConnectData, AccountConnectionCallback } from '../../types/connect';
import { isMobile, isWCConnector } from '../../utils';
import { openWindow } from '../../utils/openWindow';
import { AuthProvider } from '../auth/AuthProvider';
import { ThemeProvider, ThemeProviderProps } from '../theme/ThemeProvider';
import { WidgetModalProvider } from '../widget-modal/WidgetModalProvider';
import { TantoConfig, TantoContext } from './TantoContext';

export type TantoProviderProps = AccountConnectionCallback &
  ThemeProviderProps & {
    children?: ReactNode;
    config?: TantoConfig;
  };

export function TantoProvider({
  config: customConfig,
  theme,
  customThemeToken,
  children,
  onConnect,
  onDisconnect,
}: TantoProviderProps) {
  const chains = useChains();

  useSolveRoninConnectionConflict();
  usePreloadTantoImages();

  const config = useMemo<TantoConfig>(
    () => ({
      reducedMotion: false,
      disableProfile: false,
      hideConnectSuccessPrompt: false,
      createAccountOnConnect: false,
      initialChainId: chains?.[0]?.id,
      ...customConfig,
    }),
    [customConfig, chains],
  );

  const contextValue = useMemo(() => ({ config }), [config]);

  return (
    <TantoContext.Provider value={contextValue}>
      <ThemeProvider theme={theme} customThemeToken={customThemeToken}>
        <MotionConfig reducedMotion={config.reducedMotion ? 'always' : 'never'}>
          <LazyMotion features={domAnimation} strict>
            <AuthProvider>
              <TantoConnectionHandler onConnect={onConnect} onDisconnect={onDisconnect}>
                {children}
              </TantoConnectionHandler>
            </AuthProvider>
          </LazyMotion>
        </MotionConfig>
      </ThemeProvider>
    </TantoContext.Provider>
  );
}

const TantoConnectionHandler = ({
  children,
  onConnect,
  onDisconnect,
}: PropsWithChildren<Pick<TantoProviderProps, 'onConnect' | 'onDisconnect'>>) => {
  const tantoConfig = useTantoConfig();
  const { connector } = useAccount();

  useConnectorRequestInterceptor({
    beforeRequest: () => {
      const shouldOpenDeepLink = isMobile() && connector && isWCConnector(connector.id);
      if (shouldOpenDeepLink) openWindow(RONIN_WALLET_APP_DEEPLINK);
    },
  });

  useEffect(() => {
    analytic.updateSession({});
    analytic.sendEvent('sdk_init', { tantoConfig });
  }, []);

  useConnectCallback({
    onConnect: (data: AccountConnectData) => {
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

  return <WidgetModalProvider>{children}</WidgetModalProvider>;
};
