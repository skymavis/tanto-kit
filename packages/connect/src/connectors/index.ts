import { RONIN_WALLET_RDNS, WC_SUPPORTED_CHAIN_IDS } from '../common/constant';
import { requestLegacyRoninProvider, requestProviders, requestRoninWalletConnectProvider } from '../providers';
import { IBaseConnector } from '../types/connector';
import { InjectedConnector } from './injected/InjectedConnector';
import { RoninWalletConnector } from './ronin-wallet/RoninWalletConnector';
import {
  IRoninWalletConnectConnectorConfigs,
  RoninWalletConnectConnector,
} from './ronin-wallet-connect/RoninWalletConnectConnector';

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
