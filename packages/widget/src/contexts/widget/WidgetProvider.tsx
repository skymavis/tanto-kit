import { ReactNode, useCallback, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

import { TantoWidget } from '../../TantoWidget';
import { privateRoutes, Route } from '../../types/route';
import { View, WidgetContext, WidgetState } from './WidgetContext';

const WALLETS_VIEW: View = {
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

const PROFILE_VIEW: View = {
  route: Route.PROFILE,
  title: <p css={{ textAlign: 'center' }}>Connected</p>,
};

export const WidgetProvider = ({ children }: { children: ReactNode }) => {
  const { isConnected } = useAccount();
  const [open, setOpen] = useState(false);
  const [navigation, setNavigation] = useState(() => ({
    view: isConnected ? PROFILE_VIEW : WALLETS_VIEW,
    history: [isConnected ? PROFILE_VIEW : WALLETS_VIEW],
  }));

  const reset = useCallback(() => {
    const initialView = isConnected ? PROFILE_VIEW : WALLETS_VIEW;
    setNavigation({
      view: initialView,
      history: [initialView],
    });
  }, [isConnected]);

  const show = useCallback(() => {
    reset();
    setOpen(true);
  }, [reset]);

  const hide = useCallback(() => setOpen(false), []);

  const goTo = useCallback(
    (route: Route, options: Omit<View, 'route'> = {}) => {
      setOpen(true);
      setNavigation(({ view: currentView, history }) => {
        if (!isConnected && privateRoutes.includes(route)) return { view: currentView, history };

        const isSameView = route === currentView.route;
        const newView: View = {
          route,
          title: options.title ?? currentView.title,
          showBackButton: options.showBackButton ?? (!isSameView && history.length > 0),
          ...options,
        };

        return {
          view: newView,
          history: isSameView ? history : [...history, newView],
        };
      });
    },
    [isConnected],
  );

  const goBack = useCallback(() => {
    setNavigation(({ history, view }) => {
      if (history.length <= 1) return { history, view };
      const newHistory = history.slice(0, -1);
      return {
        view: newHistory[newHistory.length - 1],
        history: newHistory,
      };
    });
  }, []);

  const contextValue = useMemo<WidgetState>(
    () => ({
      open,
      view: navigation.view,
      history: navigation.history,
      setOpen,
      show,
      hide,
      goTo,
      goBack,
      reset,
    }),
    [open, navigation, show, hide, goTo, goBack, reset],
  );

  return (
    <WidgetContext.Provider value={contextValue}>
      {children}
      <TantoWidget />
    </WidgetContext.Provider>
  );
};
