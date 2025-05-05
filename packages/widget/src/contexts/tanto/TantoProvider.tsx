import type { Theme } from '@emotion/react';
import { domAnimation, LazyMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

import type { Wallet } from '../../types/wallet';
import { ThemeProvider } from '../theme/ThemeProvider';
import { WidgetProvider } from '../widget/WidgetProvider';
import { TantoContext } from './TantoContext';

interface TantoProviderProps {
  theme?: Theme;
  children: ReactNode;
}

export function TantoProvider(props: TantoProviderProps) {
  const { theme, children } = props;
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const contextValue = useMemo(
    () => ({
      wallet,
      setWallet,
      connector: wallet?.connector,
    }),
    [wallet],
  );

  return (
    <TantoContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <LazyMotion features={domAnimation} strict>
          <WidgetProvider>{children}</WidgetProvider>
        </LazyMotion>
      </ThemeProvider>
    </TantoContext.Provider>
  );
}
