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
  MPC = 'MPC',
  WC = 'WC',
}

export const DEFAULT_CONNECTORS_CONFIG: Record<SupportedConnectors, IConnectorConfigs> = {
  [SupportedConnectors.RONIN_WALLET]: {
    name: 'Ronin Wallet',
    id: SupportedConnectors.RONIN_WALLET,
    type: ConnectorType.WALLET,
  },
  [SupportedConnectors.RONIN_WC]: {
    name: 'Ronin Wallet Connect',
    id: SupportedConnectors.RONIN_WC,
    type: ConnectorType.WC,
  },
  [SupportedConnectors.WAYPOINT]: {
    name: 'Ronin Waypoint',
    id: SupportedConnectors.WAYPOINT,
    type: ConnectorType.MPC,
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
