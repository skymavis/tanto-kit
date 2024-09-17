import { EthereumRpcMap } from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';

import { ChainIds } from '../../common/chain';

export const WC_SUPPORTED_CHAIN_IDS: ArrayOneOrMore<number> = [
  ChainIds.RoninMainet,
  ChainIds.RoninTestnet,
];

export const WC_RPC_MAP: EthereumRpcMap = {
  [ChainIds.RoninMainet]: 'https://api.roninchain.com/rpc',
  [ChainIds.RoninTestnet]: 'https://saigon-testnet.roninchain.com/rpc',
};
export const WC_CAIP_CHAIN = 'eip155';
export const WC_SUPPORTED_METHODS = ['eth_sendTransaction', 'eth_sign', 'personal_sign', 'eth_signTypedData'];
export const WC_SUPPORTED_OPTIONAL_METHODS = [
  'eth_accounts',
  'eth_requestAccounts',
  'eth_signTypedData_v4',
  'eth_getFreeGasRequests',
  'wallet_initialData',
];

declare type ArrayOneOrMore<T> = {
  0: T;
} & Array<T>;
