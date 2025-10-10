import { queryOptions } from '@tanstack/react-query';

import { headlessInjector } from './headlessInjector';

const authApi = headlessInjector.resolve('authApi');
const walletApi = headlessInjector.resolve('walletApi');
const walletService = headlessInjector.resolve('walletService');

export const query = {
  encryptedClientShard: () =>
    queryOptions({
      queryKey: ['tantoGetEncryptedClientShard'],
      queryFn: walletApi.getEncryptedClientShard,
    }),
} as const;

export const mutation = {
  generateNonce: () => ({
    mutationKey: ['tantoGenerateNonce'],
    mutationFn: authApi.generateNonce,
  }),
  createAccount: () => ({
    mutationKey: ['tantoCreateAccount'],
    mutationFn: authApi.authenticateWithSiwe,
  }),
  initOTPPasswordless: () => ({
    mutationKey: ['tantoInitOTPPasswordless'],
    mutationFn: authApi.initOTPPasswordless,
  }),
  authenticateWithOTP: () => ({
    mutationKey: ['tantoAuthenticateWithOTP'],
    mutationFn: authApi.authenticateWithOtp,
  }),
  exchangeToken: () => ({
    mutationKey: ['tantoExchangeToken'],
    mutationFn: authApi.exchangeToken,
  }),
  getUserProfile: () => ({
    mutationKey: ['tantoGetUserProfileAPI'],
    mutationFn: walletApi.getUserProfile,
  }),
  createKeylessWallet: () => ({
    mutationKey: ['tantoCreateKeylessWallet'],
    mutationFn: walletApi.createKeylessWallet,
  }),
  decryptClientShard: () => ({
    mutationKey: ['tantoDecryptClientShard'],
    mutationFn: walletService.decryptClientShard,
  }),
  migrateToPasswordless: () => ({
    mutationKey: ['tantoMigrateToPasswordless'],
    mutationFn: walletService.migrateToPasswordless,
  }),
} as const;
