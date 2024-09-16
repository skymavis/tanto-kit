import { COINBASE_WALLET_RDNS, DEFAULT_DELAY_TIME } from '../common/constant';
import { CoinbaseWalletConnector } from '../connectors/coinbase/CoinbaseWalletConnector';
import { ConnectorError, ConnectorErrorType } from '../types/connector-error';
import { checkCoinbaseInstalled } from '../utils';
import { requestProviders } from './eip6963';

export const requestCoinbaseProviders = async (delay = DEFAULT_DELAY_TIME) => {
  const providersDetail = await requestProviders(delay);
  const coinbaseProvider = providersDetail.find(({ info }) => info.rdns === COINBASE_WALLET_RDNS)?.provider;

  if (coinbaseProvider) {
    return new CoinbaseWalletConnector(coinbaseProvider);
  } else {
    throw new ConnectorError(ConnectorErrorType.PROVIDER_NOT_FOUND);
  }
};

export const requestLegacyCoinbaseProvider = async (delay = DEFAULT_DELAY_TIME) => {
  if (checkCoinbaseInstalled()) {
    const provider = (window.ethereum as any).scwProvider;
    return new CoinbaseWalletConnector(provider);
  }

  // Wait for the provider to be injected if it's not available yet
  await new Promise(resolve => setTimeout(resolve, delay));

  if (checkCoinbaseInstalled()) {
    const provider = (window.ethereum as any).scwProvider;
    return new CoinbaseWalletConnector(provider);
  }

  throw new ConnectorError(ConnectorErrorType.NOT_INSTALLED);
};
