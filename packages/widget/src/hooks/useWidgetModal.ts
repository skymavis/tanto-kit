import { useContext } from 'react';

import { WidgetModalContext, WidgetModalState } from '../contexts/widget-modal/WidgetModalContext';

export function useWidgetModal(): WidgetModalState {
  const context = useContext(WidgetModalContext);
  if (context === undefined) {
    throw new Error('useWidgetModal must be used within a WidgetModalProvider');
  }
  return context;
}
