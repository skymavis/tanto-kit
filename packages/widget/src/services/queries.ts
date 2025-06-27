import { queryOptions } from '@tanstack/react-query';

import { delay } from '../utils/common';

export const query = {
  nonce: () =>
    queryOptions({
      queryKey: ['tantoGetNonce'],
      // TODO
      refetchInterval: 1000 * 60 * 5, // 5 minutes
      queryFn: async () => {
        // TODO
        await delay(1_000);
        return '1234567890';
      },
    }),
} as const;

export const mutation = {
  createAccount: () => ({
    mutationKey: ['tantoCreateAccount'],
    mutationFn: async ({ signature }: { signature: string }) => {
      await delay(2_000);
      return `mock-success-${signature}`;
    },
  }),
} as const;
