import { RONIN_WALLET_RDNS } from '../common/constant';
import { createWalletConnectProvider, requestLegacyRoninProvider } from '../providers';
import { requestProviders } from '../providers/eip6963';
import { IBaseConnector } from '../types/connector';
import { InjectedConnector } from './injected/InjectedConnector';
import { RoninWalletConnector } from './ronin-wallet/RoninWalletConnector';
import {
  WC_RPC_MAP,
  WC_SUPPORTED_CHAIN_IDS,
  WC_SUPPORTED_METHODS,
  WC_SUPPORTED_OPTIONAL_METHODS,
} from './ronin-wallet-connect/config';
import {
  IRoninWalletConnectConnectorConfigs,
  RoninWalletConnectConnector,
} from './ronin-wallet-connect/RoninWalletConnectConnector';

export const requestInjectedConnectors = async (): Promise<IBaseConnector[]> => {
  const providerDetails = await requestProviders();

  return providerDetails.map(detail => {
    if (detail.info.rdns === RONIN_WALLET_RDNS) {
      return new RoninWalletConnector(detail.provider, {});
    } else {
      const configs = {
        name: detail.info.name,
        id: detail.info.rdns,
        icon: detail.info.icon,
        type: 'injected',
      };
      return new InjectedConnector(detail.provider, configs);
    }
  });
};

export const requestRoninWalletConnector = async () => {
  const provider = await requestLegacyRoninProvider();
  return new RoninWalletConnector(provider, {});
};

export const requestRoninWalletConnectConnector = async (configs: IRoninWalletConnectConnectorConfigs) => {
  const provider = await createWalletConnectProvider({
    projectId: configs.projectId,
    metadata: configs.clientMeta,
    chains: WC_SUPPORTED_CHAIN_IDS,
    methods: WC_SUPPORTED_METHODS,
    optionalMethods: WC_SUPPORTED_OPTIONAL_METHODS,
    rpcMap: WC_RPC_MAP,
    disableProviderPing: true,
    showQrModal: false,
  });

  return new RoninWalletConnectConnector(provider, configs);
};
