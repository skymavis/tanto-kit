import { EthereumProviderOptions } from '@walletconnect/ethereum-provider';

import { ConnectorType, RONIN_WALLET_CONNECT_PROJECT_ID } from '../common/connectors';
import { DEFAULT_DELAY_TIME, RONIN_WALLET_RDNS, WC_SUPPORTED_CHAIN_IDS } from '../common/constant';
import {
  IWaypointProviderConfigs,
  requestProviders,
  requestRoninProvider,
  requestRoninWalletConnectProvider,
  requestSafeProvider,
  requestWaypointProvider,
} from '../providers';
import { IConnectorConfigs } from '../types/connector';
import { BaseConnector } from './base/BaseConnector';
import { InjectedConnector } from './injected/InjectedConnector';
import { RoninWalletConnector } from './ronin-wallet/RoninWalletConnector';
import { RoninWalletConnectConnector } from './ronin-wallet-connect/RoninWalletConnectConnector';
import { SafeConnector } from './safe/SafeConnector';
import { WaypointConnector } from './waypoint/WaypointConnector';

export const requestInjectedConnectors = async (): Promise<BaseConnector[]> => {
  const providerDetails = await requestProviders();

  return providerDetails.map(detail => {
    if (detail.info.rdns === RONIN_WALLET_RDNS) {
      return new RoninWalletConnector({ icon: detail.info.icon }, detail.provider);
    }

    const configs = {
      name: detail.info.name,
      id: detail.info.rdns,
      icon: detail.info.icon,
      type: ConnectorType.WALLET,
    };
    return new InjectedConnector(configs, detail.provider);
  });
};

export const requestRoninWalletConnector = async () => {
  const provider = await requestRoninProvider();
  return new RoninWalletConnector({}, provider);
};

export const requestRoninWalletConnectConnector = async ({
  connectorConfigs,
  providerOptions,
}: {
  connectorConfigs?: Partial<IConnectorConfigs>;
  providerOptions?: Partial<EthereumProviderOptions>;
}) => {
  const provider = await requestRoninWalletConnectProvider({
    projectId: RONIN_WALLET_CONNECT_PROJECT_ID,
    chains: WC_SUPPORTED_CHAIN_IDS,
    optionalChains: WC_SUPPORTED_CHAIN_IDS,
    showQrModal: false,
    ...providerOptions,
  });

  return new RoninWalletConnectConnector({ connectorConfigs, provider, providerOptions });
};

export const requestSafeConnector = async (configs?: Partial<IConnectorConfigs>, delay = DEFAULT_DELAY_TIME) => {
  const provider = await requestSafeProvider(delay);
  return new SafeConnector(configs, provider);
};

export const requestWaypointConnector = ({
  connectorConfigs,
  providerConfigs,
}: {
  connectorConfigs?: Partial<IConnectorConfigs>;
  providerConfigs?: IWaypointProviderConfigs;
}) => {
  const provider = requestWaypointProvider(providerConfigs);

  return new WaypointConnector({ connectorConfigs, providerConfigs, provider });
};
