import { createContext } from 'react';

export interface WidgetUIConfig {
  markKeylessWalletConnected?: boolean;
  markWCConnected?: boolean;
}

export interface WidgetUIConfigState {
  isModal?: boolean;
  config?: WidgetUIConfig;
}

export const WidgetUIConfigContext = createContext<WidgetUIConfigState | undefined>(undefined);
