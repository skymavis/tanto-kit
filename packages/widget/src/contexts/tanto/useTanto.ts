import { useContext } from 'react';

import { TantoWidgetError, TantoWidgetErrorCodes } from '../../utils/errors';
import { TantoContext } from './TantoContext';

export function useTanto() {
  const context = useContext(TantoContext);
  if (context === undefined) {
    throw new TantoWidgetError(
      TantoWidgetErrorCodes.CONTEXT_NOT_INITIALIZED,
      'useTanto must be used within a TantoProvider',
    );
  }
  return context;
}
