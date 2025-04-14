import { useContext } from 'react';

import { WidgetContext, WidgetState } from '../contexts/widget/WidgetContext';

export function useWidget(): WidgetState {
  const context = useContext(WidgetContext);
  if (context === undefined) {
    throw new Error('useWidget must be used within a WidgetProvider');
  }
  return context;
}
