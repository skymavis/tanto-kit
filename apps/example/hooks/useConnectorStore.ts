import { IBaseConnector } from '@sky-mavis/tanto-connect';
import create from 'zustand';

interface IConnectorStoreState {
  isConnected: boolean;
  account: string | null;
  chainId: number | null;
  connector: IBaseConnector | null;
}

interface IConnectorStoreAction {
  setIsConnected: (connected: boolean) => void;
  setAccount: (account: string | null) => void;
  setChainId: (chainId: number | null) => void;
  setConnector: (connector: IBaseConnector | null) => void;
}

export const useConnectorStore = create<IConnectorStoreState & IConnectorStoreAction>(set => ({
  isConnected: false,
  account: null,
  chainId: null,
  connector: null,

  setIsConnected: (connected: boolean) => set({ isConnected: connected }),
  setConnector: (connector: IBaseConnector | null) => set({ connector }),
  setAccount: (account: string | null) => set({ account }),
  setChainId: (chainId: number | null) => set({ chainId }),
}));
