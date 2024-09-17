import { DEFAULT_DELAY_TIME, RONIN_WALLET_RDNS } from '../common/constant';
import { ConnectorError, ConnectorErrorType } from '../types/connector-error';
import { IEIP1193Provider } from '../types/eip1193';
import { checkRoninInstalled } from '../utils';
import { requestProviders } from './eip6963';

export const requestRoninProviders = async (delay = DEFAULT_DELAY_TIME) => {
  const providersDetail = await requestProviders(delay);
  const roninProvider = providersDetail.find(({ info }) => info.rdns === RONIN_WALLET_RDNS)?.provider;
  if (roninProvider) {
    return roninProvider;
  } else {
    throw new ConnectorError(ConnectorErrorType.PROVIDER_NOT_FOUND);
  }
};

export const requestLegacyRoninProvider = async (delay = DEFAULT_DELAY_TIME): Promise<IEIP1193Provider> => {
  if (checkRoninInstalled()) {
    return window.ronin?.provider as IEIP1193Provider;
  }

  // Wait for the provider to be injected if it's not available yet
  await new Promise(resolve => setTimeout(resolve, delay));

  if (checkRoninInstalled()) {
    return window.ronin?.provider as IEIP1193Provider;
  }

  throw new ConnectorError(ConnectorErrorType.NOT_INSTALLED);
};
