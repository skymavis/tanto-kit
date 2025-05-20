import { useCallback, useEffect, useRef } from 'react';
import { Connector, useAccount } from 'wagmi';

import { isWCConnector } from '../utils';

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
}

interface UseWalletConnectListenerParams {
  connector?: Connector;
  onSignRequest?: () => void;
}

const createSignerProxy = (signer: Signer, onRequest: (args: RequestArguments) => void): Signer => {
  return new Proxy(signer, {
    get(target, prop, receiver) {
      if (prop === 'request') {
        return new Proxy(target.request, {
          apply(target, thisArg, args: [RequestArguments, string | undefined, number | undefined]) {
            onRequest(args[0]);
            return Reflect.apply(target, thisArg, args);
          },
        });
      }
      return Reflect.get(target, prop, receiver);
    },
  });
};

export const useWalletConnectListener = ({ onSignRequest }: UseWalletConnectListenerParams) => {
  const { connector } = useAccount();
  const isListenerActive = useRef(false);

  const handleSignRequest = useCallback(
    ({ method }: RequestArguments) => {
      if (SIGN_METHODS.includes(method as typeof SIGN_METHODS[number])) {
        onSignRequest?.();
      }
    },
    [onSignRequest],
  );

  useEffect(() => {
    if (!connector || !isWCConnector(connector.id) || isListenerActive.current) return;

    isListenerActive.current = true;

    const setupProvider = async () => {
      try {
        const provider = (await connector.getProvider()) as Provider;
        if (!provider.signer || typeof provider.signer.request !== 'function') return;
        provider.signer = createSignerProxy(provider.signer, handleSignRequest);
      } catch {}
    };

    void setupProvider();

    return () => {
      isListenerActive.current = false;
    };
  }, [connector, handleSignRequest]);
};
