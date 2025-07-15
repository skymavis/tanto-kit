import type { Address } from 'viem';
import { ronin, saigon } from 'viem/chains';

// Wallet
export const WALLET_IDS = {
  WAYPOINT: 'WAYPOINT',
  RONIN_WALLET: 'RONIN_WALLET',
  RONIN_WALLET_INJECTED: 'com.roninchain.wallet',
  WALLET_CONNECT: 'walletConnect',
  SAFE: 'safe',
  COINBASE_WALLET: 'coinbaseWalletSDK',
  CUSTOM_RONIN_MOBILE_WALLET: 'CUSTOM_RONIN_MOBILE_WALLET',
  CUSTOM_RONIN_IN_APP_WALLET: 'CUSTOM_RONIN_IN_APP_WALLET',
} as const;
export const RONIN_WALLET_WEB_LINK = 'https://wallet.roninchain.com';
export const RONIN_WALLET_APP_DEEPLINK = 'roninwallet://';

// Timing
export const DELAY_CONNECT = 600;
export const CONNECT_SUCCESS_DELAY = 1_200;
export const DIALOG_VISIBILITY_TRANSITION_DURATION = 150;
export const DRAWER_VISIBILITY_TRANSITION_DURATION = 500;

// UI
export const WALLET_ITEM_HEIGHT = 68;
export const MAX_WALLET_ITEMS_PER_GROUP = 4;
export const MOBILE_BREAKPOINT = 576;
export const MAX_Z_INDEX = 2147483647;
export const OVERLAY_Z_INDEX = MAX_Z_INDEX - 2;
export const CONTENT_Z_INDEX = MAX_Z_INDEX - 1;

// Analytics
export const ANALYTIC_PUBLIC_KEY = '34cb0c94-cace-4e79-b708-96112181ddbb';

// RNS
export const RNS_PUBLIC_RESOLVER_ADDRESS: Record<number, Address> = {
  [saigon.id]: '0x803c459dcb8771e5354d1fc567ecc6885a9fd5e6',
  [ronin.id]: '0xadb077d236d9e81fb24b96ae9cb8089ab9942d48',
};
export const RNS_UNIFIED_ADDRESS: Record<number, Address> = {
  [saigon.id]: '0xf0c99c9677eda0d13291c093b27e6512e4acdf83',
  [ronin.id]: '0x67c409dab0ee741a1b1be874bd1333234cfdbf44',
};
export const RNS_NAME_ABI = [
  {
    inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
export const RNS_OWNER_OF_ABI = [
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// Waypoint
export const WAYPOINT_ORIGINS = ['https://id.skymavis.one', 'https://waypoint.roninchain.com'];
export const WAYPOINT_BASE_URL = 'https://waypoint-api.skymavis.com/v1/rpc/public';
