import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import type { PropsWithChildren, ReactNode } from 'react';
import { useMemo } from 'react';

import { useConnectCallback } from '../../hooks/useConnectCallback';
import type { AccountConnectionCallback } from '../../types/connect';
import { AuthProvider } from '../auth/AuthProvider';
import type { ThemeProviderProps } from '../theme/ThemeProvider';
import { ThemeProvider } from '../theme/ThemeProvider';
import { WidgetModalProvider } from '../widget-modal/WidgetModalProvider';
import type { TantoConfig } from './TantoContext';
import { TantoContext } from './TantoContext';
import { useConnectionAnalytics } from './useConnectionAnalytics';
import { useDeeplinkHandler } from './useDeeplinkHandler';
import { useTantoSetup } from './useTantoSetup';

export type TantoProviderProps = AccountConnectionCallback &
  ThemeProviderProps & {
    children?: ReactNode;
    config?: TantoConfig;
  };

type ConnectionHandlerProps = PropsWithChildren<AccountConnectionCallback>;

export function TantoProvider({
  config: customConfig = {},
  theme,
  customThemeToken,
  children,
  onConnect,
  onDisconnect,
}: TantoProviderProps) {
  const config = useTantoSetup(customConfig);
  const contextValue = useMemo(() => ({ config }), [config]);

  return (
    <TantoContext.Provider value={contextValue}>
      <ThemeProvider theme={theme} customThemeToken={customThemeToken}>
        <MotionConfig reducedMotion={config.reducedMotion ? 'always' : 'never'}>
          <LazyMotion features={domAnimation} strict>
            <AuthProvider>
              <ConnectionHandler onConnect={onConnect} onDisconnect={onDisconnect}>
                {children}
              </ConnectionHandler>
            </AuthProvider>
          </LazyMotion>
        </MotionConfig>
      </ThemeProvider>
    </TantoContext.Provider>
  );
}

function ConnectionHandler({ children, onConnect, onDisconnect }: ConnectionHandlerProps) {
  useDeeplinkHandler();
  useConnectionAnalytics();
  useConnectCallback({
    onConnect,
    onDisconnect,
  });

  return <WidgetModalProvider>{children}</WidgetModalProvider>;
}
