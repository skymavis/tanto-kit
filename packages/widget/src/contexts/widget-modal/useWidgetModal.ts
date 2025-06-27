import { useContext } from 'react';

import { TantoWidgetError, TantoWidgetErrorCodes } from '../../utils/errors';
import { WidgetModalContext } from './WidgetModalContext';

export function useWidgetModal() {
  const context = useContext(WidgetModalContext);
  if (context === undefined)
    throw new TantoWidgetError(
      TantoWidgetErrorCodes.CONTEXT_NOT_INITIALIZED,
      'useWidgetModal must be used within a WidgetModalProvider',
    );
  return context;
}
