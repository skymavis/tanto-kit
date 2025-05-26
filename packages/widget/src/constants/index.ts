import { Address } from 'viem';
import { ronin, saigon } from 'viem/chains';

export const RONIN_WALLET_WEB_LINK = 'https://wallet.roninchain.com';
export const RONIN_WALLET_APP_DEEPLINK = 'roninwallet://';
export const DELAY_CONNECT = 600;
export const CONNECT_SUCCESS_DELAY = 1_200;
export const VISIBILITY_TRANSITION_DURATION = 150;
export const WALLET_ITEM_HEIGHT = 68;
export const MAX_WALLET_ITEMS_PER_GROUP = 4;
export const ANALYTIC_PUBLIC_KEY = '34cb0c94-cace-4e79-b708-96112181ddbb';
export const RNS_PUBLIC_RESOLVER_ADDRESS: Record<number, Address> = {
  [saigon.id]: '0x803c459dcb8771e5354d1fc567ecc6885a9fd5e6',
  [ronin.id]: '0xadb077d236d9e81fb24b96ae9cb8089ab9942d48',
};
export const RNS_UNIFIED_ADDRESS: Record<number, Address> = {
  [saigon.id]: '0xf0c99c9677eda0d13291c093b27e6512e4acdf83',
  [ronin.id]: '0x67c409dab0ee741a1b1be874bd1333234cfdbf44',
};
