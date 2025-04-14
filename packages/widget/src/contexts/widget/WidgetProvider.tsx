import { ReactNode, useCallback, useState } from 'react';

import { TantoWidget } from '../../TantoWidget';
import { Route } from '../../types/route';
import { View, WidgetContext, WidgetState } from './WidgetContext';

const initialView: View = {
  route: Route.WALLETS,
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

export const WidgetProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [navigation, setNavigation] = useState({
    view: initialView,
    history: [initialView],
  });

  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  const goTo = useCallback((route: Route, options: Omit<View, 'route'> = {}) => {
    setNavigation(prev => {
      const { history, view: currentView } = prev;
      const isSameView = route === currentView.route;

      const newView: View = {
        route,
        title: options.title ?? currentView.title,
        showBackButton: options.showBackButton ?? (!isSameView && history.length > 0),
        ...options,
      };

      const newHistory = isSameView ? history : [...history, newView];

      return {
        view: newView,
        history: newHistory,
      };
    });
  }, []);

  const goBack = useCallback(() => {
    setNavigation(prev => {
      const { history } = prev;
      if (history.length <= 1) return prev;

      const newHistory = history.slice(0, -1);
      return {
        view: newHistory[newHistory.length - 1],
        history: newHistory,
      };
    });
  }, []);

  const reset = useCallback(() => {
    setNavigation({
      view: initialView,
      history: [initialView],
    });
  }, []);

  const contextValue: WidgetState = {
    open,
    view: navigation.view,
    history: navigation.history,
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
