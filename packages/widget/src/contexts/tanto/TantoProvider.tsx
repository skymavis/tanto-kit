import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import { type ReactNode, useMemo } from 'react';
import { useChains } from 'wagmi';

import { useConnectCallback } from '../../hooks/useConnectCallback';
import { usePreloadTantoImages } from '../../hooks/usePreloadImages';
import { AccountConnectionCallback } from '../../types/connect';
import { WidgetTheme } from '../../types/theme';
import { ThemeProvider } from '../theme/ThemeProvider';
import { WidgetModalProvider } from '../widget-modal/WidgetModalProvider';
import { TantoConfig, TantoContext } from './TantoContext';

export type TantoProviderProps = AccountConnectionCallback & {
  children?: ReactNode;
  theme?: WidgetTheme['name'];
  config?: TantoConfig;
};

export function TantoProvider({ config: customConfig, theme, onConnect, onDisconnect, children }: TantoProviderProps) {
  usePreloadTantoImages();
  useConnectCallback({
    onConnect,
    onDisconnect,
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

  return (
    <TantoContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <MotionConfig reducedMotion={config.reducedMotion ? 'always' : 'never'}>
          <LazyMotion features={domAnimation} strict>
            <WidgetModalProvider>{children}</WidgetModalProvider>
          </LazyMotion>
        </MotionConfig>
      </ThemeProvider>
    </TantoContext.Provider>
  );
}
