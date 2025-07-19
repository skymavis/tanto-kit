import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';

import type { WidgetUIConfig, WidgetUIConfigState } from './WidgetUIConfigContext';
import { WidgetUIConfigContext } from './WidgetUIConfigContext';

export type WidgetUIConfigProviderProps = PropsWithChildren<WidgetUIConfigState>;

const defaultConfig: WidgetUIConfig = {
  markKeylessWalletConnected: false,
  markWCConnected: false,
};

export function WidgetUIConfigProvider({ children, isModal, config: customConfig }: WidgetUIConfigProviderProps) {
  const mergedConfig = useMemo<WidgetUIConfig>(() => ({ ...defaultConfig, ...customConfig }), [customConfig]);

  const contextValue = useMemo(() => ({ isModal, config: mergedConfig }), [isModal, mergedConfig]);

  return <WidgetUIConfigContext.Provider value={contextValue}>{children}</WidgetUIConfigContext.Provider>;
}
