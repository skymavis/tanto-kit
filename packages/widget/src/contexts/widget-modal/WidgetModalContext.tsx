import { createContext } from 'react';

export interface WidgetModalState {
  open: boolean;
  show: () => void;
  hide: () => void;
  setOpen: (open: boolean) => void;
}

export const WidgetModalContext = createContext<WidgetModalState | undefined>(undefined);
