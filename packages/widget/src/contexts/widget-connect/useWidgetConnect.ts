import { useContext } from 'react';

import { TantoWidgetError, TantoWidgetErrorCodes } from '../../utils/errors';
import { WidgetConnectContext } from './WidgetConnectContext';

export function useWidgetConnect() {
  const context = useContext(WidgetConnectContext);
  if (context === undefined)
    throw new TantoWidgetError(
      TantoWidgetErrorCodes.CONTEXT_NOT_INITIALIZED,
      'useWidgetConnect must be used within a WidgetConnectProvider',
    );
  return context;
}
