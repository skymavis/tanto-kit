import { requestEIP6963Providers } from '../providers';
import { IConnectorConfigs } from '../types/connector';
import { IEIP1193Provider } from '../types/eip1193';
import { InjectedConnector } from './injected/InjectedConnector';

export const createInjectedConnector = (injectedProvider: IEIP1193Provider, option: IConnectorConfigs) => {
  return new InjectedConnector(injectedProvider, option);
};

export const requestInjectedConnectors = async () => {
  const providerDetails = await requestEIP6963Providers();

  return providerDetails.map(providerDetail => {
    return createInjectedConnector(providerDetail.provider, {
      name: providerDetail.info.name,
      id: providerDetail.info.rdns,
      icon: providerDetail.info.icon,
      type: 'injected',
    });
  });
};
