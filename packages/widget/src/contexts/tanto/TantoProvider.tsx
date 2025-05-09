import type { Theme } from '@emotion/react';
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import { type ReactNode, useMemo } from 'react';

import { useConnectCallback } from '../../hooks/useConnectCallback';
import { usePreloadTantoImages } from '../../hooks/usePreloadImages';
import { AccountConnectionCallback } from '../../types/connect';
import { ThemeProvider } from '../theme/ThemeProvider';
import { defaultTantoConfig, TantoConfig, TantoContext } from './TantoContext';

export type TantoProviderProps = AccountConnectionCallback & {
  children?: ReactNode;
  theme?: Theme;
  config?: TantoConfig;
};

export function TantoProvider({ config: customConfig, theme, onConnect, onDisconnect, children }: TantoProviderProps) {
  usePreloadTantoImages();
  useConnectCallback({
    onConnect,
    onDisconnect,
  });

  const config = useMemo<TantoConfig>(() => Object.assign({}, defaultTantoConfig, customConfig), [customConfig]);
  const contextValue = useMemo(() => ({ config }), [config]);

  return (
    <TantoContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <MotionConfig reducedMotion={config.reducedMotion ? 'always' : 'never'}>
          <LazyMotion features={domAnimation} strict>
            {children}
          </LazyMotion>
        </MotionConfig>
      </ThemeProvider>
    </TantoContext.Provider>
  );
}
