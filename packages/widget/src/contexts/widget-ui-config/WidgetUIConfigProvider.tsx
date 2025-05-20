import { PropsWithChildren, useMemo } from 'react';

import { WidgetUIConfig, WidgetUIConfigContext, WidgetUIConfigState } from './WidgetUIConfigContext';

export type WidgetConfigProviderProps = PropsWithChildren<WidgetUIConfigState>;

export const WidgetConfigProvider = ({ children, config: customConfig }: WidgetConfigProviderProps) => {
  const defaultConfig: WidgetUIConfig = {
    markKeylessWalletConnected: false,
  };

  const config = useMemo<WidgetUIConfig>(() => Object.assign({}, defaultConfig, customConfig), [customConfig]);
  const contextValue = useMemo(() => ({ config }), [config]);

  return <WidgetUIConfigContext.Provider value={contextValue}>{children}</WidgetUIConfigContext.Provider>;
};
