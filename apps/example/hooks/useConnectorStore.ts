import { BaseConnector } from '@sky-mavis/tanto-connect';
import create from 'zustand';

export interface ConnectorStore {
  connector: BaseConnector | null;
  setConnector: (connector: BaseConnector | null) => void;
}

export const useConnectorStore = create<ConnectorStore>(
  (set): ConnectorStore => ({
    connector: null,
    setConnector: (connector: BaseConnector | null) => set({ connector }),
  }),
);
