import { useContext } from 'react';

import { WidgetUIConfigContext } from './WidgetUIConfigContext';

export function useWidgetUIConfig() {
  const context = useContext(WidgetUIConfigContext);
  return context?.config ?? {};
}
