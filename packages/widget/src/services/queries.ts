import { queryOptions } from '@tanstack/react-query';

import { delay } from '../utils/delay';

export const query = {
  nonce: () =>
    queryOptions({
      queryKey: ['tantoGetNonce'],
      // TODO
      refetchInterval: 1000 * 60 * 5, // 5 minutes
      queryFn: async () => {
        console.log('get nonce');

        // TODO
        await delay(1_000);
        return 'mock-nonce';
      },
    }),
} as const;

export const mutation = {
  createAccount: () => ({
    mutationKey: ['tantoCreateAccount'],
    mutationFn: async ({ signature }: { signature: string }) => {
      await delay(1_000);
      return `mock-success-${signature}`;
    },
  }),
} as const;
