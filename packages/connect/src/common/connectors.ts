import { IConnectorConfigs } from '../types/connector';

export enum SupportedConnector {
  RONIN_WALLET = 'RONIN_WALLET',
  RONIN_WC = 'RONIN_WC',
  INJECTED = 'INJECTED',
  WAYPOINT = 'WAYPOINT',
  SAFE = 'SAFE',
}

export enum ConnectorType {
  WALLET = 'WALLET',
  MULTISIG = 'MULTISIG',
}

export const DEFAULT_CONNECTORS_CONFIG: Record<SupportedConnector, IConnectorConfigs> = {
  [SupportedConnector.RONIN_WALLET]: {
    name: 'Ronin Wallet',
    id: SupportedConnector.RONIN_WALLET,
    type: ConnectorType.WALLET,
  },
  [SupportedConnector.RONIN_WC]: {
    name: 'Ronin Mobile',
    id: SupportedConnector.RONIN_WC,
    type: ConnectorType.WALLET,
  },
  [SupportedConnector.INJECTED]: {
    id: 'INJECTED_CONNECTOR',
    name: SupportedConnector.INJECTED,
    type: ConnectorType.WALLET,
  },
  [SupportedConnector.WAYPOINT]: {
    name: 'Ronin Waypoint',
    id: SupportedConnector.WAYPOINT,
    type: ConnectorType.WALLET,
  },
  [SupportedConnector.SAFE]: {
    name: 'Safe',
    id: SupportedConnector.SAFE,
    type: ConnectorType.MULTISIG,
  },
};
