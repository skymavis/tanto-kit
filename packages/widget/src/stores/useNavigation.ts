import { create } from 'zustand';

export interface ViewType {
  key: string;
  title?: string;
  showBackButton?: boolean;
  data?: any;
}

export enum ViewKeys {
  CONNECTORS = 'CONNECTORS',
}

interface ConnectorsView extends ViewType {
  key: ViewKeys.CONNECTORS;
}

type View = ConnectorsView;

interface NavigationState {
  view: View;
  history: View[];
  goTo: (view: View) => void;
  goBack: () => void;
  goBackTo: (view: Omit<View, 'title'>) => void;
  reset: () => void;
}

export const useNavigation = create<NavigationState>(set => ({
  view: {
    key: ViewKeys.CONNECTORS,
    title: 'Connect Wallet',
  },
  history: [],

  goTo: nextView =>
    set(state => {
      const { history } = state;
      const lastView = history[history.length - 1];
      const viewTitle = typeof nextView.title !== 'undefined' ? nextView.title : lastView?.title;
      const isSameView = nextView.key === lastView?.key;
      const newHistoryLength = isSameView ? history.length : history.length + 1;
      const updatedView = {
        ...nextView,
        title: viewTitle,
        showBackButton: newHistoryLength > 1 && (nextView.showBackButton ?? true),
      };
      const updatedHistory = isSameView ? history : [...history, updatedView];
      return {
        view: updatedView,
        history: updatedHistory,
      };
    }),

  goBack: () =>
    set(state => {
      const { history } = state;
      if (history.length <= 1) return state;
      const updatedHistory = history.slice(0, -1);
      return {
        view: updatedHistory[updatedHistory.length - 1],
        history: updatedHistory,
      };
    }),

  goBackTo: view =>
    set(state => {
      const { history } = state;
      const { key } = view;
      const targetIndex = history.findIndex(item => item.key === key);
      if (targetIndex === -1) return state;
      const updatedHistory = history.slice(0, targetIndex + 1);
      return {
        view: updatedHistory[updatedHistory.length - 1],
        history: updatedHistory,
      };
    }),

  reset: () =>
    set(state => {
      const { history } = state;
      const initialView = history[0];
      if (!initialView) return state;
      return {
        view: initialView,
        history: [initialView],
      };
    }),
}));
