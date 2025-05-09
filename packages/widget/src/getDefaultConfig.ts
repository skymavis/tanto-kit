import { IWaypointProviderConfigs } from '@sky-mavis/tanto-connect';
import { roninWallet, waypoint } from '@sky-mavis/tanto-wagmi';
import { Chain, ronin, saigon } from 'viem/chains';
import { Config, createConfig, CreateConfigParameters, CreateConnectorFn, http } from 'wagmi';
import { walletConnect } from 'wagmi/connectors';

import { RONIN_WALLET_WEB_LINK } from './constants';

const DEFAULT_WALLET_CONNECT_CONFIG = {
  projectId: 'd2ef97836db7eb390bcb2c1e9847ecdc',
  metadata: {
    name: 'Ronin Wallet',
    description: 'Your passport into a digital nation',
    icons: ['https://cdn.skymavis.com/wallet/web-app/logo/ronin.png'],
    url: RONIN_WALLET_WEB_LINK,
  },
};

interface DefaultConfig
  extends Partial<Omit<CreateConfigParameters, 'client' | 'connectors' | 'transports' | 'chains'>> {
  appName?: string;
  appIcon?: string;
  appDescription?: string;
  appUrl?: string;
  walletConnectProjectId?: string;
  keylessWalletConfigs?: IWaypointProviderConfigs & { clientId: string };
  chains?: readonly [Chain, ...Chain[]];
}

const createTransports = (chains: readonly [Chain, ...Chain[]]) =>
  Object.fromEntries(chains.map(chain => [chain.id, http()]));

const createConnectors = ({
  appName = DEFAULT_WALLET_CONNECT_CONFIG.metadata.name,
  appIcon = DEFAULT_WALLET_CONNECT_CONFIG.metadata.icons[0],
  appDescription = DEFAULT_WALLET_CONNECT_CONFIG.metadata.description,
  appUrl = DEFAULT_WALLET_CONNECT_CONFIG.metadata.url,
  walletConnectProjectId = DEFAULT_WALLET_CONNECT_CONFIG.projectId,
  keylessWalletConfigs,
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
  ];
  if (keylessWalletConfigs) connectors.push(waypoint(keylessWalletConfigs));
  return connectors;
};

export const getDefaultConfig = ({
  appName,
  appIcon,
  appDescription,
  appUrl,
  walletConnectProjectId,
  keylessWalletConfigs,
  chains = [ronin, saigon],
  multiInjectedProviderDiscovery = true,
  ...rest
}: DefaultConfig): Config => {
  const configParams: CreateConfigParameters = {
    chains,
    transports: createTransports(chains),
    connectors: createConnectors({
      appName,
      appIcon,
      appDescription,
      appUrl,
      walletConnectProjectId,
      keylessWalletConfigs,
    }),
    multiInjectedProviderDiscovery,
    ...rest,
  };

  // @ts-ignore
  return createConfig(configParams);
};
