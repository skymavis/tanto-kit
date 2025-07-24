import { Address } from 'viem';

import { WAYPOINT_BASE_URL } from '../constants';
import { request } from './request';

export const query = {} as const;

export const mutation = {
  generateNonce: () => ({
    mutationKey: ['tantoGenerateNonce'],
    mutationFn: async ({
      baseUrl = WAYPOINT_BASE_URL,
      clientId = '',
      address,
    }: {
      baseUrl?: string;
      clientId?: string;
      address: Address;
    }) => {
      return request<{
        expirationTime: string;
        issuedAt: string;
        nonce: string;
        notBefore: string;
      }>(`${baseUrl}/siwe/init`, {
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
      baseUrl = WAYPOINT_BASE_URL,
      clientId = '',
      message,
      signature,
    }: {
      baseUrl?: string;
      clientId?: string;
      message: string;
      signature: string;
    }) => {
      return request<{
        address: string;
        idToken: string;
        userID: string;
      }>(`${baseUrl}/siwe/authenticate`, {
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
