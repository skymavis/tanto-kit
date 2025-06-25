import { useContext } from 'react';

import { WidgetRouterContext, WidgetRouterState } from '../contexts/widget-router/WidgetRouterContext';
import { TantoWidgetError, TantoWidgetErrorCodes } from '../utils/errors';

export function useWidgetRouter(): WidgetRouterState {
  const context = useContext(WidgetRouterContext);
  if (context === undefined) {
    throw new TantoWidgetError(
      TantoWidgetErrorCodes.CONTEXT_NOT_INITIALIZED,
      'useWidgetRouter must be used within a WidgetRouterProvider',
    );
  }
  return context;
}
