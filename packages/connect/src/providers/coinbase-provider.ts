import { COINBASE_WALLET_RDNS, DEFAULT_DELAY_TIME } from '../common/constant';
import { ConnectorError, ConnectorErrorType } from '../types/connector-error';
import { IEIP1193Provider } from '../types/eip1193';
import { checkCoinbaseInstalled } from '../utils';
import { requestProviders } from './eip6963';

export const requestCoinbaseProviders = async (delay = DEFAULT_DELAY_TIME) => {
  const providersDetail = await requestProviders(delay);
  const coinbaseProvider = providersDetail.find(({ info }) => info.rdns === COINBASE_WALLET_RDNS)?.provider;
  if (coinbaseProvider) {
    return coinbaseProvider;
  } else {
    throw new ConnectorError(ConnectorErrorType.PROVIDER_NOT_FOUND);
  }
};

export const requestLegacyCoinbaseProvider = async (delay = DEFAULT_DELAY_TIME): Promise<IEIP1193Provider> => {
  if (checkCoinbaseInstalled()) {
    return (window.ethereum as any).scwProvider;
  }

  // Wait for the provider to be injected if it's not available yet
  await new Promise(resolve => setTimeout(resolve, delay));

  if (checkCoinbaseInstalled()) {
    return (window.ethereum as any).scwProvider;
  }

  throw new ConnectorError(ConnectorErrorType.NOT_INSTALLED);
};
