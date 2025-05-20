import { useContext } from 'react';

import { WidgetRouterContext, WidgetRouterState } from '../contexts/widget-router/WidgetRouterContext';

export function useWidgetRouter(): WidgetRouterState {
  const context = useContext(WidgetRouterContext);
  if (context === undefined) {
    throw new Error('useWidgetRouter must be used within a WidgetRouterProvider');
  }
  return context;
}
