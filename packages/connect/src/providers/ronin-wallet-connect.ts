import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { EthereumProviderOptions } from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';

import {
  ArrayOneOrMore,
  WC_RPC_MAP,
  WC_SUPPORTED_CHAIN_IDS,
  WC_SUPPORTED_METHODS,
  WC_SUPPORTED_OPTIONAL_METHODS,
} from '../common/constant';

export const requestRoninWalletConnectProvider = (options: EthereumProviderOptions) => {
  return EthereumProvider.init({
    methods: WC_SUPPORTED_METHODS,
    optionalMethods: WC_SUPPORTED_OPTIONAL_METHODS,
    rpcMap: WC_RPC_MAP,
    ...options,
    chains: [...WC_SUPPORTED_CHAIN_IDS, ...(options.chains ?? [])],
    optionalChains: [...WC_SUPPORTED_CHAIN_IDS, ...(options.optionalChains ?? [])] as ArrayOneOrMore<number>,
  });
};
