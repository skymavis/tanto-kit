import { ReactNode, useCallback, useState } from 'react';
import { useAccount } from 'wagmi';

import { TantoWidget } from '../../TantoWidget';
import { privateRotues, Route } from '../../types/route';
import { View, WidgetContext, WidgetState } from './WidgetContext';

const walletsView: View = {
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

const profileView: View = {
  route: Route.PROFILE,
  title: <p css={{ textAlign: 'center' }}>Connected</p>,
};

export const WidgetProvider = ({ children }: { children: ReactNode }) => {
  const { isConnected } = useAccount();
  const [open, setOpen] = useState(false);

  const initialView = isConnected ? profileView : walletsView;
  const [navigation, setNavigation] = useState({
    view: initialView,
    history: [initialView],
  });

  const reset = useCallback(() => {
    setNavigation({
      view: initialView,
      history: [initialView],
    });
  }, [initialView]);

  const show = useCallback(() => {
    reset();
    setOpen(true);
  }, [reset]);

  const hide = useCallback(() => setOpen(false), []);

  const goTo = useCallback((route: Route, options: Omit<View, 'route'> = {}) => {
    setOpen(true);
    setNavigation(prev => {
      const { history, view: currentView } = prev;
      if (!isConnected && privateRotues.includes(route)) return prev;
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
