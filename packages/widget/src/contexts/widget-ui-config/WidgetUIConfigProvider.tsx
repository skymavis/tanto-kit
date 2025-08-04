import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';

import type { WidgetUIConfig, WidgetUIConfigState } from './WidgetUIConfigContext';
import { WidgetUIConfigContext } from './WidgetUIConfigContext';

export type WidgetUIConfigProviderProps = PropsWithChildren<WidgetUIConfigState>;

export function WidgetUIConfigProvider({ children, config: customConfig }: WidgetUIConfigProviderProps) {
  const defaultConfig: WidgetUIConfig = {
    markKeylessWalletConnected: false,
    markWCConnected: false,
  };

  const config = useMemo<WidgetUIConfig>(() => Object.assign({}, defaultConfig, customConfig), [customConfig]);
  const contextValue = useMemo(() => ({ config }), [config]);

  return <WidgetUIConfigContext.Provider value={contextValue}>{children}</WidgetUIConfigContext.Provider>;
}
