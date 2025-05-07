import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

import { MODAL_ANIMATION_DURATION } from '../../constants';
import { authenticatedRoutes, internalRoutes, publicRoutes, Route } from '../../types/route';
import { View, WidgetContext, WidgetState } from './WidgetContext';

const WALLETS_VIEW: View = {
  route: Route.WALLETS,
  title: (
    <p
      css={theme => ({
        fontSize: 11,
        fontWeight: 500,
        color: theme.neutralColor,
        transform: 'translateY(6px)',
        textTransform: 'uppercase',
        textAlign: 'center',
      })}
    >
      Powered by Ronin Wallet
    </p>
  ),
};

const PROFILE_VIEW: View = {
  route: Route.PROFILE,
  title: <p css={{ textAlign: 'center' }}>Connected</p>,
};

export const WidgetProvider = ({ children }: PropsWithChildren) => {
  const { isConnected } = useAccount();
  const [open, setOpen] = useState(false);

  const getInitialView = useCallback(() => (isConnected ? PROFILE_VIEW : WALLETS_VIEW), [isConnected]);

  const [navigation, setNavigation] = useState(() => {
    const initialView = getInitialView();
    return {
      view: initialView,
      history: [initialView],
    };
  });

  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  const reset = useCallback(() => {
    const initialView = getInitialView();
    setNavigation({
      view: initialView,
      history: [initialView],
    });
  }, [getInitialView]);

  const goTo = useCallback(
    (nextRoute: Route, options: Omit<View, 'route'> = {}) => {
      if (!isConnected && authenticatedRoutes.includes(nextRoute)) {
        return;
      }

      setOpen(true);

      setNavigation(state => {
        const { view: currentView, history } = state;
        const isSameView = nextRoute === currentView.route;

        const newView: View = {
          route: nextRoute,
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

  useEffect(() => {
    const currentRoute = navigation.view.route;
    const shouldReset =
      (isConnected && publicRoutes.includes(currentRoute)) ||
      (!isConnected && authenticatedRoutes.includes(currentRoute));

    if (shouldReset) reset();
  }, [isConnected, navigation.view.route, reset]);

  useEffect(() => {
    const currentRoute = navigation.view.route;
    if (!open && internalRoutes.includes(currentRoute)) setTimeout(reset, MODAL_ANIMATION_DURATION);
  }, [open, navigation.view.route, reset]);

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
    }),
    [open, navigation, show, hide, goTo, goBack],
  );

  return <WidgetContext.Provider value={contextValue}>{children}</WidgetContext.Provider>;
};
