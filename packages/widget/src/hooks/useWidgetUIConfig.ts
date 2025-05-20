import { useContext } from 'react';

import { WidgetUIConfigContext } from '../contexts/widget-ui-config/WidgetUIConfigContext';

export function useWidgetUIConfig() {
  const context = useContext(WidgetUIConfigContext);
  return context?.config ?? {};
}
