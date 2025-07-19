import type { PropsWithChildren } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { analytic } from '../../analytic';
import { viewConfigs } from '../../configs/viewConfigs';
import { useAccount } from '../../hooks/useAccount';
import { useUnmount } from '../../hooks/useUnmount';
import { authenticatedRoutes, internalRoutes, publicRoutes, Route } from '../../types/route';
import { useTantoConfig } from '../tanto/useTantoConfig';
import type { View, WidgetRouterState } from './WidgetRouterContext';
import { WidgetRouterContext } from './WidgetRouterContext';

export function WidgetRouterProvider({ children }: PropsWithChildren) {
  const { disableProfile } = useTantoConfig();
  const { isConnected } = useAccount();

  const getInitialView = useCallback(() => {
    const route = isConnected && !disableProfile ? Route.PROFILE : Route.WALLETS;
    return viewConfigs[route];
  }, [isConnected, disableProfile]);

  const [routerState, setRouterState] = useState(() => {
    const initialView = getInitialView();
    return { view: initialView, history: [initialView] };
  });

  const reset = useCallback(
    (route?: Route) => {
      const view = route ? viewConfigs[route] : getInitialView();
      setRouterState({ view, history: [view] });
    },
    [getInitialView],
  );

  const goTo = useCallback(
    (nextRoute: Route, opts?: Partial<Omit<View, 'route'>>) => {
      if (!isConnected && authenticatedRoutes.includes(nextRoute)) return;

      setRouterState(prevState => {
        const viewConfig = viewConfigs[nextRoute];
        const hasPreviousViews = prevState.history.length > 0;

        const newView: View = {
          route: nextRoute,
          title: opts?.title ?? viewConfig.title,
          showBackButton: opts?.showBackButton ?? viewConfig.showBackButton ?? hasPreviousViews,
          content: opts?.content ?? viewConfig.content,
          ...opts,
        };

        return {
          view: newView,
          history: [...prevState.history, newView],
        };
      });
    },
    [isConnected],
  );

  const goBack = useCallback(() => {
    setRouterState(prevState => {
      if (prevState.history.length <= 1) return prevState;

      const newHistory = prevState.history.slice(0, -1);
      return {
        view: newHistory[newHistory.length - 1],
        history: newHistory,
      };
    });
  }, []);

  useEffect(() => {
    const { route } = routerState.view;
    const shouldReset =
      (isConnected && !disableProfile && publicRoutes.includes(route)) ||
      (!isConnected && authenticatedRoutes.includes(route));

    if (shouldReset) reset();
  }, [isConnected, disableProfile, routerState.view.route, reset]);

  useUnmount(() => {
    if (internalRoutes.includes(routerState.view.route)) reset();
  });

  useEffect(() => {
    analytic.sendScreen(routerState.view.route);
  }, [routerState.view.route]);

  const contextValue = useMemo<WidgetRouterState>(
    () => ({
      view: routerState.view,
      history: routerState.history,
      goTo,
      goBack,
      reset,
    }),
    [routerState.view, routerState.history, goTo, goBack, reset],
  );

  return <WidgetRouterContext.Provider value={contextValue}>{children}</WidgetRouterContext.Provider>;
}
