import type { ReactNode } from 'react';
import { createContext } from 'react';
import type { Prettify } from 'viem';

import type { Route } from '../../types/route';

export interface View {
  route: Route;
  title?: ReactNode;
  content: ReactNode;
  showBackButton?: boolean;
}

export interface WidgetRouterState {
  view: View;
  history: View[];
  goTo: (route: Route, options?: Prettify<Partial<Omit<View, 'route'>>>) => void;
  goBack: () => void;
  reset: (route?: Route) => void;
}

export const WidgetRouterContext = createContext<WidgetRouterState | undefined>(undefined);
