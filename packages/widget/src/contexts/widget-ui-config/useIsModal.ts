import { useContext } from 'react';

import { WidgetUIConfigContext } from './WidgetUIConfigContext';

export function useIsModal() {
  const context = useContext(WidgetUIConfigContext);
  return context?.isModal ?? false;
}
