import { Address } from 'viem';

import { request } from './request';

export const query = {} as const;

export const mutation = {
  generateNonce: () => ({
    mutationKey: ['tantoGenerateNonce'],
    mutationFn: async ({ address, clientId = '' }: { address: Address; clientId?: string }) => {
      return request<{
        expirationTime: string;
        issuedAt: string;
        nonce: string;
        notBefore: string;
      }>('https://waypoint-api.skymavis.one/v1/rpc/public/siwe/init', {
        method: 'POST',
        headers: {
          'sm-client-id': clientId,
        },
        body: {
          address,
        },
      });
    },
  }),
  createAccount: () => ({
    mutationKey: ['tantoCreateAccount'],
    mutationFn: async ({
      message,
      signature,
      clientId = '',
    }: {
      message: string;
      signature: string;
      clientId?: string;
    }) => {
      return request<string>('https://waypoint-api.skymavis.one/v1/rpc/public/siwe/authenticate', {
        method: 'POST',
        headers: {
          'sm-client-id': clientId,
        },
        body: {
          message,
          signature,
        },
      });
    },
  }),
} as const;
