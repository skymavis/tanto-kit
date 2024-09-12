import { IConnectorConfigs } from '../types/connector';

export enum SupportedConnectors {
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

export const DEFAULT_CONNECTORS_CONFIG: Record<SupportedConnectors, IConnectorConfigs> = {
  [SupportedConnectors.RONIN_WALLET]: {
    name: 'Ronin Wallet',
    id: SupportedConnectors.RONIN_WALLET,
    type: ConnectorType.WALLET,
  },
  [SupportedConnectors.RONIN_WC]: {
    name: 'Ronin Mobile',
    id: SupportedConnectors.RONIN_WC,
    type: ConnectorType.WALLET,
  },
  [SupportedConnectors.WAYPOINT]: {
    name: 'Ronin Waypoint',
    id: SupportedConnectors.WAYPOINT,
    type: ConnectorType.WALLET,
  },
  [SupportedConnectors.INJECTED]: {
    name: 'Injected Providers',
    id: SupportedConnectors.INJECTED,
    type: ConnectorType.WALLET,
  },
  [SupportedConnectors.SAFE]: {
    name: 'Gnosis Safe',
    id: SupportedConnectors.SAFE,
    type: ConnectorType.MULTISIG,
  },
};
