import { useContext } from 'react';

import { WidgetModalContext, WidgetModalState } from '../contexts/widget-modal/WidgetModalContext';
import { TantoWidgetError, TantoWidgetErrorCodes } from '../utils/errors';

export function useWidgetModal(): WidgetModalState {
  const context = useContext(WidgetModalContext);
  if (context === undefined) {
    throw new TantoWidgetError(
      TantoWidgetErrorCodes.CONTEXT_NOT_INITIALIZED,
      'useWidgetModal must be used within a WidgetModalProvider',
    );
  }
  return context;
}
