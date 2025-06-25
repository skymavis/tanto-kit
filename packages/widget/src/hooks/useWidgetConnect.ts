import { useContext } from 'react';

import { WidgetConnectContext, WidgetConnectState } from '../contexts/widget-connect/WidgetConnectContext';
import { TantoWidgetError, TantoWidgetErrorCodes } from '../utils/errors';

export function useWidgetConnect(): WidgetConnectState {
  const context = useContext(WidgetConnectContext);
  if (context === undefined) {
    throw new TantoWidgetError(
      TantoWidgetErrorCodes.CONTEXT_NOT_INITIALIZED,
      'useWidgetConnect must be used within a WidgetConnectProvider',
    );
  }
  return context;
}
