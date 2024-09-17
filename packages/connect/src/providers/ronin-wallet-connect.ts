import { EthereumProvider, EthereumProviderOptions } from '@walletconnect/ethereum-provider';

export const createWalletConnectProvider = (options: EthereumProviderOptions) => {
  return EthereumProvider.init(options);
};
