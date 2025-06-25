import { createEmitter } from '@wagmi/core/internal';
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

import { useAccountSwitch } from '../../hooks/useAccountSwitch';
import { useTantoConfig } from '../../hooks/useTantoConfig';
import { AuthContext, AuthState } from './AuthContext';

const SIWE_MESSAGE_TEMPLATE = `{address} wants you to sign in with your Ethereum account:
{address}

This request will not trigger a blockchain transaction or cost any gas fees.

URI: https://tanto.xyz
Version: 1
Chain ID: {chainId}
Nonce: {nonce}
Issued At: {issuedAt}`;

export type AuthEventType = 'signInSuccess' | 'signInError';

export interface AuthEventData {
  address?: string;
  chainId?: number;
  signature?: string;
  error?: Error;
}

export type AuthEventCallback = (data: AuthEventData) => void;

export const authEventEmitter = createEmitter('tanto-auth');

const generateNonce = async (): Promise<string> => {
  // TODO
  return '1234567890';
};

const createSiweMessage = (address: string, chainId: number, nonce: string): string => {
  // TODO
  return SIWE_MESSAGE_TEMPLATE.replace(/{address}/g, address)
    .replace(/{chainId}/g, chainId.toString())
    .replace(/{nonce}/g, nonce)
    .replace(/{issuedAt}/g, new Date().toISOString());
};

const createAuthError = (error: unknown): Error => {
  return error instanceof Error ? error : new Error('Authentication failed');
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { createAccountOnConnect: enableAuth = false } = useTantoConfig();
  const { address, chainId, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isConnected || !address) setError(null);
  }, [isConnected, address]);

  const emitAuthSuccess = useCallback((address: string, chainId: number, signature: string) => {
    authEventEmitter.emit('signInSuccess', { address, chainId, signature });
  }, []);

  const emitAuthError = useCallback((address: string, chainId: number, error: Error) => {
    authEventEmitter.emit('signInError', { address, chainId, error });
  }, []);

  const signIn = useCallback(async (): Promise<void> => {
    if (!enableAuth || !address || !chainId || isSigningIn) return;

    setIsSigningIn(true);
    setError(null);

    try {
      const nonce = await generateNonce();
      const message = createSiweMessage(address, chainId, nonce);
      const signature = await signMessageAsync({ message });

      console.log('SIWE signature:', signature);
      emitAuthSuccess(address, chainId, signature);
    } catch (error) {
      const authError = createAuthError(error);
      setError(authError);
      emitAuthError(address, chainId, authError);
      disconnect();
    } finally {
      setIsSigningIn(false);
    }
  }, [
    enableAuth,
    address,
    chainId,
    isSigningIn,
    signMessageAsync,
    disconnect,
    generateNonce,
    createSiweMessage,
    emitAuthSuccess,
    emitAuthError,
  ]);

  useAccountSwitch(signIn);

  const contextValue = useMemo<AuthState>(
    () => ({
      enable: enableAuth,
      isSigningIn,
      error,
      signIn,
    }),
    [enableAuth, isSigningIn, error, signIn],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuthEvents = () => {
  const onSignInSuccess = useCallback((callback: AuthEventCallback) => {
    const handler = ({ uid: _, ...data }: object & { uid: string }) => callback(data);
    authEventEmitter.on('signInSuccess', handler);
    return () => authEventEmitter.off('signInSuccess', handler);
  }, []);

  const onSignInError = useCallback((callback: AuthEventCallback) => {
    const handler = ({ uid: _, ...data }: object & { uid: string }) => callback(data);
    authEventEmitter.on('signInError', handler);
    return () => authEventEmitter.off('signInError', handler);
  }, []);

  return {
    onSignInSuccess,
    onSignInError,
  };
};
