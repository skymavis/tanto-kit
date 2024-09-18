import { DEFAULT_DELAY_TIME, RONIN_WALLET_RDNS, WC_SUPPORTED_CHAIN_IDS } from '../common/constant';
import {
  requestLegacyRoninProvider,
  requestProviders,
  requestRoninWalletConnectProvider,
  requestSafeProvider,
  requestWaypointProvider,
} from '../providers';
import { IBaseConnector, IConnectorConfigs } from '../types/connector';
import { InjectedConnector } from './injected/InjectedConnector';
import { RoninWalletConnector } from './ronin-wallet/RoninWalletConnector';
import {
  IRoninWalletConnectConnectorConfigs,
  RoninWalletConnectConnector,
} from './ronin-wallet-connect/RoninWalletConnectConnector';
import { SafeConnector } from './safe/SafeConnector';
import { WaypointConnector } from './waypoint/WaypointConnector';

export const requestInjectedConnectors = async (): Promise<IBaseConnector[]> => {
  const providerDetails = await requestProviders();

  return providerDetails.map(detail => {
    if (detail.info.rdns === RONIN_WALLET_RDNS) {
      return new RoninWalletConnector({ icon: detail.info.icon });
    } else {
      const configs = {
        name: detail.info.name,
        id: detail.info.rdns,
        icon: detail.info.icon,
        type: 'injected',
      };
      return new InjectedConnector(configs, detail.provider);
    }
  });
};

export const requestRoninWalletConnector = async () => {
  const provider = await requestLegacyRoninProvider();
  return new RoninWalletConnector({}, provider);
};

export const requestRoninWalletConnectConnector = async (configs: IRoninWalletConnectConnectorConfigs) => {
  const provider = await requestRoninWalletConnectProvider({
    projectId: configs.projectId,
    metadata: configs.metadata,
    chains: WC_SUPPORTED_CHAIN_IDS,
    showQrModal: false,
  });

  return new RoninWalletConnectConnector(configs, provider);
};

export const requestSafeConnector = async (configs: Partial<IConnectorConfigs>, delay = DEFAULT_DELAY_TIME) => {
  const provider = await requestSafeProvider(delay);
  return new SafeConnector(configs, provider);
};

export const requestWaypointConnector = (config: Partial<IConnectorConfigs>, chainId?: number) => {
  const waypointProvider = requestWaypointProvider(chainId);

  return new WaypointConnector(config, waypointProvider);
};
