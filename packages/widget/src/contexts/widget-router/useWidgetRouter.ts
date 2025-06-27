import { useContext } from 'react';

import { TantoWidgetError, TantoWidgetErrorCodes } from '../../utils/errors';
import { WidgetRouterContext } from './WidgetRouterContext';

export function useWidgetRouter() {
  const context = useContext(WidgetRouterContext);
  if (context === undefined)
    throw new TantoWidgetError(
      TantoWidgetErrorCodes.CONTEXT_NOT_INITIALIZED,
      'useWidgetRouter must be used within a WidgetRouterProvider',
    );
  return context;
}
