import { useCallback, useEffect, useRef } from 'react';
import { useAccount } from 'wagmi';

import { analytic } from '../analytic';

const SIGN_METHODS = ['personal_sign', 'eth_signTypedData_v4', 'eth_sendTransaction'] as const;

interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

type Request<T = unknown> = (args: RequestArguments, chain?: string, expiry?: number) => Promise<T>;

interface Signer {
  request: Request;
}

interface Provider {
  signer: Signer;
  request: Request;
}

const createRequestProxy = (
  request: Request,
  beforeRequest: (args: RequestArguments) => Promise<void>,
  afterRequest: (args: RequestArguments, error?: Error) => Promise<void>,
): Request => {
  return new Proxy(request, {
    async apply(target, thisArg, args: [RequestArguments, string | undefined, number | undefined]) {
      try {
        await beforeRequest(args[0]);
        const result = await Reflect.apply(target, thisArg, args);
        await afterRequest(args[0]);
        return result;
      } catch (e) {
        await afterRequest(args[0], e as Error);
        throw e;
      }
    },
  });
};

const createSignerProxy = (
  signer: Signer,
  beforeRequest: (args: RequestArguments) => Promise<void>,
  afterRequest: (args: RequestArguments, error?: Error) => Promise<void>,
): Signer => {
  return new Proxy(signer, {
    get(target, prop, receiver) {
      if (prop === 'request') {
        return createRequestProxy(target.request, beforeRequest, afterRequest);
      }
      return Reflect.get(target, prop, receiver);
    },
  });
};

export const useConnectorRequestAnalyticInterceptor = () => {
  const { connector } = useAccount();
  const isListenerActive = useRef(false);

  const handleBeforeRequest = useCallback(async ({ method, params }: RequestArguments) => {
    if (SIGN_METHODS.includes(method as typeof SIGN_METHODS[number])) {
      await analytic.sendEvent('sign_message_open', {
        method,
        params,
      });
    }

    if (method === 'eth_sendTransaction') {
      await analytic.sendEvent('send_transaction_open', {
        method,
        params,
      });
    }
  }, []);

  const handleAfterRequest = useCallback(async ({ method, params }: RequestArguments, error?: Error) => {
    if (SIGN_METHODS.includes(method as typeof SIGN_METHODS[number])) {
      if (error) {
        await analytic.sendEvent('sign_message_fail', {
          method,
          params,
          error: error.message,
        });
      } else {
        await analytic.sendEvent('sign_message_success', {
          method,
          params,
        });
      }
    }

    if (method === 'eth_sendTransaction') {
      if (error) {
        analytic.sendEvent('send_transaction_fail', {
          method,
          params,
        });
      } else {
        analytic.sendEvent('send_transaction_success', {
          method,
          params,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (!connector || isListenerActive.current) return;

    isListenerActive.current = true;

    const setupProvider = async () => {
      try {
        const provider = (await connector.getProvider()) as Provider;
        if (provider.signer && typeof provider.signer.request === 'function') {
          provider.signer = createSignerProxy(provider.signer, handleBeforeRequest, handleAfterRequest);
          return;
        }
        if (provider.request && typeof provider.request === 'function') {
          provider.request = createRequestProxy(provider.request, handleBeforeRequest, handleAfterRequest);
        }
      } catch {}
    };

    void setupProvider();

    return () => {
      isListenerActive.current = false;
    };
  }, [connector, handleBeforeRequest, handleAfterRequest]);
};
