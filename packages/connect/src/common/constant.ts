import { EthereumRpcMap } from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';

import { ChainIds } from './chain';

export const RONIN_WALLET_RDNS = 'com.roninchain.wallet';

export const DEFAULT_DELAY_TIME = 700;

export const WAYPOINT_URL = 'https://waypoint.roninchain.com';
export const WAYPOINT_CLIENT_ID = 'ced25363-9cab-4e50-b1bc-0e583b93c3a2';

export const WC_SUPPORTED_CHAIN_IDS: ArrayOneOrMore<number> = [ChainIds.RoninMainet, ChainIds.RoninTestnet];

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
