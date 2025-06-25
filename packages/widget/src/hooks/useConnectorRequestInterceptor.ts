import { useCallback, useEffect, useRef } from 'react';
import { useAccount } from 'wagmi';

import { analytic } from '../analytic';

const SIGNATURE_METHODS = ['personal_sign', 'eth_signTypedData_v4', 'eth_sign', 'eth_signTypedData'];
const TRANSACTION_METHODS = ['eth_sendTransaction'];
const REQUIRED_SIGNING_METHODS = [...SIGNATURE_METHODS, ...TRANSACTION_METHODS];

const isSignatureMethod = (method: string): method is typeof SIGNATURE_METHODS[number] =>
  SIGNATURE_METHODS.includes(method);
const isTransactionMethod = (method: string): method is typeof TRANSACTION_METHODS[number] =>
  TRANSACTION_METHODS.includes(method);
const isRequiredSigningMethod = (method: string): method is typeof REQUIRED_SIGNING_METHODS[number] =>
  REQUIRED_SIGNING_METHODS.includes(method);

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
  request?: Request;
}

interface UseConnectorRequestInterceptorParams {
  beforeRequest?: (args: RequestArguments) => void;
  afterRequest?: (args: RequestArguments, error?: Error) => void;
}

const createRequestProxy = ({
  request,
  beforeRequest,
  afterRequest,
}: {
  request: Request;
  beforeRequest?: (args: RequestArguments) => void;
  afterRequest?: (args: RequestArguments, error?: Error) => void;
}): Request => {
  return new Proxy(request, {
    async apply(target, thisArg, args: [RequestArguments, string | undefined, number | undefined]) {
      beforeRequest?.(args[0]);
      try {
        const result = await Reflect.apply(target, thisArg, args);
        afterRequest?.(args[0]);
        return result;
      } catch (e) {
        afterRequest?.(args[0], e as Error);
        throw e;
      }
    },
  });
};

const createSignerProxy = ({
  signer,
  beforeRequest,
  afterRequest,
}: {
  signer: Signer;
  beforeRequest?: (args: RequestArguments) => void;
  afterRequest?: (args: RequestArguments, error?: Error) => void;
}): Signer => {
  return new Proxy(signer, {
    get(target, prop, receiver) {
      if (prop === 'request') {
        return createRequestProxy({
          request: target.request,
          beforeRequest,
          afterRequest,
        });
      }
      return Reflect.get(target, prop, receiver);
    },
  });
};

export const useConnectorRequestInterceptor = ({
  beforeRequest,
  afterRequest,
}: UseConnectorRequestInterceptorParams = {}) => {
  const { connector } = useAccount();
  const isListenerActive = useRef(false);

  const handleBeforeRequest = useCallback(
    ({ method, params }: RequestArguments) => {
      if (!isRequiredSigningMethod(method)) return;
      beforeRequest?.({ method, params });
      if (isSignatureMethod(method)) analytic.sendEvent('sign_message_open', { method, params });
      if (isTransactionMethod(method)) analytic.sendEvent('send_transaction_open', { method, params });
    },
    [beforeRequest],
  );

  const handleAfterRequest = useCallback(
    ({ method, params }: RequestArguments, error?: Error) => {
      if (!isRequiredSigningMethod(method)) return;
      afterRequest?.({ method, params }, error);
      if (isSignatureMethod(method)) {
        if (error) analytic.sendEvent('sign_message_fail', { method, params, error_reason: error.message });
        else analytic.sendEvent('sign_message_success', { method, params });
      }
      if (isTransactionMethod(method)) {
        if (error) analytic.sendEvent('send_transaction_fail', { method, params, error_reason: error.message });
        else analytic.sendEvent('send_transaction_success', { method, params });
      }
    },
    [afterRequest],
  );

  useEffect(() => {
    if (!connector || isListenerActive.current) return;
    isListenerActive.current = true;

    async function setupProvider() {
      try {
        const provider = (await connector!.getProvider()) as Provider;
        if (provider?.signer && typeof provider.signer.request === 'function') {
          provider.signer = createSignerProxy({
            signer: provider.signer,
            beforeRequest: handleBeforeRequest,
            afterRequest: handleAfterRequest,
          });
          return;
        }
        if (provider?.request && typeof provider.request === 'function') {
          provider.request = createRequestProxy({
            request: provider.request,
            beforeRequest: handleBeforeRequest,
            afterRequest: handleAfterRequest,
          });
        }
      } catch (error) {
        console.debug('Failed to setup provider in useConnectorRequestInterceptor:', error);
      }
    }

    void setupProvider();
  }, [connector, handleBeforeRequest, handleAfterRequest]);
};
