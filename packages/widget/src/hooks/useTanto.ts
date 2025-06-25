import { useContext } from 'react';

import { TantoContext, TantoState } from '../contexts/tanto/TantoContext';
import { TantoWidgetError, TantoWidgetErrorCodes } from '../utils/errors';

export function useTanto(): TantoState {
  const context = useContext(TantoContext);
  if (context === undefined) {
    throw new TantoWidgetError(
      TantoWidgetErrorCodes.CONTEXT_NOT_INITIALIZED,
      'useTanto must be used within a TantoProvider',
    );
  }
  return context;
}
