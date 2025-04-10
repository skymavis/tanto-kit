import { createContext, ReactNode, useContext, useState } from 'react';

import { TantoWidget } from '../TantoWidget';

export enum Route {
  CONNECTORS = 'CONNECTORS',
}

export interface View {
  route: Route;
  title?: ReactNode;
  showBackButton?: boolean;
}

interface WidgetState {
  open: boolean;
  view: View;
  history: View[];
  show: () => void;
  hide: () => void;
  setOpen: (open: boolean) => void;
  goTo: (route: Route, options?: Omit<View, 'route'>) => void;
  goBack: () => void;
  reset: () => void;
}

const initialView: View = {
  route: Route.CONNECTORS,
  title: (
    <p
      css={{
        fontSize: 11,
        fontWeight: 500,
        color: 'rgba(205, 213, 229, 0.75)',
        textTransform: 'uppercase',
        textAlign: 'center',
      }}
    >
      Powered by Ronin Wallet
    </p>
  ),
};

const WidgetContext = createContext<WidgetState | undefined>(undefined);

export const WidgetProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState({
    open: false,
    view: initialView,
    history: [initialView],
  });

  const goTo = (route: Route, options: Omit<View, 'route'> = {}) => {
    setState(prevState => {
      const { history } = prevState;
      const recentView = history[history.length - 1];
      const isSameView = route === recentView?.route;
      const newTitle = typeof options.title !== 'undefined' ? options.title : recentView?.title;
      const newHistoryLength = isSameView ? history.length : history.length + 1;
      const newView = {
        route,
        title: newTitle,
        showBackButton: newHistoryLength > 1 && (options.showBackButton ?? true),
        ...options,
      };
      const updatedHistory = isSameView ? history : [...history, newView];
      return {
        ...prevState,
        view: newView,
        history: updatedHistory,
      };
    });
  };

  const goBack = () => {
    setState(prevState => {
      const { history } = prevState;
      if (history.length <= 1) return prevState;
      const updatedHistory = history.slice(0, -1);
      return {
        ...prevState,
        view: updatedHistory[updatedHistory.length - 1],
        history: updatedHistory,
      };
    });
  };

  const reset = () => {
    setState(prevState => {
      const { history } = prevState;
      const initialViewFromHistory = history[0];
      if (!initialViewFromHistory) return prevState;
      return {
        ...prevState,
        view: initialViewFromHistory,
        history: [initialViewFromHistory],
      };
    });
  };

  const setOpen = (open: boolean) => {
    setState(prevState => ({
      ...prevState,
      open,
    }));
  };

  const show = () => {
    setOpen(true);
  };

  const hide = () => {
    setOpen(false);
  };

  const contextValue: WidgetState = {
    open: state.open,
    view: state.view,
    history: state.history,
    setOpen,
    show,
    hide,
    goTo,
    goBack,
    reset,
  };

  return (
    <WidgetContext.Provider value={contextValue}>
      {children}
      <TantoWidget />
    </WidgetContext.Provider>
  );
};

export const useWidget = () => {
  const context = useContext(WidgetContext);
  if (context === undefined) {
    throw new Error('useWidget must be used within a WidgetProvider');
  }
  return context;
};
