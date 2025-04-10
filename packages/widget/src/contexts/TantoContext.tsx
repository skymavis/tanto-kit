import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

import { ThemeMode } from '../types';
import { ThemeProvider } from './ThemeContext';
import { WidgetProvider } from './WidgetContext';

interface TantoState {}

const TantoContext = createContext<TantoState | undefined>(undefined);

interface TantoProviderProps {
  theme?: ThemeMode;
  children: ReactNode;
}

export function TantoProvider(props: TantoProviderProps) {
  const { theme, children } = props;
  return (
    <TantoContext.Provider value={{}}>
      <ThemeProvider theme={theme}>
        <WidgetProvider>{children}</WidgetProvider>
      </ThemeProvider>
    </TantoContext.Provider>
  );
}

export function useTanto() {
  const context = useContext(TantoContext);
  if (!context) throw new Error('useTanto must be used within an TantoProvider');
  return context;
}
