import { WaypointScope } from '@sky-mavis/tanto-connect';
import { roninWallet, waypoint } from '@sky-mavis/tanto-wagmi';
import { Chain, ronin, saigon } from 'viem/chains';
import { Config, createConfig, CreateConfigParameters, CreateConnectorFn, http } from 'wagmi';
import { safe, walletConnect } from 'wagmi/connectors';

import { RONIN_WALLET_WEB_LINK } from './constants';
import { getVersionInfo } from './utils';

const DEFAULT_WALLET_CONNECT_CONFIG = {
  projectId: 'd2ef97836db7eb390bcb2c1e9847ecdc',
  metadata: {
    name: 'Ronin Wallet',
    description: 'Your passport into a digital nation',
    icons: ['https://cdn.skymavis.com/wallet/web-app/logo/ronin.png'],
    url: RONIN_WALLET_WEB_LINK,
  },
};

interface KeylessWalletConfig {
  clientId: string;
  chainId?: number;
  waypointOrigin?: string;
  scopes?: WaypointScope[];
  popupCloseDelay?: number;
}

interface DefaultConfig extends Partial<Omit<CreateConfigParameters, 'client' | 'connectors'>> {
  appName?: string;
  appIcon?: string;
  appDescription?: string;
  appUrl?: string;
  walletConnectProjectId?: string;
  keylessWalletConfig?: KeylessWalletConfig;
  initialChainId?: number;
}

const createTransports = (chains: readonly [Chain, ...Chain[]]) =>
  Object.fromEntries(chains.map(chain => [chain.id, http()]));

const createConnectors = ({
  appName = DEFAULT_WALLET_CONNECT_CONFIG.metadata.name,
  appIcon = DEFAULT_WALLET_CONNECT_CONFIG.metadata.icons[0],
  appDescription = DEFAULT_WALLET_CONNECT_CONFIG.metadata.description,
  appUrl = DEFAULT_WALLET_CONNECT_CONFIG.metadata.url,
  walletConnectProjectId = DEFAULT_WALLET_CONNECT_CONFIG.projectId,
  keylessWalletConfig,
}: DefaultConfig) => {
  const connectors: CreateConnectorFn[] = [
    roninWallet(),
    walletConnect({
      projectId: walletConnectProjectId,
      showQrModal: false,
      metadata: {
        name: appName,
        description: appDescription,
        url: appUrl,
        icons: [appIcon],
      },
    }),
    safe(),
  ];
  if (keylessWalletConfig)
    connectors.push(
      waypoint({
        ...keylessWalletConfig,
        source: getVersionInfo(),
      }),
    );
  return connectors;
};

export const getDefaultConfig = ({
  appName,
  appIcon,
  appDescription,
  appUrl,
  walletConnectProjectId,
  keylessWalletConfig,
  chains = [ronin, saigon],
  multiInjectedProviderDiscovery = true,
  ...rest
}: DefaultConfig = {}): Config => {
  const configParams: CreateConfigParameters = {
    chains,
    transports: createTransports(chains),
    connectors: createConnectors({
      appName,
      appIcon,
      appDescription,
      appUrl,
      walletConnectProjectId,
      keylessWalletConfig,
    }),
    multiInjectedProviderDiscovery,
    ...rest,
  };

  return createConfig(configParams);
};
