import { createContext, ReactNode } from 'react';

import { Route } from '../../types/route';

export interface View {
  route: Route;
  title?: ReactNode;
  showBackButton?: boolean;
}

export interface WidgetState {
  open: boolean;
  view: View;
  history: View[];
  show: () => void;
  hide: () => void;
  setOpen: (open: boolean) => void;
  goTo: (route: Route, options?: Omit<View, 'route'>) => void;
  goBack: () => void;
}

export const WidgetContext = createContext<WidgetState | undefined>(undefined);
