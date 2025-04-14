import { Wallet } from '../types/wallet';

export const roninExtensionIds = ['RONIN_WALLET', 'com.roninchain.wallet'];

// TODO
export const walletCustomizations: {
  [walletId: string]: Wallet;
} = {
  'RONIN_WALLET, com.roninchain.wallet': {} as Wallet,
};
