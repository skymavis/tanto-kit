import { useMutation, useQuery } from '@tanstack/react-query';
import { createEmitter } from '@wagmi/core/internal';
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

import { useAccountSwitch } from '../../hooks/useAccountSwitch';
import { useTantoConfig } from '../../hooks/useTantoConfig';
import { mutation, query } from '../../services/queries';
import { isWaypointConnector } from '../../utils';
import { TantoWidgetError, TantoWidgetErrorCodes } from '../../utils/errors';
import { AuthContext, AuthState } from './AuthContext';

export type AuthEventType = 'signInSuccess' | 'signInError';

export interface AuthEventData {
  address?: string;
  chainId?: number;
  // TODO
  data?: any;
  error?: Error;
}

export type AuthEventCallback = (data: AuthEventData) => void;

export const authEventEmitter = createEmitter('tanto-auth');

const createSiweMessage = (address: string, chainId: number, nonce: string): string => {
  // TODO
  const SIWE_MESSAGE_TEMPLATE = `{address} wants you to sign in with your Ethereum account:
{address}

This request will not trigger a blockchain transaction or cost any gas fees.

URI: https://tanto.xyz
Version: 1
Chain ID: {chainId}
Nonce: {nonce}
Issued At: {issuedAt}`;
  return SIWE_MESSAGE_TEMPLATE.replace(/{address}/g, address)
    .replace(/{chainId}/g, chainId.toString())
    .replace(/{nonce}/g, nonce)
    .replace(/{issuedAt}/g, new Date().toISOString());
};

export const useAuthEvents = () => {
  const createEventHandler = (eventType: AuthEventType) => {
    return (callback: AuthEventCallback) => {
      const handler = ({ uid: _, ...data }: any) => callback(data);
      authEventEmitter.on(eventType, handler);
      return () => authEventEmitter.off(eventType, handler);
    };
  };

  return {
    onSignInSuccess: createEventHandler('signInSuccess'),
    onSignInError: createEventHandler('signInError'),
  };
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { createAccountOnConnect: enableAuth = false } = useTantoConfig();
  const { address, chainId, connector } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const {
    data: nonce,
    refetch: refetchNonce,
    isLoading: isNonceLoading,
  } = useQuery({
    ...query.nonce(),
    enabled: enableAuth,
  });

  const { mutateAsync: createAccount } = useMutation(mutation.createAccount());

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const signIn = useCallback(async (): Promise<void> => {
    if (!enableAuth || !address || !chainId || isSigningIn) return;

    setIsSigningIn(true);
    setError(null);

    try {
      if (isWaypointConnector(connector?.id)) {
        authEventEmitter.emit('signInSuccess', { address, chainId });
        return;
      }

      if (!nonce) throw new TantoWidgetError(TantoWidgetErrorCodes.NONCE_NOT_AVAILABLE, 'Nonce is not available');

      const message = createSiweMessage(address, chainId, nonce);
      const signature = await signMessageAsync({ message });

      const authData = await createAccount({ signature });

      authEventEmitter.emit('signInSuccess', {
        address,
        chainId,
        data: authData,
      });
    } catch (error) {
      const authError = error instanceof Error ? error : new Error('Authentication failed');

      setError(authError);
      authEventEmitter.emit('signInError', {
        address,
        chainId,
        error: authError,
      });

      disconnect();
    } finally {
      refetchNonce();
      setIsSigningIn(false);
    }
  }, [
    enableAuth,
    address,
    chainId,
    isSigningIn,
    nonce,
    isNonceLoading,
    signMessageAsync,
    disconnect,
    refetchNonce,
    createAccount,
    connector?.id,
  ]);

  useAccountSwitch(signIn);

  const contextValue = useMemo<AuthState>(
    () => ({
      enable: enableAuth,
      isSigningIn,
      error,
      signIn,
      resetError,
    }),
    [enableAuth, isSigningIn, error, signIn, resetError],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
