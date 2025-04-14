import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

import { ThemeMode } from '../../types';
import { Wallet } from '../../types/wallet';
import { ThemeProvider } from '../theme/ThemeProvider';
import { WidgetProvider } from '../widget/WidgetProvider';
import { TantoContext } from './TantoContext';

interface TantoProviderProps {
  theme?: ThemeMode;
  children: ReactNode;
}

export function TantoProvider(props: TantoProviderProps) {
  const { theme, children } = props;
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const contextValue = useMemo(
    () => ({
      wallet,
      connector: wallet?.connector ?? null,
      setWallet,
    }),
    [wallet],
  );

  return (
    <TantoContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <WidgetProvider>{children}</WidgetProvider>
      </ThemeProvider>
    </TantoContext.Provider>
  );
}
