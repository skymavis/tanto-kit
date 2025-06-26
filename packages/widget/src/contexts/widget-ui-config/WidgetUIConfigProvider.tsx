import { PropsWithChildren, useMemo } from 'react';

import { WidgetUIConfig, WidgetUIConfigContext, WidgetUIConfigState } from './WidgetUIConfigContext';

export type WidgetUIConfigProviderProps = PropsWithChildren<WidgetUIConfigState>;

export const WidgetUIConfigProvider = ({ children, config: customConfig }: WidgetUIConfigProviderProps) => {
  const defaultConfig: WidgetUIConfig = {
    markKeylessWalletConnected: false,
    markWCConnected: false,
  };

  const config = useMemo<WidgetUIConfig>(() => Object.assign({}, defaultConfig, customConfig), [customConfig]);
  const contextValue = useMemo(() => ({ config }), [config]);

  return <WidgetUIConfigContext.Provider value={contextValue}>{children}</WidgetUIConfigContext.Provider>;
};
