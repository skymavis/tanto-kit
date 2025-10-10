import type { WaypointScope } from '@sky-mavis/tanto-connect';
import { roninWallet, waypoint } from '@sky-mavis/tanto-wagmi';
import omit from 'lodash.omit';
import type { Chain, Prettify } from 'viem/chains';
import { ronin, saigon } from 'viem/chains';
import type { Config, CreateConfigParameters, CreateConnectorFn } from 'wagmi';
import { createConfig, http } from 'wagmi';
import type { CoinbaseWalletParameters } from 'wagmi/connectors';
import { coinbaseWallet, safe, walletConnect } from 'wagmi/connectors';

import { RONIN_WALLET_WEB_LINK } from './constants';
import { headlessConnector } from './services/headlessWagmiConnector';
import { getVersionInfo } from './utils/common';
import { TantoWidgetError, TantoWidgetErrorCodes } from './utils/errors';
import { setConfig } from './utils/storage';

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
  'passwordlessWalletConfig',
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
  headless?: boolean;
}

export interface PasswordlessWalletConfig {
  chainId?: number;
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

export interface WalletConnectConfigWithEnable extends WalletEnableConfig {
  projectId?: string;
  metadata?: {
    name?: string;
    description?: string;
    url?: string;
    icons?: string[];
  };
}

export interface CoinbaseWalletConfigWithEnable extends WalletEnableConfig, Partial<CoinbaseWalletParameters> {}

export interface KeylessWalletConfigWithEnable extends WalletEnableConfig, KeylessWalletConfig {}

export type DefaultConfig = Prettify<
  Partial<Omit<CreateConfigParameters, 'client' | 'connectors'>> & {
    appMetadata?: AppMetadata;
    walletConnectConfig?: WalletConnectConfigWithEnable;
    keylessWalletConfig?: KeylessWalletConfigWithEnable;
    coinbaseWalletConfig?: CoinbaseWalletConfigWithEnable;
  }
>;

export function createTransports(chains: readonly [Chain, ...Chain[]]) {
  return Object.fromEntries(chains.map(chain => [chain.id, http()]));
}

function createAppMetadata(appMetadata?: AppMetadata) {
  const defaults = RONIN_WALLET_METADATA.metadata;
  return {
    appName: appMetadata?.appName ?? defaults.name,
    appIcon: appMetadata?.appIcon ?? defaults.icons[0],
    appDescription: appMetadata?.appDescription ?? defaults.description,
    appUrl: appMetadata?.appUrl ?? defaults.url,
  };
}

const createRoninConnector = (): CreateConnectorFn => roninWallet();

const createSafeConnector = (): CreateConnectorFn => safe();

const createRoninWalletHeadlessConnector = (config: KeylessWalletConfig): CreateConnectorFn =>
  headlessConnector({
    chainId: config.chainId,
  });

function createWaypointConnector(config: KeylessWalletConfig): CreateConnectorFn {
  return waypoint({
    source: getVersionInfo(),
    ...config,
  });
}

function createWalletConnectConnector(
  appMetadata: ReturnType<typeof createAppMetadata>,
  config?: Omit<WalletConnectConfigWithEnable, 'enable'>,
): CreateConnectorFn {
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
}

function createCoinbaseConnector(
  appMetadata: ReturnType<typeof createAppMetadata>,
  config?: Omit<CoinbaseWalletConfigWithEnable, 'enable'>,
): CreateConnectorFn {
  return coinbaseWallet({
    appName: config?.appName ?? appMetadata.appName,
    ...config,
  });
}

export function createConnectors(config: DefaultConfig): CreateConnectorFn[] {
  const appMetadata = createAppMetadata(config.appMetadata);
  const connectors: CreateConnectorFn[] = [createRoninConnector(), createSafeConnector()];
  const { keylessWalletConfig, walletConnectConfig, coinbaseWalletConfig } = config;

  if (keylessWalletConfig?.enable !== false && keylessWalletConfig?.clientId) {
    const waypointConfig = omit(keylessWalletConfig, 'enable', 'headless');
    connectors.push(createWaypointConnector(waypointConfig));

    if (keylessWalletConfig.headless) {
      connectors.push(createRoninWalletHeadlessConnector(waypointConfig));
    }
  }

  if (walletConnectConfig?.enable !== false) {
    connectors.push(createWalletConnectConnector(appMetadata, omit(walletConnectConfig, 'enable')));
  }

  if (coinbaseWalletConfig?.enable) {
    connectors.push(createCoinbaseConnector(appMetadata, omit(coinbaseWalletConfig, 'enable')));
  }

  return connectors;
}

function createConfigParameters(config: DefaultConfig): CreateConfigParameters {
  const chains = config.chains ?? DEFAULT_CHAINS;
  return {
    chains,
    transports: createTransports(chains),
    connectors: createConnectors(config),
    multiInjectedProviderDiscovery: config.multiInjectedProviderDiscovery ?? true,
    ...omit(config, EXCLUDED_CONFIG_KEYS),
  };
}

function validateConfig(config: DefaultConfig): void {
  if (config.keylessWalletConfig?.enable !== false) {
    if (!config.keylessWalletConfig?.clientId) {
      throw new TantoWidgetError(
        TantoWidgetErrorCodes.KEYLESS_WALLET_CONFIG_MISSING_CLIENT_ID,
        'KeylessWalletConfig requires a clientId when enabled',
      );
    }
  }
}

export function getDefaultConfig(config: DefaultConfig = {}): Config {
  setConfig(config);
  validateConfig(config);
  return createConfig(createConfigParameters(config));
}
