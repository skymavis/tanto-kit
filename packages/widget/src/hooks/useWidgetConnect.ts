import { useContext } from 'react';

import { WidgetConnectContext, WidgetConnectState } from '../contexts/widget-connect/WidgetConnectContext';

export function useWidgetConnect(): WidgetConnectState {
  const context = useContext(WidgetConnectContext);
  if (context === undefined) {
    throw new Error('useWidgetConnect must be used within a WidgetConnectProvider');
  }
  return context;
}
