import { WaypointScope } from '@sky-mavis/tanto-connect';
import { roninWallet, waypoint } from '@sky-mavis/tanto-wagmi';
import omit from 'lodash.omit';
import { Chain, Prettify, ronin, saigon } from 'viem/chains';
import { Config, createConfig, CreateConfigParameters, CreateConnectorFn, http } from 'wagmi';
import {
  coinbaseWallet,
  CoinbaseWalletParameters,
  safe,
  walletConnect,
  WalletConnectParameters,
} from 'wagmi/connectors';

import { RONIN_WALLET_WEB_LINK } from './constants';
import { getVersionInfo } from './utils';
import { TantoWidgetError, TantoWidgetErrorCodes } from './utils/errors';

export const RONIN_WALLET_METADATA = {
  projectId: 'd2ef97836db7eb390bcb2c1e9847ecdc',
  metadata: {
    name: 'Ronin Wallet',
    description: 'Your passport into a digital nation',
    icons: ['https://cdn.skymavis.com/wallet/web-app/logo/ronin.png'],
    url: RONIN_WALLET_WEB_LINK,
  },
} as const;

const DEFAULT_CHAINS = [ronin, saigon] as const;

const EXCLUDED_CONFIG_KEYS = [
  'appName',
  'appIcon',
  'appDescription',
  'appUrl',
  'walletConnectConfig',
  'keylessWalletConfig',
  'chains',
  'showCoinbaseWallet',
  'multiInjectedProviderDiscovery',
] as const;

export interface KeylessWalletConfig {
  clientId: string;
  chainId?: number;
  waypointOrigin?: string;
  scopes?: WaypointScope[];
  popupCloseDelay?: number;
}

export interface AppMetadata {
  appName?: string;
  appIcon?: string;
  appDescription?: string;
  appUrl?: string;
}

interface WalletEnableConfig {
  enable?: boolean;
}

export type DefaultConfig = Prettify<
  Partial<Omit<CreateConfigParameters, 'client' | 'connectors'>> & {
    appMetadata?: AppMetadata;
    initialChainId?: number;
    walletConnectConfig?: WalletEnableConfig & Partial<Omit<WalletConnectParameters, 'showQrModal'>>;
    keylessWalletConfig?: WalletEnableConfig & KeylessWalletConfig;
    coinbaseWalletConfig?: WalletEnableConfig & Partial<CoinbaseWalletParameters>;
  }
>;

export const createTransports = (chains: readonly [Chain, ...Chain[]]) =>
  Object.fromEntries(chains.map(chain => [chain.id, http()]));

const createAppMetadata = (appMetadata?: AppMetadata) => {
  const defaults = RONIN_WALLET_METADATA.metadata;
  return {
    appName: appMetadata?.appName ?? defaults.name,
    appIcon: appMetadata?.appIcon ?? defaults.icons[0],
    appDescription: appMetadata?.appDescription ?? defaults.description,
    appUrl: appMetadata?.appUrl ?? defaults.url,
  };
};

const createRoninConnector = (): CreateConnectorFn => roninWallet();

const createSafeConnector = (): CreateConnectorFn => safe();

const createWaypointConnector = (config: DefaultConfig['keylessWalletConfig']): CreateConnectorFn =>
  waypoint({
    source: getVersionInfo(),
    ...config,
  });

const createWalletConnectConnector = (
  appMetadata: ReturnType<typeof createAppMetadata>,
  config?: DefaultConfig['walletConnectConfig'],
): CreateConnectorFn => {
  const { metadata = {}, ...restConfig } = config ?? {};
  return walletConnect({
    projectId: config?.projectId ?? RONIN_WALLET_METADATA.projectId,
    showQrModal: false,
    metadata: {
      name: appMetadata.appName,
      description: appMetadata.appDescription,
      url: appMetadata.appUrl,
      icons: [appMetadata.appIcon],
      ...metadata,
    },
    ...restConfig,
  });
};

const createCoinbaseConnector = (
  appMetadata: ReturnType<typeof createAppMetadata>,
  config?: DefaultConfig['coinbaseWalletConfig'],
): CreateConnectorFn =>
  coinbaseWallet({
    appName: config?.appName ?? appMetadata.appName,
    ...config,
  });

export const createConnectors = (config: DefaultConfig): CreateConnectorFn[] => {
  const appMetadata = createAppMetadata(config.appMetadata);
  const connectors: CreateConnectorFn[] = [createRoninConnector(), createSafeConnector()];
  const { keylessWalletConfig, walletConnectConfig, coinbaseWalletConfig } = config;
  if (keylessWalletConfig?.enable !== false)
    connectors.push(createWaypointConnector(omit(keylessWalletConfig, 'enable')));
  if (walletConnectConfig?.enable !== false)
    connectors.push(createWalletConnectConnector(appMetadata, omit(walletConnectConfig, 'enable')));
  if (coinbaseWalletConfig?.enable)
    connectors.push(createCoinbaseConnector(appMetadata, omit(coinbaseWalletConfig, 'enable')));
  return connectors;
};

const createConfigParameters = (config: DefaultConfig): CreateConfigParameters => {
  const chains = config.chains ?? DEFAULT_CHAINS;
  return {
    chains,
    transports: createTransports(chains),
    connectors: createConnectors(config),
    multiInjectedProviderDiscovery: config.multiInjectedProviderDiscovery ?? true,
    ...omit(config, EXCLUDED_CONFIG_KEYS),
  };
};

export const getDefaultConfig = (config: DefaultConfig = {}): Config => {
  if (config.keylessWalletConfig?.enable !== false && !config.keylessWalletConfig?.clientId)
    throw new TantoWidgetError(
      TantoWidgetErrorCodes.KEYLESS_WALLET_CONFIG_MISSING_CLIENT_ID,
      'KeylessWalletConfig requires a clientId when enabled',
    );
  return createConfig(createConfigParameters(config));
};
